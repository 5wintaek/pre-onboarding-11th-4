import { ISickList } from '@/interface/iSickList';
import { AxiosInstance } from 'axios'; // Typescript 에서만 사용하는 타입지정
import { getSickURL } from '@/utils/sickUrl';

export interface sickServiceInterface {
  getSickListByQuery: (query: string) => Promise<ISickList>;
}

export class SickService implements sickServiceInterface {
  axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  getSickListbyQuery = async (query: string) => {
    const { data } = await this.axiosClient.get(getSickURL(query));
    return data as ISickList;
  };
}
