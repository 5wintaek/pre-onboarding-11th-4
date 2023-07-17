import { ReactNode, createContext, useContext } from 'react';
import { sickServiceInterface } from '@/api/sickService';

const sickServiceContext = createContext<sickServiceInterface | null>(null);

export const useSickService = () => useContext(sickServiceContext);

export const sickServiceProvider = ({
  children,
  sickService,
}: {
  children: ReactNode;
  sickService: sickServiceInterface;
}) => {
  const getSickListByQuery = sickService.getSickListByQuery.bind(sickService);
  return (
    <sickServiceContext.Provider value={{ getSickListByQuery }}>
      {children}
    </sickServiceContext.Provider>
  );
};
