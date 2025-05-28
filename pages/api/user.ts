import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';
import UserService from '../../utils/users';

// Define response types for consistency
type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) => {
  // Only allow GET requests
  console.log('-----------------------------------');
  console.log('[Server] API /user route hit with method:', req.method);

  if (req.method !== 'GET') {
    console.log('[Server] Method not allowed:', req.method);
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // Extract token from cookies
    const token = CookieService.getAuthToken(req.cookies);
    console.log('[Server] Token exists:', !!token);

    // If no token exists, return unauthorized
    if (!token) {
      console.log('[Server] No authentication token found');
      // Return a 401 status without redirecting
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    // Verify and decode token
    const user = await CookieService.getUser(token);
    console.log(
      '[Server] User decoded from token:',
      user ? `id: ${user.id}, email: ${user.email}` : 'null',
    );

    // Handle case where token is invalid or expired
    if (!user) {
      console.log('[Server] Token invalid or expired');
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }

    // Check if user is active
    if (user.active === false) {
      console.log('[Server] User account inactive');
      return res.status(403).json({
        success: false,
        error: 'Account inactive',
      });
    }

    // Handle token refresh logic
    if (user._iat && user.email) {
      // Get user from database to verify still exists and is active
      console.log('[Server] Checking user in database:', user.email);
      const dbUser = await UserService.findOneUserByEmailForToken(user.email);

      if (!dbUser) {
        console.log('[Server] User not found in database');
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      if (dbUser.active === false) {
        console.log('[Server] Database user account inactive');
        return res.status(403).json({
          success: false,
          error: 'Account inactive',
        });
      }

      // Token refresh logic - only refresh if token is older than 1 hour
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenAge = currentTime - user._iat;
      const ONE_HOUR = 3600; // 1 hour in seconds

      if (tokenAge > ONE_HOUR) {
        console.log(
          `[Server] Refreshing token for user: ${user.id}, token age: ${tokenAge}s`,
        );

        try {
          const userToken = UserService.createToken(dbUser, false);
          const newToken = await CookieService.createUserToken(userToken);
          CookieService.setTokenCookie(res, newToken);

          // Update user object with fresh data
          const refreshedUser = await CookieService.getUser(newToken);

          // Return user data with success status
          console.log('[Server] Successfully returning refreshed user data');
          return res.status(200).json({
            success: true,
            data: refreshedUser,
          });
        } catch (refreshError) {
          console.error('[Server] Error refreshing token:', refreshError);
          // If token refresh fails, still return the current user data
          console.log(
            '[Server] Returning current user data despite refresh failure',
          );
          return res.status(200).json({
            success: true,
            data: user,
          });
        }
      }
    }

    // Return user data with success status
    console.log('[Server] Successfully returning user data');
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('[Server] Error in /api/user endpoint:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export default handler;
