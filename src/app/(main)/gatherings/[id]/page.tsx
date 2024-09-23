/**
 * TODO:
 *  - 주최자인 경우 Bottom Floating 버튼 수정
 *  - 비로그인인 경우 로그인이 필요하다는 모달
 */

import fetchGatheringInfo from '@/app/api/actions/gatherings/fetchGatheringInfo';
import GatheringDetail from './_component/GatheringDetail';
import fetchGatheringParticipants from '@/app/api/actions/gatherings/fetchGatheringParticipants';
import {
  GatheringInfoType,
  GatheringParticipantsType,
} from '@/types/data.type';

const GatheringsDetailPage = async ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const gatheringInfo: GatheringInfoType = await fetchGatheringInfo(params.id);
  const gatheringParticipants: GatheringParticipantsType[] =
    await fetchGatheringParticipants(params.id);

  return (
    <GatheringDetail
      gatheringInfo={gatheringInfo}
      gatheringParticipants={gatheringParticipants}
    />
  );
};

export default GatheringsDetailPage;
