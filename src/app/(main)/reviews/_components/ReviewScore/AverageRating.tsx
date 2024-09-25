import { IconHeart } from '@/public/icons';
import { ReviewScoreData } from '@/types/data.type';

interface AverageRatingProps {
  ratingData: ReviewScoreData[];
}
const calculateAverageRating = (data: ReviewScoreData[]) => {
  if (data.length <= 0) {
    return '0';
  }
  let totalWeightedScore = 0; // 가중치가 적용된 평점 합계
  let totalReviews = 0; // 총 평점 수

  data.forEach((item) => {
    const weightedScore =
      item.oneStar * 1 +
      item.twoStars * 2 +
      item.threeStars * 3 +
      item.fourStars * 4 +
      item.fiveStars * 5;

    const reviewCount =
      item.oneStar +
      item.twoStars +
      item.threeStars +
      item.fourStars +
      item.fiveStars;

    totalWeightedScore += weightedScore;
    totalReviews += reviewCount;
  });

  // 평균을 계산하고 결과 반환
  const average = totalReviews === 0 ? 0 : totalWeightedScore / totalReviews;
  return average.toFixed(1);
};

const AverageRating = ({ ratingData }: AverageRatingProps) => {
  const rating = calculateAverageRating(ratingData); // 평균 점수
  const width = parseFloat(rating) * 20; // 평균값으로 width 계산

  return (
    <div>
      <p className='text-center text-24 font-semibold text-var-gray-400'>
        <span className='mr-2 text-var-gray-900'>{rating}</span>/ 5
      </p>
      <div className='relative flex gap-[2px] text-var-gray-200'>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <IconHeart key={index} className='size-24 shrink-0' />
          ))}
        <div
          className='absolute left-0 top-0 flex gap-[2px] overflow-hidden text-var-orange-600'
          style={{ width: `${width}%` }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <IconHeart key={index} className='size-24 shrink-0' />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AverageRating;
