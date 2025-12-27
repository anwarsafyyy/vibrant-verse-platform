import React from "react";

interface SectionDividerProps {
  className?: string;
  fillColor?: string;
  bgColor?: string;
  flip?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  className = "", 
  fillColor = "hsl(var(--background))",
  bgColor = "transparent",
  flip = false
}) => {
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto block ${flip ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ marginBottom: '-1px' }}
      >
        <path
          d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

// Wave divider with double curve and animation
export const WaveDivider: React.FC<SectionDividerProps & { gradientId?: string; gradientColors?: string[]; animated?: boolean }> = ({ 
  className = "", 
  fillColor = "hsl(var(--background))",
  bgColor = "transparent",
  flip = false,
  gradientId,
  gradientColors,
  animated = true
}) => {
  const useGradient = gradientId && gradientColors && gradientColors.length >= 2;
  
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-[60px] md:h-[80px] block ${flip ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ marginBottom: '-1px' }}
      >
        {useGradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {gradientColors.map((color, index) => (
                <stop 
                  key={index} 
                  offset={`${(index / (gradientColors.length - 1)) * 100}%`} 
                  stopColor={color}
                >
                  {animated && (
                    <animate
                      attributeName="stop-color"
                      values={`${color};${gradientColors[(index + 1) % gradientColors.length]};${color}`}
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  )}
                </stop>
              ))}
            </linearGradient>
          </defs>
        )}
        <path
          d="M0 100C240 100 240 40 480 40C720 40 720 100 960 100C1200 100 1200 40 1440 40V0H0V100Z"
          fill={useGradient ? `url(#${gradientId})` : fillColor}
          className={animated ? "animate-pulse-soft" : ""}
        >
          {animated && (
            <animate
              attributeName="d"
              values="M0 100C240 100 240 40 480 40C720 40 720 100 960 100C1200 100 1200 40 1440 40V0H0V100Z;
                      M0 100C240 100 240 50 480 50C720 50 720 100 960 100C1200 100 1200 50 1440 50V0H0V100Z;
                      M0 100C240 100 240 40 480 40C720 40 720 100 960 100C1200 100 1200 40 1440 40V0H0V100Z"
              dur="6s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </svg>
    </div>
  );
};

// Curved divider like the reference image
export const CurvedDivider: React.FC<SectionDividerProps> = ({ 
  className = "", 
  fillColor = "hsl(var(--background))",
  bgColor = "transparent",
  flip = false
}) => {
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-[60px] md:h-[80px] block ${flip ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ marginBottom: '-1px' }}
      >
        <path
          d="M0 80L0 60C120 80 360 80 600 60C840 40 1080 0 1320 0C1380 0 1410 5 1440 10V80H0Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

// Elegant S-curve divider
export const SCurveDivider: React.FC<SectionDividerProps> = ({ 
  className = "", 
  fillColor = "hsl(var(--background))",
  bgColor = "transparent",
  flip = false
}) => {
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-[80px] md:h-[100px] block ${flip ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ marginBottom: '-1px' }}
      >
        <path
          d="M0,100 C360,100 360,0 720,0 C1080,0 1080,100 1440,100 L1440,100 L0,100 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
