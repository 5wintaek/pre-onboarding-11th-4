export const RecommendList = ({
  recommendValue,
}: {
  recommendValue: RecommendValueType[];
}) => {
  return (
    <ul>
      {recommendValue.map((item) => (
        <li key={item.sickCd}>{item.sickNm}</li>
      ))}
    </ul>
  );
};
