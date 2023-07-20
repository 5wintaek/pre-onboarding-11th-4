import { useState } from 'react';

export const useKeyboardNavigation = (maxIndex: number) => {
  const [currentSearchIndex, setCurrentSearchIndex] = useState<number>(0);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        if (currentSearchIndex < maxIndex - 1) {
          setCurrentSearchIndex((currentIndex) => currentIndex + 1);
        }
        break;
      case 'ArrowUp':
        if (currentSearchIndex > 0) {
          setCurrentSearchIndex((currentIndex) => currentIndex - 1);
        }
        break;
      default:
        break;
    }
  };

  return { currentSearchIndex, handleKeyDown };
};
