import type { NextApiRequest, NextApiResponse } from 'next'
import algoliasearch from 'algoliasearch'
import { query } from '@/graphql/hasuraAdmin'

const client = algoliasearch('TFBKEVTOJD', '7351547981c8bf9dca342cb24a8ecde3');
const index = client.initIndex('companies');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get all the companies details
  const companyList = await queryForCompanyList();
  for (const company of companyList) {
    if (company.logo) {
      company.logo = company.logo.thumbnails.full.url ? company.logo.thumbnails.full.url : company.logo.url;
    }
  }
  await index.saveObjects(companyList, { autoGenerateObjectIDIfNotExist: true });
  res.status(200).end();
}

// queries local user using graphql endpoint
const queryForCompanyList = async () => {
  // prepare gql query
  const fetchQuery = `
  query query_companies {
    companies(limit: 100) {
      name
      overview
      tags
      logo
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: {}
    })
    return data.data.companies
  } catch (ex) {
    throw ex;
  }
}

export default handler
