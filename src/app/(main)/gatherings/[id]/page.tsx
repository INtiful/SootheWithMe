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
  const reviews: ReviewsType[] = mockReviewsData;

  console.log(reviews);

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
