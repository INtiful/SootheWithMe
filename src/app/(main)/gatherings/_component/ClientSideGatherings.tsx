'use client';

import { useState } from 'react';

import Filters from './Filters';
import GatheringCardList from './GatheringCardList';
import Tabs from './Tabs';
import CreateGatheringButton from './CreateGatheringButton';
import Chips from './Chips';
import MakeGatheringModal from '@/app/components/Modal/MakeGatheringModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { GatheringsListData } from '@/types/data.type';

interface ClientSideGatheringsProps {
  gatherings: GatheringsListData[];
}

const ClientSideGatherings = ({ gatherings }: ClientSideGatheringsProps) => {
  const [activeTab, setActiveTab] = useState<'workation' | 'dalaemfit'>(
    'dalaemfit',
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleTabClick = (type: 'workation' | 'dalaemfit') => {
    setActiveTab(type);
  };

  usePreventScroll(isModalOpen);

  return (
    <>
      <div className='divide-y'>
        <div className='mt-32'>
          <div className='flex justify-between'>
            <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
            <CreateGatheringButton onClick={() => setIsModalOpen(true)} />
          </div>
          <Chips />
        </div>
        <Filters />
      </div>
      <GatheringCardList gatherings={gatherings} />

      {isModalOpen && (
        <MakeGatheringModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ClientSideGatherings;
