'use client';

import { HeadSaved } from '@/public/images';
import Tab from '../components/Tab/Tab';
import { useState } from 'react';
import Chip from '../components/Chip/Chip';
import FilterList from '../components/Filter/FilterList';
import FilterSort from '../components/Filter/FilterSort';
import CardList from '../components/CardList/CardList';
import { GatheringsListData } from '@/types/data.type';
import DropDown from '../components/DropDown/DropDown';

const tempData = [
  {
    teamId: 0,
    id: 0,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: '2024-09-11T01:33:50.892Z',
    registrationEnd: '2024-09-11T01:33:50.892Z',
    location: '을지로 3가',
    participantCount: 0,
    capacity: 0,
    image: '/images/mock-image.png',
    createdBy: 0,
  },
  {
    teamId: 0,
    id: 1,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: '2024-09-11T01:33:50.892Z',
    registrationEnd: '2024-09-11T01:33:50.892Z',
    location: '을지로 3가',
    participantCount: 0,
    capacity: 0,
    image: '/images/mock-image.png',
    createdBy: 0,
  },
  {
    teamId: 0,
    id: 2,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: '2024-09-11T01:33:50.892Z',
    registrationEnd: '2024-09-11T01:33:50.892Z',
    location: '을지로 3가',
    participantCount: 0,
    capacity: 0,
    image: '/images/mock-image.png',
    createdBy: 0,
  },
  {
    teamId: 0,
    id: 3,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: '2024-09-11T01:33:50.892Z',
    registrationEnd: '2024-09-11T01:33:50.892Z',
    location: '을지로 3가',
    participantCount: 0,
    capacity: 0,
    image: '/images/mock-image.png',
    createdBy: 0,
  },
];

const emptyArr: GatheringsListData[] = [];

// mock data
const OPTIONS = [
  '건대입구',
  '을지로 3가',
  '신림',
  '홍대입구',
  '시청',
  '신대방',
  '서울대입구',
];

const SavedPage = () => {
  const [activeTab, setActiveTab] = useState<'dalaemfit' | 'workation'>(
    'dalaemfit',
  );

  const [activeChip, setActiveChip] = useState<
    'all' | 'officeStretching' | 'mindfulness'
  >('all');

  const handleClickTab = (type: 'dalaemfit' | 'workation') => {
    setActiveTab(type);
    if (type === 'workation') {
      setActiveChip('all');
    }
  };

  const handleClickChips = (
    type: 'all' | 'officeStretching' | 'mindfulness',
  ) => {
    setActiveChip(type);
  };

  return (
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pb-48 pt-24 md:px-24 md:pt-40 lg:px-100'>
      {/* head */}
      <div className='flex items-center gap-16'>
        <HeadSaved className='h-72 w-72' />
        <div>
          <h2 className='mb-8 text-18 font-semibold text-var-gray-900'>
            찜한 모임
          </h2>
          <p className='text-14 font-medium text-var-gray-700'>
            마감되기 전에 지금 바로 참여해보세요 👀
          </p>
        </div>
      </div>

      <section className='mt-24 flex grow flex-col md:mt-32'>
        {/* tab */}
        <div className='mb-12 flex items-center'>
          <Tab
            type='dalaemfit'
            isActive={activeTab === 'dalaemfit'}
            onClick={() => handleClickTab('dalaemfit')}
          />
          <Tab
            type='workation'
            isActive={activeTab === 'workation'}
            onClick={() => handleClickTab('workation')}
          />
        </div>
        {/* filter */}
        <div className='flex flex-col gap-16'>
          <div
            className={`flex items-center gap-8 ${activeTab === 'workation' ? 'hidden' : ''}`}
          >
            <button type='button' onClick={() => handleClickChips('all')}>
              <Chip state={activeChip === 'all' ? 'active' : 'default'}>
                전체
              </Chip>
            </button>
            <button
              type='button'
              onClick={() => handleClickChips('officeStretching')}
            >
              <Chip
                state={activeChip === 'officeStretching' ? 'active' : 'default'}
              >
                오피스 스트레칭
              </Chip>
            </button>
            <button
              type='button'
              onClick={() => handleClickChips('mindfulness')}
            >
              <Chip state={activeChip === 'mindfulness' ? 'active' : 'default'}>
                마인드풀니스
              </Chip>
            </button>
          </div>
          <div className='w-full border-y border-var-gray-200' />
          <div className='flex items-center justify-between lg:hidden'>
            <div className='flex gap-8'>
              <FilterList>지역 선택</FilterList>
              <FilterList>날짜 선택</FilterList>
            </div>
            <FilterSort>마감 임박</FilterSort>
          </div>
        </div>
        {/* data list */}
        <div className='mt-24 flex grow flex-col gap-24'>
          {tempData.length > 0 ? (
            tempData.map((item) => <CardList key={item.id} data={item} />)
          ) : (
            <div className='flex size-full grow items-center justify-center text-14 font-medium text-var-gray-500'>
              아직 아직 찜한 모임이 없어요.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SavedPage;
