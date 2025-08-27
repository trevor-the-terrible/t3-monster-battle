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
      // y+=speed;
      // y+=speed;
      x %= 10000;
      y %= 10000;
      // setCss('background-position:' + x + 'px ' + y + 'px');
      setCss('' + x + 'px ' + y + 'px');
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   let pulse = 0.0;

  //   const interval = setInterval(function(){
  //     pulse %= 1.05;
  //     pulse += 0.1;
  //     pulse = Math.max(1, pulse);
  //     setCss(`scale(${pulse})`);
  //   }, 1500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

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
