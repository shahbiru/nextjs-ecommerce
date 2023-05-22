import { useEffect, useState } from 'react'
import { CustomLoader } from '@/components/Loader/Loader';

const ProtectedRoute = ({ children, router }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    let unprotectedRoutes = [
      "/login"
    ];

    let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
    if (token && !pathIsProtected) {
      setTimeout(() => {
        setIsLoading(false);
        router.push('/');
      }, 3000);
    } else if (path === "/") {
      setTimeout(() => {
        setIsLoading(false);
        router.push('/login');
      }, 2000);
    } else {
      setIsLoading(false)
    }
  }, [router]);

  if (isLoading) {
    return <CustomLoader />
  }

  return <>{children}</>;
};

export default ProtectedRoute;
