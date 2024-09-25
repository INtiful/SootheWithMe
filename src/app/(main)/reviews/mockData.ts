import { ReviewData, ReviewScoreData } from '@/types/data.type';

export const REVIEW_SCORE_MOCK_DATA: ReviewScoreData[] = [
  {
    teamId: '3-4',
    gatheringId: 0,
    type: 'DALLAEMFIT',
    oneStar: 0,
    twoStars: 0,
    threeStars: 3,
    fourStars: 6,
    fiveStars: 8,
  },

  {
    teamId: '3-4',
    gatheringId: 1,
    type: 'DALLAEMFIT',
    oneStar: 0,
    twoStars: 0,
    threeStars: 2,
    fourStars: 6,
    fiveStars: 8,
  },

  {
    teamId: '3-4',
    gatheringId: 3,
    type: 'WORKATION',
    oneStar: 0,
    twoStars: 0,
    threeStars: 2,
    fourStars: 6,
    fiveStars: 8,
  },
  {
    teamId: '3-4',
    gatheringId: 4,
    type: 'OFFICE_STRETCHING',
    oneStar: 0,
    twoStars: 0,
    threeStars: 2,
    fourStars: 6,
    fiveStars: 8,
  },
  {
    teamId: '3-4',
    gatheringId: 5,
    type: 'MINDFULNESS',
    oneStar: 0,
    twoStars: 0,
    threeStars: 2,
    fourStars: 6,
    fiveStars: 8,
  },
];

export const REVIEW_MOCK_DATA: ReviewData[] = [
  {
    teamId: '3-4',
    id: 1,
    score: 5,
    comment:
      '따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.',
    createdAt: '2024-09-24T08:12:16.169Z',
    Gathering: {
      teamId: '3-4',
      id: 100,
      type: 'DALLAEMFIT',
      name: '달램핏 오피스 스트레칭',
      dateTime: '2024-09-24T08:12:16.169Z',
      location: '건대입구',
      image: '/images/mock-image.png',
    },
    User: {
      teamId: '3-4',
      id: 100,
      name: '윤채현',
      image: null,
    },
  },
  {
    teamId: '3-4',
    id: 2,
    score: 5,
    comment:
      '따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.',
    createdAt: '2024-09-24T08:12:16.169Z',
    Gathering: {
      teamId: '3-4',
      id: 100,
      type: 'OFFICE_STRETCHING',
      name: '달램핏 오피스 스트레칭',
      dateTime: '2024-09-24T08:12:16.169Z',
      location: '건대입구',
      image: '/images/mock-image.png',
    },
    User: {
      teamId: '3-4',
      id: 100,
      name: '윤채현',
      image: null,
    },
  },
  {
    teamId: '3-4',
    id: 3,
    score: 5,
    comment:
      '따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.',
    createdAt: '2024-09-24T08:12:16.169Z',
    Gathering: {
      teamId: '3-4',
      id: 100,
      type: 'DALLAEMFIT',
      name: 'WORKATION',
      dateTime: '2024-09-24T08:12:16.169Z',
      location: '건대입구',
      image: '/images/mock-image.png',
    },
    User: {
      teamId: '3-4',
      id: 100,
      name: '윤채현',
      image: null,
    },
  },
  {
    teamId: '3-4',
    id: 4,
    score: 5,
    comment:
      '따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.',
    createdAt: '2024-09-24T08:12:16.169Z',
    Gathering: {
      teamId: '3-4',
      id: 100,
      type: 'MINDFULNESS',
      name: '달램핏 오피스 스트레칭',
      dateTime: '2024-09-24T08:12:16.169Z',
      location: '건대입구',
      image: '/images/mock-image.png',
    },
    User: {
      teamId: '3-4',
      id: 100,
      name: '윤채현',
      image: null,
    },
  },
];
