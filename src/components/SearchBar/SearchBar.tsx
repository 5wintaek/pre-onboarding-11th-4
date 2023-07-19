import { SearchContextType, sickContext } from '@/context/SickContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RecommendList } from '../RecommendList';
import * as S from './SearchBar.style';
import { SearchIcon } from '@/assets/icon';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar() {
  const { recommendValue, fetchRecommendData } = useContext(
    sickContext
  ) as SearchContextType;
  const [inputValue, setInputValue] = useState<string>('');
  const debounce = useDebounce(inputValue, 300);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // const limitedList = recommendValue?.slice(0, 7);

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

  const handleClick = async () => {
    // 여기는 이동처리만
    // try {
    //   if (inputValue.trim() !== '') {
    //     const response = await getSickList(inputValue);
    //     console.log(response);
    //     setShowModal(true);
    //   }
    // } catch (error) {
    //   console.error();
    // }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    await fetchRecommendData(value);

    // if (e.target.value === '') {
    //   setRecommendValue([]);
    // } else {
    //   await fetchRecommendData(e.target.value);
    // }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === 'Enter') {
    //   e.preventDefault();
    //   handleClick();
    // }
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
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleFocus}
          />
          <S.Button type="button" onClick={handleClick}>
            <SearchIcon width={'18px'} height={'20px'} />
          </S.Button>
        </S.Label>
        {isFocused && inputValue.trim() !== '' ? (
          <RecommendList recommendValue={recommendValue} />
        ) : null}
      </S.Form>
    </S.Container>
  );
}
