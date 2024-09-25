import Input from '../../Input/Input';

interface RecruitmentNumberProps {
  setCapacity: (capacity: number) => void;
}

const RecruitmentNumber = ({ setCapacity }: RecruitmentNumberProps) => {
  return (
    <div className='space-y-12 text-16 font-semibold'>
      <h2>모집정원</h2>
      <Input
        type='number'
        className='bg-var-gray-50 px-16 py-[10px]'
        placeholder='최소 5인 이상 입력해주세요.'
        onChange={(e) => setCapacity(Number(e.target.value))}
      />
    </div>
  );
};

export default RecruitmentNumber;
