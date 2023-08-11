## 실행 방법

```bash
$ npm install
$ npm start
```

## 기술 스택

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![javascript](https://img.shields.io/badge/typescript-5.0.2-3178C6?logo=typescript)
![axios](https://img.shields.io/badge/axios-1.4.0-5A29E4?logo=axios)
![eslint](https://img.shields.io/badge/eslint-8.44.0-A100FF?logo=eslint)
![prettier](https://img.shields.io/badge/prettier-3.0.0-F7B93E?logo=prettier)
![reactMarkdown](https://img.shields.io/badge/react--markdown-8.0.6-00A98F?logo=reactMarkdown)

## 1. api 호출하기

제일 처음으로 작업한 api 호출입니다. axios 를 사용하여 Create 로 먼저 어떻게 만들어줄지 정해줍니다.

```js
import axios from 'axios';

const axiosClient = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default axiosClient;
```

### 1-2 get 호출하기

만든 axiosClient 를 가져온 후 get() 을 이용하여 data를 가져올 수 있게끔 하였습니다

```js
import axios from 'axios';

const axiosClient = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default axiosClient;
```

## 2. context API

사실 contextAPI 를 사용하지 않아두 되지만, 저번 과제에서 배운 Context API 를 한번 더 사용하면서 익숙해지기 위해 사용하였습니다.
추가적으로 filter 함수를 넣어 검색창에 들어가는 단어들이 포함이 된다면 검색창 UI 에 그려주도록 하였습니다.

```js
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
      if (query === '') {
        setRecommendValue([]);
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
```

## 3. SearchBar component

SearchBar에는 form,label,input 이 존재하며 검색어를 입력할 시 검색창 UI 를 그려주는 RecommendList 가 존재합니다.
input 창에 Focus 가 간다면, 검색창이 나타나고 검색어를 입력하게 된다면 관련된 키워드를 나타내줍니다.
Debounce 를 사용하여 키워드를 입력할떄마다 서버에 계속해서 전달해주는 현상을 막았습니다.
아직까진 input 창에 입력을 하고 난 뒤, 클릭이나 엔터키를 누르게 된다면 그와 관련된 추천 검색어를 li창에 그려줘야 하지만 로컬스트리지 및 캐싱 작업을 마무리 하지 못하였습니다.

```js
import { SearchContextType, sickContext } from '@/context/SickContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RecommendList } from '../RecommendList';
import * as S from './SearchBar.style';
import { SearchIcon } from '@/assets/icon';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar() {
  const { recommendValue, fetchRecommendData, setRecommendValue } = useContext(
    sickContext
  ) as SearchContextType;
  const [inputValue, setInputValue] = useState<string>('');
  const debounce = useDebounce(inputValue, 300);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // const limitedList = recommendValue?.slice(0, 7);

  // 로컬 스토리지에서 추천 검색어 불러오기
  // useEffect(() => {
  //   const savedRecommendations = localStorage.getItem('recommendations');
  //   if (savedRecommendations) {
  //     setRecommendValue(JSON.parse(savedRecommendations));
  //   }
  // }, []);

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

  // const handleClick = async () => {
  //   localStorage.setItem('추천검색어', JSON.stringify(inputValue));
  // };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    await fetchRecommendData(value);

    localStorage.setItem('추천검색어', JSON.stringify(recommendValue));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === 'Enter') {
    //   e.preventDefault();
    //   handleClick();
    // }
  };

  const handleClick = () => {
    if (inputValue.trim() !== '') {
      const searchHistory = localStorage.getItem('추천검색어');
      if (searchHistory) {
        const searchHistoryArray = JSON.parse(searchHistory);
        searchHistoryArray.push(inputValue);
        localStorage.setItem('추천검색어', JSON.stringify(searchHistoryArray));
      } else {
        localStorage.setItem('추천검색어', JSON.stringify([inputValue]));
      }
    }
  };

  useEffect(() => {
    const searchHistory = localStorage.getItem('추천검색어');
    if (searchHistory) {
      setRecommendValue(JSON.parse(searchHistory));
    }
  }, []);

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
```

### 3-1 RecommendList

map 함수를 이용하여 입력된 관련 검색어들을 li 창에 띄워주는 역할을 해줍니다.
또한 input 창에 length 가 0 이라면 '추천 검색어를 없음' 이라는 문구를 띄워주는 역할을 합니다.

```js
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
```

### 3-2 useDebounce hook

Debounce 로직의 대한 hook 을 직접 구현해 보았습니다.
Debounce에 관한 개념들은 알았지만 직접 쓰는건 이번이 처음이다보니 적용하는 단계에서 많은 어려움을 겪었습니다.

```js
import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
};
```
