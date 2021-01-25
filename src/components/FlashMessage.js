import React, { useState } from 'react';
import classNames from 'classnames';
import useDidMountEffect from 'hooks/useDidMountEffect';

const FlashMessage = ({ children, delay }) => {
  const [visible, setVisible] = useState(children && true);
  console.log(children, visible);
  useDidMountEffect(() => {
    console.log('message changed');
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [children]);

  return (
    <div
      className={classNames('field-notify', 'lr-padding-zero', 
      'hide-anim', 
      // { hidden: !visible }
      )
    }
    >
      {children}
      {/* Email does not exist in our records. Please enter a valid email and try again */}
    </div>
  );
};

FlashMessage.defaultProps = {
  children: undefined,
  delay: 4000,
};

export default FlashMessage;
