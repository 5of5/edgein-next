import { withAPIKey } from '@aws/amazon-location-utilities-auth-helper';
import {
  LocationClient,
  SearchPlaceIndexForSuggestionsRequest,
  SearchPlaceIndexForSuggestionsCommand,
  SearchPlaceIndexForSuggestionsResponse,
  GetPlaceRequest,
  GetPlaceResponse,
  GetPlaceCommand,
} from '@aws-sdk/client-location';

export class LocationService {
  private clientPromise: Promise<LocationClient> | null;

  constructor() {
    this.clientPromise = null;
  }

  private async connect() {
    if (!this.clientPromise) {
      this.clientPromise = connectLocationClient();
    }

    return this.clientPromise;
  }

  public getPlaceIndex() {
    return process.env.NEXT_PUBLIC_AWS_LOCATION_SERVICE_PLACE_INDEX;
  }

  public async searchPlaceSuggestions(
    input: SearchPlaceIndexForSuggestionsRequest,
  ): Promise<SearchPlaceIndexForSuggestionsResponse> {
    const client = await this.connect();
    const command = new SearchPlaceIndexForSuggestionsCommand(input);
    return client.send(command);
  }

  public async getPlace(input: GetPlaceRequest): Promise<GetPlaceResponse> {
    const client = await this.connect();
    const command = new GetPlaceCommand(input);
    return client.send(command);
  }
}

const connectLocationClient = async () => {
  // API Key
  const apiKey = process.env.NEXT_PUBLIC_AWS_LOCATION_SERVICE_API_KEY ?? '';

  // Create an authentication helper instance using an API key
  const authHelper = await withAPIKey(apiKey);

  return new LocationClient({
    region: 'us-east-2',
    ...authHelper.getLocationClientConfig(),
  });
};
