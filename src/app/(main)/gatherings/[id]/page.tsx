/**
 * TODO:
 *  - 주최자인 경우 Bottom Floating 버튼 수정
 *  - 비로그인인 경우 로그인이 필요하다는 모달
 */

import GatheringDetail from './_component/GatheringDetail';
import {
  GatheringInfoType,
  GatheringParticipantsType,
  ReviewsType,
} from '@/types/data.type';
import getGatheringParticipants from '@/app/api/actions/gatherings/getGatheringParticipants';
import getGatheringInfo from '@/app/api/actions/gatherings/getGatheringInfo';
import getReviews from '@/app/api/actions/reviews/getReviews';

const GatheringsDetailPage = async ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const gatheringInfo: GatheringInfoType = await getGatheringInfo(params.id);
  const gatheringParticipants: GatheringParticipantsType[] =
    await getGatheringParticipants(params.id);
  const reviews: ReviewsType[] = await getReviews({ gatheringId: params.id });

  return (
    <GatheringDetail
      gatheringInfo={gatheringInfo}
      gatheringParticipants={gatheringParticipants}
      reviews={reviews}
    />
  );
};

export default GatheringsDetailPage;
