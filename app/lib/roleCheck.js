// app/hooks/useRoleRedirect.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../userContext';
import { decodeToken } from './auth';
import { checkToken } from './auth';

export function roleCheck() {
  const { userRole, setUserRole } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const token = checkToken()
    
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
      } else {
        alert("cant decode token")
        router.push('/login');
      }
    } 
  }, [setUserRole, router]);

  useEffect(() => {
    if (userRole) {
      if (userRole !== 'admin') {
        alert("You can't access admin.");
        router.push('/serviceForm');
      }
    }
  }, [userRole]);
}
