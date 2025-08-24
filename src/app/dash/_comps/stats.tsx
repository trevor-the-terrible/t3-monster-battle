import { type BaseStats } from '@/app/@types';

export function Stats({
  stats
}: {
  stats: BaseStats,
}) {
  if (!stats) {
    return (
      <div className='flex justify-center'>
        HP: -
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      HP: {stats.hp}
    </div>
  );
}

export default Stats;
