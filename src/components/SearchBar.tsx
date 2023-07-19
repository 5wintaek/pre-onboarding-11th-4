import { getSickList } from '@/api/sickService';
import { ChangeEvent, useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState<string>('');

  const handleClick = async () => {
    try {
      if (query.trim() !== '') {
        const response = await getSickList(query);
        console.log(response);
      }
    } catch (error) {
      console.error();
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleClick();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleClick}>
        버튼
      </button>
    </div>
  );
}
