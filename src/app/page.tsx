import ProgressBar from './components/ProgressBar/ProgressBar';

export default function Home() {
  return (
    <main className='flex h-dvh w-dvw items-center justify-center bg-white'>
      <div className='flex w-500 flex-col gap-20'>
        <ProgressBar
          participantNumber={3}
          hasParticipantNumber={true}
          hasOpeningConfirmed={true}
        />
        <ProgressBar
          participantNumber={5}
          hasParticipantNumber={true}
          hasOpeningConfirmed={true}
        />
        <ProgressBar
          participantNumber={12}
          hasParticipantNumber={true}
          hasOpeningConfirmed={true}
        />
        <ProgressBar
          participantNumber={20}
          hasParticipantNumber={true}
          hasOpeningConfirmed={true}
        />
        <ProgressBar
          participantNumber={5}
          hasParticipantNumber={false}
          hasOpeningConfirmed={false}
        />
      </div>
    </main>
  );
}
