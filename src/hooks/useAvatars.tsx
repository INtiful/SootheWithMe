import { useState } from 'react';

import { GatheringParticipantsType } from '@/types/data.type';
import Avatar from '@/app/components/InformationCard/Avatar';

interface UseAvatarsProps {
  participants: GatheringParticipantsType[];
  participantCount: number;
}

const useAvatars = ({ participants, participantCount }: UseAvatarsProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const renderAvatars = () => {
    const maxVisible = 4;

    const visibleAvatars = participants
      .slice(0, maxVisible)
      .map(({ User }) => (
        <Avatar
          key={User.id}
          id={User.id}
          name={User.name}
          image={User.image}
          className='h-28 w-28'
        />
      ));

    if (participantCount > maxVisible) {
      visibleAvatars.push(
        <div
          key='remaining'
          className='group relative'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='z-base flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-14 font-semibold'>
            +{participantCount - maxVisible}
          </div>
          <div
            className={`absolute left-0 top-full ml-12 mt-2 flex w-max -space-x-6 transition-opacity duration-300 ${
              isHovered
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            {participants.slice(maxVisible).map(({ User }) => (
              <Avatar
                key={User.id}
                id={User.id}
                name={User.name}
                image={User.image}
                className={`h-28 w-28 transition-transform duration-300 ${
                  isHovered ? 'translate-y-0' : 'translate-y-4'
                }`}
              />
            ))}
          </div>
        </div>,
      );
    }

    return visibleAvatars;
  };

  return { renderAvatars };
};

export default useAvatars;
