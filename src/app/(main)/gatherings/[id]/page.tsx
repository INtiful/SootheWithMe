/**
 * TODO:
 *  < 주최자가 아닌 경우 >
 *  - 로그인 되어 있는 경우 참여 취소하기 버튼 누르면 참여 취소 가능
 *  - 로그인 되어 있지 않은 경우 로그인이 필요하다는 모달과 함께 로그인 페이지로 이동
 *  - mockData 삭제
 */

import GatheringDetail from './_component/GatheringDetail';
import {
  GatheringInfoType,
  GatheringParticipantsType,
  ReviewsType,
} from '@/types/data.type';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import getGatheringParticipants from '@/app/api/actions/gatherings/getGatheringParticipants';
import getGatheringInfo from '@/app/api/actions/gatherings/getGatheringInfo';

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
  const reviews: ReviewsType[] = await getReviewList({
    gatheringId: params.id,
  });

  return (
    <GatheringDetail
      gatheringInfo={gatheringInfo}
      gatheringParticipants={gatheringParticipants}
      reviews={reviews}
    />
  );
};

export default GatheringsDetailPage;

// mockdata
export const mockReviewsData: ReviewsType[] = Array.from(
  { length: 30 },
  (_, i) => ({
    teamId: i % 2 === 0 ? i : `T${i}`,
    id: i + 1,
    score: Math.floor(Math.random() * 5) + 1, // 1 ~ 5점 랜덤 점수
    comment: `This is a review comment for review #${i + 1}.`,
    createdAt: new Date(2024, 8, 26 - i).toISOString(), // 날짜는 9월 26일에서 하루씩 줄어듦
    Gathering: {
      teamId: i % 2 === 0 ? i : `T${i}`,
      id: i + 101,
      type: i % 3 === 0 ? 'WORKSHOP' : i % 3 === 1 ? 'MEETING' : 'EVENT',
      name: `Gathering #${i + 1}`,
      dateTime: new Date(2024, 9, i + 1).toISOString(), // 10월 날짜로 설정
      location: i % 2 === 0 ? 'Seoul' : 'Busan',
      image: `https://example.com/gathering${i + 1}.jpg`,
    },
    User: {
      teamId: i % 2 === 0 ? i : `U${i}`,
      id: i + 201,
      name: `User #${i + 1}`,
      image: `https://example.com/user${i + 1}.jpg`,
    },
  }),
);
