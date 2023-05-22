import { useEffect, useState } from 'react'
import { CustomLoader } from '@/components/Loader/Loader';

const ProtectedRoute = ({ children, router }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    if (token && path === "/login") {
      setTimeout(() => {
        setIsLoading(false);
        router.push('/');
      }, 500);
    } else if (path === "/") {
      setTimeout(() => {
        setIsLoading(false);
        router.push('/login');
      }, 500);
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
