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
  ReviewsType,
} from '@/types/data.type';
import fetchReviews from '@/app/api/actions/reviews/fetchReviews';

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
  const reviews: ReviewsType[] = await fetchReviews({ gatheringId: params.id });

  return (
    <GatheringDetail
      gatheringInfo={gatheringInfo}
      gatheringParticipants={gatheringParticipants}
      reviews={reviews}
    />
  );
};

export default GatheringsDetailPage;
