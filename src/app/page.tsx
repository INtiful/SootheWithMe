import BoxSelect from './components/BoxSelect/BoxSelect';

export default function Home() {
  return (
    <main className='flex h-dvh w-dvw items-center justify-center bg-white'>
      <div className='flex h-100 w-472 gap-12 bg-var-orange-200'>
        <BoxSelect title={'달램핏'} subTitle={'오피스 트레이닝'} />
        <BoxSelect title={'달램핏'} subTitle={'마인드풀니스'} />
        <BoxSelect title={'워케이션'} subTitle={''} />
      </div>
    </main>
  );
}
