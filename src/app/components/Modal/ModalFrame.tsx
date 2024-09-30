import { ReactNode } from 'react';
import ModalPortal from './ModalPortal';

interface ModalFrameProps {
  children: ReactNode;
}

const ModalFrame = ({ children }: ModalFrameProps) => {
  return (
    <ModalPortal>
      <div className='fixed left-0 top-0 z-popup flex h-full w-full items-center justify-center bg-var-black/50 md:h-screen'>
        {children}
      </div>
    </ModalPortal>
  );
};
export default ModalFrame;
