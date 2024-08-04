import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

const styles = `
  .slide-enter {
    transform: translateX(100%);
  }
  .slide-enter-active {
    transform: translateX(0);
    transition: transform 300ms ease-in-out;
  }
  .slide-exit {
    transform: translateX(0);
  }
  .slide-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-in-out;
  }
  
  .slide-back-enter {
    transform: translateX(-100%);
  }
  .slide-back-enter-active {
    transform: translateX(0);
    transition: transform 300ms ease-in-out;
  }
  .slide-back-exit {
    transform: translateX(0);
  }
  .slide-back-exit-active {
    transform: translateX(100%);
    transition: transform 300ms ease-in-out;
  }
`;

const TransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [transitionClass, setTransitionClass] = useState('slide');
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      const isGoingBack = location.pathname < prevPath;
      setTransitionClass(isGoingBack ? 'slide-back' : 'slide');
      setPrevPath(location.pathname);
    }
  }, [location, prevPath]);

  return (
    <>
      <style>{styles}</style>
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={300} classNames={transitionClass}>
          <div style={{ position: 'absolute', width: '100%' }}>{children}</div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default TransitionWrapper;
