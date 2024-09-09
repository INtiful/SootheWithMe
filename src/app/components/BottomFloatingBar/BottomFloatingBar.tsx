import Button from '../Button/Button';

const BottomFloatingBar = () => {
  return (
    <section className='border-t-2 border-var-black bg-var-white px-16 py-20 md:px-24'>
      <div className='flex max-w-[996px] justify-between lg:mx-auto'>
        <div>
          <h2 className='text-14 font-semibold lg:text-16'>
            더 건강한 나와 팀을 위한 프로그램 🏃‍️️
          </h2>
          <p className='text-12 font-medium'>
            국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
            회복해봐요
          </p>
        </div>
        <div className='w-[115px]'>
          <Button name='참여하기' variant='default' type='button' />
        </div>
      </div>
    </section>
  );
};

export default BottomFloatingBar;
