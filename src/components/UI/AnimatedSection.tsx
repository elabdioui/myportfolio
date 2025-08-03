import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { ANIMATION_VARIANTS } from '../../utils/constants';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof ANIMATION_VARIANTS;
  delay?: number;
  threshold?: number;
  id?: string;
}

const AnimatedSectionComponent: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  variant = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  id,
}) => {
  const [ref, inView] = useIntersectionObserver({ threshold, triggerOnce: true });

  const animationVariant = ANIMATION_VARIANTS[variant];

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={animationVariant.initial}
      animate={inView ? animationVariant.animate : animationVariant.initial}
      transition={{ ...animationVariant.transition, delay }}
    >
      {children}
    </motion.section>
  );
};

export const AnimatedSection = memo(AnimatedSectionComponent);