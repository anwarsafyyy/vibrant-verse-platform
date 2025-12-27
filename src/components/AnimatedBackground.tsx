import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large glowing orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, hsl(210 100% 50% / 0.15) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          animationDuration: '8s'
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, hsl(220 80% 45% / 0.12) 0%, transparent 70%)',
          top: '30%',
          right: '-5%',
          animationDuration: '10s',
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute w-[700px] h-[700px] rounded-full blur-[150px] animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, hsl(200 90% 50% / 0.1) 0%, transparent 70%)',
          bottom: '-15%',
          left: '20%',
          animationDuration: '12s',
          animationDelay: '4s'
        }}
      />

      {/* Floating smaller orbs */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] animate-float"
        style={{ 
          background: 'radial-gradient(circle, hsl(210 100% 60% / 0.2) 0%, transparent 70%)',
          top: '50%',
          left: '10%',
          animationDuration: '15s'
        }}
      />
      <div 
        className="absolute w-[250px] h-[250px] rounded-full blur-[70px] animate-float"
        style={{ 
          background: 'radial-gradient(circle, hsl(230 70% 50% / 0.15) 0%, transparent 70%)',
          top: '20%',
          right: '20%',
          animationDuration: '18s',
          animationDelay: '3s'
        }}
      />
      <div 
        className="absolute w-[200px] h-[200px] rounded-full blur-[60px] animate-float"
        style={{ 
          background: 'radial-gradient(circle, hsl(195 100% 50% / 0.18) 0%, transparent 70%)',
          bottom: '30%',
          right: '10%',
          animationDuration: '20s',
          animationDelay: '6s'
        }}
      />

      {/* Animated gradient lines */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div 
          className="absolute w-full h-[2px] animate-pulse"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(210 100% 50% / 0.5) 50%, transparent 100%)',
            top: '25%',
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute w-full h-[1px] animate-pulse"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(220 80% 45% / 0.4) 50%, transparent 100%)',
            top: '55%',
            animationDuration: '5s',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-full h-[1px] animate-pulse"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(200 90% 50% / 0.3) 50%, transparent 100%)',
            top: '75%',
            animationDuration: '6s',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Sparkle particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            background: `hsl(${200 + Math.random() * 30} 100% ${60 + Math.random() * 20}% / ${0.3 + Math.random() * 0.4})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 ${6 + Math.random() * 10}px hsl(210 100% 60% / 0.5)`
          }}
        />
      ))}

      {/* Rotating glow ring */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full animate-spin-slow opacity-20"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'conic-gradient(from 0deg, transparent 0%, hsl(210 100% 50% / 0.3) 25%, transparent 50%, hsl(220 80% 45% / 0.2) 75%, transparent 100%)',
          animationDuration: '30s'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
