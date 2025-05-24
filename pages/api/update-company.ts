/**
 * API Route: /api/update-company
 *
 * Updates a company's information in the database.
 *
 * Required:
 * - User must be authenticated
 * - Request must be a POST
 * - Request body must contain companyId and company object
 *
 * Request body format:
 * {
 *   companyId: number;
 *   company: Partial<Companies>;
 * }
 *
 * Responses:
 * - 200: Company updated successfully
 * - 400: Bad request (missing companyId, missing company data, or validation errors)
 * - 401: Unauthorized (user not logged in)
 * - 404: Company not found
 * - 405: Method not allowed (not a POST request)
 * - 500: Server error
 */
import { NextApiResponse, NextApiRequest } from 'next';
import CookieService from '../../utils/cookie';
import { mutate } from '@/graphql/hasuraAdmin';
import {
  UpdateCompanyByPkDocument,
  UpdateCompanyByPkMutation,
  Companies,
  Companies_Set_Input,
} from '@/graphql/types';
import { validateFieldsForPartialEdit } from '@/utils/constants';

type UpdateCompanyRequest = {
  companyId: number;
  company: Partial<Companies>;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Authenticate user
    const token = CookieService.getAuthToken(req.cookies);
    const user = await CookieService.getUser(token);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized. Please login to continue.' });
    }

    // Validate request body
    const { companyId, company } = req.body as UpdateCompanyRequest;

    if (!companyId) {
      return res
        .status(400)
        .json({ message: 'Bad request, companyId is required' });
    }

    if (!company || typeof company !== 'object') {
      return res
        .status(400)
        .json({ message: 'Bad request, company data is required' });
    }

    // Validate company data fields
    const validationErrors = await validateFieldsForPartialEdit(
      true,
      company,
      {},
    );
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Clean up company data before updating
    const cleanedCompanyData = prepareCompanyData(company);

    // Update company in database
    const result = await updateCompany(cleanedCompanyData, companyId, token);

    // Check if update was successful
    if (!result) {
      return res
        .status(404)
        .json({ message: 'Company not found or update failed' });
    }

    return res.status(200).json({
      success: true,
      result,
      message: 'Company updated successfully',
    });
  } catch (error: unknown) {
    console.error('Error updating company:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      message: 'An error occurred while updating the company',
      error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    });
  }
};

/**
 * Prepares company data for database update by cleaning up unnecessary fields
 */
const prepareCompanyData = (
  companyData: Partial<Companies>,
): Companies_Set_Input => {
  // Create a copy to avoid modifying the original
  const cleanedData = { ...companyData } as Record<string, any>;

  // Handle special fields like coin
  if (cleanedData.coin) {
    cleanedData.coin_id = cleanedData.coin.id;
    delete cleanedData.coin;
  }

  // List of fields that are known to be invalid or nested objects
  const fieldsToRemove = [
    'teamMembers',
    'investment_rounds',
    'follows',
    'to_links',
    'from_links',
    '__typename',
    'coin',
    'created_by',
  ];

  // Remove known invalid fields
  fieldsToRemove.forEach(field => {
    if (field in cleanedData) {
      delete cleanedData[field];
    }
  });

  // List of valid fields in Companies_Set_Input
  const validFields = [
    'aliases',
    'audit_file',
    'bitcointalk',
    'blockchain_explorer',
    'careers_page',
    'coin_id',
    'company_linkedin',
    'company_size',
    'created_at',
    'data_enriched_at',
    'datapoints_count',
    'date_added',
    'discord',
    'domain_enriched_at',
    'email_domain',
    'enrichment_priority',
    'external_id',
    'facebook',
    'geopoint',
    'github',
    'glassdoor',
    'ico_end',
    'ico_start',
    'id',
    'instagram',
    'investor_amount',
    'latitude',
    'layer',
    'layer_detail',
    'library',
    'location',
    'location_json',
    'logo',
    'longitude',
    'market_verified',
    'medium',
    'name',
    'notes',
    'num_of_views',
    'overview',
    'reddit',
    'search_count',
    'sentiment',
    'slug',
    'status',
    'status_tags',
    'tags',
    'telegram',
    'total_employees',
    'total_valuation',
    'trajectory',
    'twitter',
    'updated_at',
    'velocity_linkedin',
    'web3_address',
    'website',
    'white_paper',
    'year_founded',
    'youtube',
  ];

  // Create a new object with only valid fields
  const filteredData: Record<string, any> = {};

  Object.keys(cleanedData).forEach(key => {
    if (validFields.includes(key)) {
      filteredData[key] = cleanedData[key];
    } else {
      console.log(`Removing invalid field: ${key}`);
    }
  });

  return filteredData as Companies_Set_Input;
};

/**
 * Updates a company in the database using GraphQL mutation
 */
const updateCompany = async (
  payload: Companies_Set_Input,
  companyId: number,
  token: string,
) => {
  try {
    return await mutate<UpdateCompanyByPkMutation>(
      {
        mutation: UpdateCompanyByPkDocument,
        variables: {
          companyId,
          data: payload,
        },
      },
      token,
    );
  } catch (error) {
    console.error('GraphQL error in updateCompany:', error);
    // Log the payload that caused the error (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Payload that caused error:',
        JSON.stringify(payload, null, 2),
      );
    }
    throw error;
  }
};

export default handler;
