import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If the token is empty, redirect to the login page
      router.push('/login');
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [router]);

  if (isLoading) {
    return <div class="loader"></div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
