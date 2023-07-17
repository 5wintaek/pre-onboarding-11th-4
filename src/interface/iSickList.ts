export type ISickList = iSickChild[]; // I를 앞에 쓴 이유는 interface 라고 알려주기 위함 (관례)
export interface iSickChild {
  sickCd: string;
  sickNm: string;
}
