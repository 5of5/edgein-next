import { useEffect } from 'react';

const ElemAdminLogin = () => {
  useEffect(() => {
    window.location.href = '/';
  }, []);

  return <div>Please log in to main app.</div>;
};

export default ElemAdminLogin;
