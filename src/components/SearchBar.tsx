import { getSickList } from '@/api/sickService';
import { SearchContextType, sickContext } from '@/context/SickContext';
import { ChangeEvent, useContext, useState } from 'react';
import { RecommendList } from './RecommendList';

export function SearchBar() {
  const { recommendValue, fetchRecommendData } = useContext(
    sickContext
  ) as SearchContextType;
  const [inputValue, setInputValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

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
    setInputValue(e.target.value);
    await fetchRecommendData(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === 'Enter') {
    //   e.preventDefault();
    //   handleClick();
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleClick}>
        버튼
      </button>
      <RecommendList recommendValue={recommendValue} />
    </div>
  );
}
