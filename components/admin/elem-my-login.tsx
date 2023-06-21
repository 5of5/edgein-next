import { useEffect } from 'react';

const ElemMyLogin = () => {
  useEffect(() => {
    window.location.href = '/';
  }, []);

  return <div />;
};

export default ElemMyLogin;
