import { Outlet } from 'react-router-dom';
import { useVerifyMutation } from '../features/auth/authApiSlice';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../features/auth/authSlice';
import { useEffect, useRef } from 'react';
import Nav from './Nav';
import Spinner from './Spinner';

const Layout = () => {
  const { isLoggedIn } = useSelector(selectAuthState);
  const effectRan = useRef(false);

  const [verify, { isLoading }] = useVerifyMutation();

  useEffect(() => {
    if (effectRan.current) {
      const verifyToken = async () => {
        try {
          await verify();
        } catch (err) {
          console.error(err);
        }
      };

      if (!isLoggedIn) {
        verifyToken();
      }
    }

    return () => (effectRan.current = true);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;
