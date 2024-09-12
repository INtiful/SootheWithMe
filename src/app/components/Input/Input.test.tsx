import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
  it('기본 렌더링', () => {
    render(<Input placeholder='test' />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('플레이스홀더 텍스트가 제대로 표시된다', () => {
    render(<Input placeholder='이메일을 입력해주세요.' />);
    const inputElement = screen.getByPlaceholderText('이메일을 입력해주세요.');
    expect(inputElement).toBeInTheDocument();
  });

  it('입력 값이 올바르게 설정된다', () => {
    render(<Input value='test@example.com' onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue('test@example.com');
    expect(inputElement).toBeInTheDocument();
  });

  it('type 속성이 제대로 설정된다', () => {
    render(<Input type='password' aria-label='Input' />);
    const inputElement = screen.getByLabelText('Input');
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('hasError prop이 true일 때 에러 스타일이 적용된다', () => {
    render(<Input hasError />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('ring-var-red ring-2');
  });

  it('className prop이 적용된다', () => {
    render(<Input className='h-[200px]' />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('h-[200px]');
  });
});
