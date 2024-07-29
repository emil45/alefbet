import React, { useEffect, useState } from 'react';

const CursorFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: mousePosition.x + 30,
        top: mousePosition.y + 35,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', // So it doesn't interfere with other elements
        fontSize: '18px', // Size of the emoji
      }}
    >
      ⭐️
    </div>
  );
};

export default CursorFollower;
