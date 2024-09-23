import { getCookie } from '@/actions/auth/cookie/cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: {
    id: string;
    email: 'string';
    name: 'string';
    companyName: 'string';
    image: 'string';
    createdAt: 'string';
    updatedAt: 'string';
  };

  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await getCookie('token');
      setLoading(true);
      setError(null);
      try {
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/user`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        } else {
          const errorData = await userResponse.json();
          throw new Error(errorData.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // 초기 유저 데이터 가져오기 (로그인 후)
    fetchUserData();
  }, []); // 컴포넌트 마운트 시 한 번만 호출

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('유저 데이터를 불러오는데 실패했습니다.');
  }
  return context;
};
