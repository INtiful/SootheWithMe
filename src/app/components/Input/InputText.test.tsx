import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputText from './InputText';

describe('InputText 컴포넌트', () => {
  it('기본 렌더링', () => {
    render(<InputText value='' onChange={() => {}} />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toBeInTheDocument();
  });

  it('플레이스홀더 텍스트가 제대로 표시된다', () => {
    render(
      <InputText
        value=''
        placeholder='할 일의 제목을 적어주세요.'
        onChange={() => {}}
      />,
    );
    const textareaElement =
      screen.getByPlaceholderText('할 일의 제목을 적어주세요.');
    expect(textareaElement).toBeInTheDocument();
  });

  it('입력 값이 올바르게 설정된다', () => {
    render(<InputText value='test@example.com' onChange={() => {}} />);
    const textareaElement = screen.getByDisplayValue('test@example.com');
    expect(textareaElement).toBeInTheDocument();
  });

  it('className prop이 적용된다', () => {
    render(<InputText value='' className='h-[200px]' onChange={() => {}} />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveClass('h-[200px]');
  });

  it('onChange 핸들러가 호출된다', () => {
    const handleChange = jest.fn();
    render(<InputText value='' onChange={handleChange} />);
    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
