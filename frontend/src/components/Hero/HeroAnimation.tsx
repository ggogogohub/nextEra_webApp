import React, { useState, useEffect } from 'react';
import Lottie, { LottieComponentProps } from 'lottie-react';
import { AnimationWrapper } from './styles';

type AnimationData = LottieComponentProps['animationData'];

export const HeroAnimation: React.FC = () => {
  const [animationData, setAnimationData] = useState<AnimationData | null>(null);

  useEffect(() => {
    fetch('https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json')
      .then(res => res.json())
      .then(setAnimationData)
      .catch(err => console.error('Failed to load animation:', err));
  }, []);

  if (!animationData) {
    return null;
  }

  return (
    <AnimationWrapper>
      <Lottie 
        loop 
        animationData={animationData} 
        style={{ width: '100%' }} 
      />
    </AnimationWrapper>
  );
}; 