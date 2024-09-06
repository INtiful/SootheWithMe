'use client';
import { forwardRef } from 'react';

// @todo: 추후 파일 분리예정
export const InputStyles = {
  base: 'w-full items-center gap-4 rounded-lg px-16 py-8 focus:ring-2',
  hover: 'hover:ring-2 hover:ring-var-orange-300',
  focus: 'focus:ring-var-orange-600',
  error: 'ring-var-red ring-2', // form 사용시 에러메시지용 레이아웃
};

/**
 * Input 컴포넌트의 props 타입 정의
 * @property {boolean} [hasError=false] - 에러 상태를 나타내는 선택적 prop
 * @property {string} [className=''] - 추가적인 사용자 정의 클래스 이름
 */
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  className?: string;
}

/**
 * Input 컴포넌트 정의
 *
 * @param {InputProps} props - Input 컴포넌트에 전달되는 props
 * @param {Ref<HTMLInputElement>} ref - forwardRef를 사용하여 전달받은 ref
 */
const Input = forwardRef<HTMLInputElement, Props>(
  ({ hasError = false, className = '', ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`${InputStyles.base} hover: ${InputStyles.hover} focus: ${InputStyles.focus} ${hasError && InputStyles.error} ${className}`}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
