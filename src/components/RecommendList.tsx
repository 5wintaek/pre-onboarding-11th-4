import styled from 'styled-components';
// import { SearchIcon } from '@/assets/icon';

export const RecommendList = ({
  recommendValue,
}: {
  recommendValue: RecommendValueType[];
}) => {
  return (
    <Wrap>
      {recommendValue.length === 0 ? (
        <List>추천 검색어 없음</List>
      ) : (
        recommendValue.map((item) => (
          <List key={item.sickCd}>{item.sickNm}</List>
        ))
      )}
    </Wrap>
  );
};

export const Wrap = styled.ul`
  text-align: left;
  list-style: none;
  margin: 10px auto 0;
  background: #fff;
  border-radius: 15px;
  padding: 10px 0 20px;
  /* margin-left: 80px; */
`;

export const List = styled.li`
  color: #999;
  font-size: 14px;
  padding: 15px 30px;
`;
