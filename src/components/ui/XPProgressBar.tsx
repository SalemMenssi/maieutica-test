
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface XPProgressBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  className?: string;
  showAnimation?: boolean;
}

/**
 * XP Progress Bar component with level-up animations
 * Features gamified progress tracking for learners
 */
export const XPProgressBar: React.FC<XPProgressBarProps> = ({
  currentXP,
  maxXP,
  level,
  className,
  showAnimation = false,
}) => {
  const [animatedXP, setAnimatedXP] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  const progress = Math.min((currentXP / maxXP) * 100, 100);

  useEffect(() => {
    if (showAnimation) {
      // Animate XP gain
      const timer = setTimeout(() => {
        setAnimatedXP(currentXP);
      }, 100);

      // Check for level up
      if (currentXP >= maxXP) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 800);
      }

      return () => clearTimeout(timer);
    } else {
      setAnimatedXP(currentXP);
    }
  }, [currentXP, maxXP, showAnimation]);

  return (
    <div className={cn('space-y-2', className)} role="progressbar" aria-valuenow={currentXP} aria-valuemin={0} aria-valuemax={maxXP}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={cn(
            'text-lg font-extrabold text-primary-600',
            showLevelUp && 'level-up-animation'
          )}>
            Level {level}
          </span>
          {showLevelUp && (
            <span className="text-accent-500 animate-bounce text-sm font-semibold">
              LEVEL UP! 🎉
            </span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {animatedXP} / {maxXP} XP
        </span>
      </div>

      <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden">
        <div 
          className={cn(
            'h-full bg-gradient-to-r from-accent-500 to-accent-300 rounded-full transition-all duration-1000 ease-out',
            showAnimation && 'xp-progress'
          )}
          style={{ 
            width: `${progress}%`,
            '--progress-width': `${progress}%`
          } as React.CSSProperties}
        />
        
        {/* Sparkle effect for level up */}
        {showLevelUp && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-yellow-300/30 animate-pulse rounded-full" />
        )}
      </div>
    </div>
  );
};
