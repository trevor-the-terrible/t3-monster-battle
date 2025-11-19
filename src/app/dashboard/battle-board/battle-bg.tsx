'use client';

import { useEffect, useState } from 'react';
import cn from '@/app/utils/styles/tw-merge';

export function BattleBg() {
  const [css, setCss] = useState('');

  useEffect(() => {
    const speed = 1;
    let x = 0;
    let y = 0;

    const interval = setInterval(function () {
      x -= speed;
      x %= 10000;
      y %= 10000;
      setCss('' + x + 'px ' + y + 'px');
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div
      className={cn(`
        absolute
        top-0
        left-0 h-full
        w-full bg-[url('/p1.png')]
        opacity-10
      `)}
      style={{
        backgroundPosition: css,
        // transform: css
      }}
    ></div>
  );
}

export default BattleBg;
