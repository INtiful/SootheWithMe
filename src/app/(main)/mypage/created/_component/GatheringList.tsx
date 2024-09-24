'use client';

import Card from '@/app/components/Card/Card';
import { GatheringsListData } from '@/types/data.type';
import { DATA_LIST } from '../mockData';

interface GatheringListProps {
  dataList: GatheringsListData[];
}

const GatheringList = ({ dataList }: GatheringListProps) => {
  const updateDataList = () => {
    return dataList.map((item) => ({
      ...item,
      canceledAt: null, // 원하는 필드를 변경
    }));
  };

  const handleSaveDiscard = () => {
    throw new Error('잘못된 접근입니다.');
  };

  return (
    <div className='grow'>
      {updateDataList().map((data) => (
        <Card key={data.id} handleSaveDiscard={handleSaveDiscard} data={data}>
          <Card.Info />
        </Card>
      ))}
    </div>
  );
};

export default GatheringList;
