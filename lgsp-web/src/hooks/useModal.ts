import { useState } from 'react';
type IModal = [boolean, () => void, () => void]
const useModal = (): IModal => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onOpen = () => {
    setIsVisible(true);
  }
  const onClose = () => {
    setIsVisible(false);
  }

  return [isVisible, onClose, onOpen]
} 

export default useModal;
