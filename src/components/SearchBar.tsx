import { getSickList } from '@/api/sickService';

export function SearchBar() {
  const handleClick = async (e) => {
    await getSickList('담낭');
  };

  return (
    <div>
      <input type="text" />
      <button onClick={handleClick}>버튼</button>
    </div>
  );
}
