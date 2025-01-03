export interface RequestOtpParams {
  email?: string;
  successRedirectUrl: string;
  failRedirectUrl: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
  captcha?: 'true' | 'false';
  hide?: 'true' | 'false';
  lang?: 'en' | 'ja' | 'ko' | 'es' | 'fr';
}

export interface RequestOtpResponse {
  otp_id: string;
  link: string;
  otp_secret: string;
}

export const requestEmailOtp = async (
  params: RequestOtpParams,
): Promise<RequestOtpResponse> => {
  const {
    NEXT_GET_OTP_VERIFICATION_API_KEY: apiKey,
    NEXT_GET_OTP_VERIFICATION_AUTH_TOKEN: apiToken,
  } = process.env;

  if (!apiKey || !apiToken) {
    throw new Error('API Key or Token is missing in environment variables');
  }

  const endpoint = 'https://otp.dev/api/verify/';

  const formData = new URLSearchParams();
  formData.append('channel', 'email');
  if (params.email) formData.append('email', params.email);
  formData.append('success_redirect_url', params.successRedirectUrl);
  formData.append('fail_redirect_url', params.failRedirectUrl);
  if (params.callbackUrl) formData.append('callback_url', params.callbackUrl);
  if (params.metadata)
    formData.append('metadata', JSON.stringify(params.metadata));
  formData.append('captcha', params.captcha || 'true');

  const headers = {
    Authorization: `Basic ${btoa(`${apiKey}:${apiToken}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to request OTP');
  }

  return response.json();
};
