import { ReactNode } from 'react';
import ModalPortal from './ModalPortal';

interface ModalFrameProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalFrame = ({ children, onClose }: ModalFrameProps) => {
  return (
    <ModalPortal>
      <div
        onClick={onClose}
        className='z-20 fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-var-black/50'
      >
        {children}
      </div>
    </ModalPortal>
  );
};
export default ModalFrame;
