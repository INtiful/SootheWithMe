import InformationCard from '@/app/components/InformationCard/InformationCard';
import { PARTICIPANTS } from '../../mockData/mockData';

interface GatheringInfoProps {
  name: string;
  location: string;
  dateTime: string;
  participantCount: number;
  capacity: number;
}

const GatheringInfo = ({
  name = '테스트',
  location,
  dateTime,
  participantCount,
  capacity,
}: GatheringInfoProps) => {
  return (
    <div className='h-[270px] w-[calc(100vw-32px)] md:w-[50vw] lg:w-full'>
      <InformationCard
        title={name}
        address={location}
        date={dateTime}
        time={dateTime}
        participants={PARTICIPANTS}
        maxParticipants={capacity}
      />
    </div>
  );
};

export default GatheringInfo;
