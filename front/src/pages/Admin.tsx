import UserTable from '../components/Admin/UserTable';
import DisplayError from '../components/Error/DisplayError';
import { FetchAPI } from '../components/methods/fetch';
import { UserList } from '../constants/fetchMethods';
import { useState, useEffect } from 'react';

export default function Admin() {
  const [users, setUsers] = useState<{ id_user: number, name: string, mail: string, createdAt: string, is_active: boolean }[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const jsonResponse = await FetchAPI(UserList) as { id_user: number, name: string, mail: string, createdAt: string, is_active: boolean }[];
      setUsers(jsonResponse);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }    
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100 dark:bg-neutral-800">
      {isError ? 
        <DisplayError errorMessage={errorMessage} />
      : 
        <UserTable users={users} />
      }
    </div>
  );
}