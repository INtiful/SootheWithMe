import ProgressBar from './components/ProgressBar/ProgressBar';

export default function Home() {
  return (
    <main className='flex h-dvh w-dvw items-center justify-center bg-white'>
      <div className='w-500'>
        <ProgressBar progress={15} />
      </div>
    </main>
  );
}
