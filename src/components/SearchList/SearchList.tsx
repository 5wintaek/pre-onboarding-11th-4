import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import styled from 'styled-components';

export const SearchList = ({
  recommendValue,
}: {
  recommendValue: RecommendValueType[];
}) => {
  const { currentSearchIndex } = useKeyboardNavigation(recommendValue.length);
  return (
    <Wrap>
      {recommendValue.length === 0 ? (
        <List>추천 검색어 없음</List>
      ) : (
        recommendValue.map((item, index) => (
          <List
            key={item.sickCd}
            className={index === currentSearchIndex ? 'selected' : ''}
          >
            {item.sickNm}
          </List>
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
