import BoxSelect from './BoxSelect';
import { render, screen } from '@testing-library/react';

describe('BoxSelect Component Test', () => {
  // 기본 렌더링 확인
  it('should render BoxSelect Component', () => {
    render(<BoxSelect title='제목' isSelected={false} onChange={() => {}} />);
    const titleElement = screen.getByText('제목');
    expect(titleElement).toBeInTheDocument();
  });

  // 선택 시 색상 변경 확인
  it('should change color when selected', () => {
    render(<BoxSelect title='제목' isSelected={true} onChange={() => {}} />);
    const boxSelectElement = screen.getByText('제목');
    expect(boxSelectElement).toHaveClass('bg-var-gray-900 text-var-white');
  });
});
