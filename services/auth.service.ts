import {
  AppMetadata,
  AuthenticationClient,
  ManagementClient,
  TokenResponse,
  User,
  UserMetadata,
} from 'auth0';
import { env } from '@/services/config.service';
import { redirect_url } from '@/utils/auth';
import qs from 'qs';

export const LINKEDIN_PROVIDER = 'linkedin';
export const AUTH0_PROVIDER = 'auth0';

export enum ErrorCode {
  USER_NOT_EXISTS = 404,
  LINKED_IN_ACCOUNT = 406,
}

export interface AuthData {
  userId: string;
  email: string;
  password: string;
}

export type UserInfo = User<AppMetadata, UserMetadata>;

export class AuthService {
  private readonly connection = 'Username-Password-Authentication';
  private readonly management: ManagementClient;
  private readonly auth: AuthenticationClient;

  public static logoutUrl(): string {
    return `${env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`;
  }

  public static groupUrl(groupId: string): string {
    return `${redirect_url()}/groups/${groupId}`;
  }

  public static signUpUrl(inviteCode: string): string {
    return `${redirect_url()}/?invite=${inviteCode}`;
  }

  public static auth0UserId(auth0_user_pass_id?: string | null): string {
    return `${AUTH0_PROVIDER}|${auth0_user_pass_id}`;
  }
  public static linkedinUserId(auth0_user_pass_id?: string | null): string {
    return `${LINKEDIN_PROVIDER}|${auth0_user_pass_id}`;
  }

  public static verifyUrl({
    userId,
    email,
  }: Pick<AuthData, 'userId' | 'email'>): string {
    return `${redirect_url()}/verify-additional-email/?email=${email}&uid=${userId}`;
  }

  public static verifyWorkplaceUrl(verifyWorkToken: string): string {
    return `${redirect_url()}/verify-workplace?vtoken=${verifyWorkToken}`;
  }

  constructor() {
    this.management = new ManagementClient({
      domain: env.AUTH0_MANAGEMENT_DOMAIN,
      clientId: env.AUTH0_MANAGEMENT_CLIENT_ID,
      clientSecret: env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    });
    this.auth = new AuthenticationClient({
      domain: env.AUTH0_MANAGEMENT_DOMAIN,
      clientId: env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
    });
  }

  public createUser(data: UserInfo): Promise<UserInfo> {
    return this.management.createUser({ connection: this.connection, ...data });
  }

  public changePassword(
    data: Pick<AuthData, 'email' | 'password'>,
  ): Promise<string> {
    return this.auth.changePassword({
      connection: this.connection,
      ...data,
    });
  }

  public getProfile(
    accessToken: string,
  ): Promise<(UserInfo & { sub: string }) | undefined> {
    return this.auth.getProfile(accessToken);
  }

  public getAccountsByEmail(email: string): Promise<UserInfo[]> {
    return this.management.getUsersByEmail(email);
  }

  public canUserResetPassword(accounts: UserInfo[]): boolean {
    return (
      accounts.filter(
        account => !account.user_id?.startsWith(LINKEDIN_PROVIDER),
      ).length > 0
    );
  }

  public async linkAccounts(
    isUserPassPrimaryAccount: boolean,
    isLinkedInPrimaryAccount: boolean,
    userData?: {
      auth0_linkedin_id?: string;
      auth0_user_pass_id?: string;
    },
  ) {
    if (userData && userData.auth0_linkedin_id && userData.auth0_user_pass_id) {
      let primaryId = '';
      let secondaryProvider = '';
      let secondaryId = '';
      if (isUserPassPrimaryAccount) {
        primaryId = AuthService.auth0UserId(userData.auth0_user_pass_id);
        secondaryProvider = LINKEDIN_PROVIDER;
        secondaryId = AuthService.linkedinUserId(userData.auth0_linkedin_id);
      }
      if (isLinkedInPrimaryAccount) {
        primaryId = AuthService.linkedinUserId(userData.auth0_linkedin_id);
        secondaryProvider = AUTH0_PROVIDER;
        secondaryId = AuthService.auth0UserId(userData.auth0_user_pass_id);
      }
      if (primaryId !== '' && secondaryId !== '') {
        return await this.management.linkUsers(primaryId, {
          connection_id: this.connection,
          user_id: secondaryId,
          provider: secondaryProvider,
        });
      }
    }
  }

  public resetPassword(data: Pick<AuthData, 'email'>): Promise<{}> {
    return this.auth.requestChangePasswordEmail({
      connection: this.connection,
      ...data,
    });
  }

  public setPassword({
    userId,
    password,
  }: Pick<AuthData, 'userId' | 'password'>): Promise<UserInfo> {
    return this.management.updateUser({ id: userId }, { password });
  }

  public signIn({
    email,
    password,
  }: Pick<AuthData, 'email' | 'password'>): Promise<TokenResponse> {
    return this.auth.passwordGrant({
      scope: 'offline_access',
      username: email,
      password,
    });
  }

  public verifyEmailCode(data: { email: string; otp: string }): Promise<{
    access_token: string;
    id_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    return this.auth.verifyEmailCode(data);
  }

  public async getAccessToken(data: { code: string }): Promise<{
    access_token: string;
    id_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const userTokenResponse = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: 'POST',
        headers,
        body: qs.stringify({
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,    
          code: data.code,
          redirect_uri: redirect_url(),
        }),
      },
    );
    if (!userTokenResponse.ok) {
      const errorResponse = JSON.parse(await userTokenResponse.text());
      throw new Error(errorResponse.error_description);
    }
    return JSON.parse(await userTokenResponse.text());
  }
}

let service: AuthService | undefined = undefined;

export const makeAuthService = () => {
  if (!service) {
    service = new AuthService();
  }
  return service;
};
