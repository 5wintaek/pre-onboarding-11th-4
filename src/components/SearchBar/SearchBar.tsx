import { SearchContextType, sickContext } from '@/context/SickContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { SearchList } from '@/components/SearchList/SearchList';
import * as S from './SearchBar.style';
import { SearchIcon } from '@/assets/icon';
import { useDebounce } from '@/hooks/useDebounce';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

export function SearchBar() {
  const { recommendValue, fetchRecommendData } = useContext(
    sickContext
  ) as SearchContextType;
  const [inputValue, setInputValue] = useState<string>('');
  const debounce = useDebounce(inputValue, 300);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { handleKeyDown } = useKeyboardNavigation(recommendValue?.length);

  useEffect(() => {
    if (debounce) {
      fetchRecommendData(debounce);
      console.log(debounce);
    }
  }, [debounce]);

  const handleFocus = () => {
    setIsFocused((prev) => {
      return !prev;
    });
  };

  const handleClick = async () => {};

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value === '') {
      await fetchRecommendData('');
      return;
    }
  };

  return (
    <S.Container>
      <S.Header>국내 모든 임상시험 검색하고 온라인으로 참여하기</S.Header>
      <S.Form>
        <S.Label htmlFor="search">
          <S.Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
          <S.Button type="button" onClick={handleClick}>
            <SearchIcon width={'18px'} height={'20px'} />
          </S.Button>
        </S.Label>
        {isFocused && inputValue.trim() !== '' ? (
          <SearchList recommendValue={recommendValue} />
        ) : null}
      </S.Form>
    </S.Container>
  );
}
