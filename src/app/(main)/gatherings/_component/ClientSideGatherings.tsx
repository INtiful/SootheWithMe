'use client';

import { useState } from 'react';

import Filters from './Filters';
import GatheringCardList from './GatheringCardList';
import Tabs from '@/app/components/Tabs/Tabs';
import Chips from '@/app/components/Chips/Chips';
import CreateGatheringButton from './CreateGatheringButton';
import MakeGatheringModal from '@/app/components/Modal/MakeGatheringModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { GatheringsListData } from '@/types/data.type';
import fetchGatherings from '@/app/actions/gatherings/fetchGatherings';
import { formatingDate } from '@/utils/formatDate';

interface ClientSideGatheringsProps {
  gatherings: GatheringsListData[];
}

const ClientSideGatherings = ({ gatherings }: ClientSideGatheringsProps) => {
  const [activeTab, setActiveTab] = useState<'WORKATION' | 'DALLAEMFIT'>(
    'DALLAEMFIT',
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] =
    useState<GatheringsListData[]>(gatherings);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  );
  const [selectedChip, setSelectedChip] = useState<
    'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleTabClick = async (type: 'WORKATION' | 'DALLAEMFIT') => {
    setActiveTab(type);
    setSelectedChip(null);

    const newData = await fetchGatherings({
      type,
      location: selectedLocation,
      date: selectedDate ? formatingDate(selectedDate) : undefined,
    });
    setFilteredData(newData);
  };

  const handleChipClick = async (
    label: 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS',
  ) => {
    setSelectedChip(label);
    const type = label === 'ALL' ? 'DALLAEMFIT' : label;

    const newData = await fetchGatherings({
      type,
      location: selectedLocation,
      date: selectedDate ? formatingDate(selectedDate) : undefined,
    });
    setFilteredData(newData || []);
  };

  const handleLocationChange = async (location: string | undefined) => {
    setSelectedLocation(location);

    const type =
      selectedChip === 'ALL' || !selectedChip ? activeTab : selectedChip;
    const newData = await fetchGatherings({
      type,
      location,
      date: selectedDate ? formatingDate(selectedDate) : undefined,
    });
    setFilteredData(newData || []);
  };

  const handleDateChange = async (date: Date | null) => {
    setSelectedDate(date);

    const type =
      selectedChip === 'ALL' || !selectedChip ? activeTab : selectedChip;
    const newData = await fetchGatherings({
      type,
      location: selectedLocation,
      date: date ? formatingDate(date) : undefined,
    });
    setFilteredData(newData || []);
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
          <Chips activeTab={activeTab} onChipClick={handleChipClick} />
        </div>
        <Filters
          onLocationChange={handleLocationChange}
          onDateChange={handleDateChange}
        />
      </div>
      <GatheringCardList gatherings={filteredData} />

      {isModalOpen && (
        <MakeGatheringModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ClientSideGatherings;
