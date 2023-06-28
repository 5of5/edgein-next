import { User, UserRole } from '@/models/user';
import { AuthProvider } from 'react-admin';

const useAdminAuthProvider = (allowedRoles: UserRole[], user?: User) => {
  const authProvider = {
    // authentication
    login: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      if (user) {
        if (allowedRoles.includes(user.role)) {
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('User is not an admin'));
        }
      }
      return Promise.reject();
    },
    logout: () => Promise.resolve(),
    getIdentity: () => Promise.resolve().then(res => res),
    // authorization
    getPermissions: () => Promise.resolve(),
  } as AuthProvider;

  return authProvider;
};

export default useAdminAuthProvider;
