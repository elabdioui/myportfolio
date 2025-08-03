import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useStarsGenerator } from '../../hooks/usePerformanceOptimization';

interface StarFieldProps {
  count?: number;
  className?: string;
}

const StarFieldComponent: React.FC<StarFieldProps> = ({ 
  count = 50, 
  className = "absolute inset-0" 
}) => {
  const stars = useStarsGenerator(count);

  return (
    <div className={className}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.width,
            height: star.height,
            left: star.left,
            top: star.top,
            opacity: star.opacity,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [star.opacity, star.opacity * 1.5, star.opacity],
          }}
          transition={{
            duration: star.animationDuration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export const StarField = memo(StarFieldComponent);