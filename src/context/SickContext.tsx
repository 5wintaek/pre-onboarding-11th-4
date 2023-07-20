import { getSickList } from '@/api/sickService';
import { ReactNode, useState, createContext } from 'react';

type RecommendValueType = {
  sickCd: string;
  sickNm: string;
};

type SearchContextType = {
  recommendValue: RecommendValueType[] | undefined;
  fetchRecommendData: (
    value: string
  ) => Promise<RecommendValueType[] | undefined>;
};

export const sickContext = createContext<SearchContextType>(null);

export function SickProvider({ children }: ReactNode) {
  const [recommendValue, setRecommendValue] = useState<
    RecommendValueType[] | undefined
  >([]);

  const fetchRecommendData = async (query: string) => {
    try {
      if (!query) {
        setRecommendValue([]);
        return;
      } else {
        const data = await getSickList(query);
        console.info('calling api..');
        const filteredData = data.filter((item: RecommendValueType) =>
          item.sickNm.includes(query)
        );
        setRecommendValue(filteredData);
        return filteredData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <sickContext.Provider
      value={{ recommendValue, fetchRecommendData, setRecommendValue }}
    >
      {children}
    </sickContext.Provider>
  );
}

export type { SearchContextType, RecommendValueType };
export default SickProvider;
