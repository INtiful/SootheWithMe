import Chip from '@/app/components/Chip/Chip';

const Chips = () => {
  return (
    <div className='mt-8 space-x-8 py-16'>
      <Chip state='active'>전체</Chip>
      <Chip state='default'>오피스 스트레칭</Chip>
      <Chip state='default'>마인드풀니스</Chip>
    </div>
  );
};

export default Chips;
