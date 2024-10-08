import { ReviewScoreType } from '@/types/data.type';

interface Ratings {
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

// 전체 별점 개수 합산
export const calculateTotalRatings = (
  ratingData: ReviewScoreType[],
): Ratings => {
  return ratingData.reduce(
    (acc, data) => ({
      oneStar: acc.oneStar + data.oneStar,
      twoStars: acc.twoStars + data.twoStars,
      threeStars: acc.threeStars + data.threeStars,
      fourStars: acc.fourStars + data.fourStars,
      fiveStars: acc.fiveStars + data.fiveStars,
    }),
    { oneStar: 0, twoStars: 0, threeStars: 0, fourStars: 0, fiveStars: 0 },
  );
};

export const calculateBarWidth = (totalRatings: Ratings): Ratings => {
  const total = Object.values(totalRatings).reduce(
    (sum, count) => sum + count,
    0,
  );

  if (total === 0) {
    return {
      oneStar: 0,
      twoStars: 0,
      threeStars: 0,
      fourStars: 0,
      fiveStars: 0,
    };
  }

  return {
    oneStar: (totalRatings.oneStar / total) * 100,
    twoStars: (totalRatings.twoStars / total) * 100,
    threeStars: (totalRatings.threeStars / total) * 100,
    fourStars: (totalRatings.fourStars / total) * 100,
    fiveStars: (totalRatings.fiveStars / total) * 100,
  };
};
