import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSprings, animated } from 'react-spring';
import shortId from 'shortid';
import styles from './style.module.scss';



const HeartIcon = ({ onClick, active }) => {

  
  const items = [
    {
      x: '-10px',
      y: '-25px',
    },
    {
      x: '20px',
      y: '29px',
    },
    {
      x: '-30px',
      y: '-10px',
    },
    {
      x: '20px',
      y: '-5px',
    },
    {
      x: '20px',
      y: '-15px',
    },
    {
      x: '-10px',
      y: '20px',
    },
    {
      x: '0px',
      y: '23px',
    },
    {
      x: '-110px',
      y: '-10px',
    },
  ];

  const [isSpread, setSpread] = useState(false);

  useEffect(() => setSpread(active), [active]);

  useEffect(() => {
    let timer
    if (isSpread) {
      timer = setTimeout(() => setSpread(false), 900);
    }
    return () => clearTimeout(timer);
  }, [isSpread]);

  const springs = useSprings(
    items.length,
    items.map(item => {
      const transform = !isSpread
        ? 'translate3d(0px,0px, 0px)'
        : `translate3d(${item.x}, ${item.y}, 0px)`;
      
      return {
        transform,
        opacity: isSpread ? 0.7 : 0,
        zIndex: 2,
      };
    }),
  );
  // const fade = useSpring({
  //   from: {
  //     opacity: 1,
  //     transform: 'translate(0px, 0px)',
  //   },
  //   to: {
  //     opacity: 0,
  //     transform: 'translate(-20px, -20px)',
  //   },
  // });
  return (
    <div className="icon-wrapper" role="button" tabIndex={0} onKeyDown={onClick} onClick={onClick}>
      <i className={classNames(`fas fa-heart ${styles.heartIcon}`, { active })} />
      {springs.map(props => (
        <animated.div key={shortId.generate()} style={props} id="circle1" className={styles.circle} />
      ))}
    </div>
  );
};

export default HeartIcon;
