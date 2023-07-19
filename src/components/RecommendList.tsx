export type RecommendValueType = {
  sickCd: string;
  sickNm: string;
};

// interface RecommendListProps {
//   recommendations : RecommendValueType[]
//   onRecommendItemClick : (item : RecommendValueType) => void;
// }

export const RecommendList = () => {
  return (
    <ul>
      {recommendations.map((item) => (
        <li key={item.sickCd}>{item.sickNm}</li>
      ))}
    </ul>
  );
};
