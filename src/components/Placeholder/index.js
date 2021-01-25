import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import styles from './styles.module.scss';

const Placeholder = ({ title, subtitle, buttonText, to, img, from }) => {
  return (
    <div className={styles.wishlistErrorContainer}>
      <div className={styles.header}>
        <h2 className="login-head">{title}</h2>
      </div>
      {img && (
        <div className={styles.image}>
          <img src={img} alt="" />
        </div>
      )}
      <div className={styles.subtitle}>
        <h5 className="login-para">{subtitle}</h5>
      </div>
      <div className={styles.loginBtn}>
        <Link
          to={{
            pathname: to,
            state: {
              from,
            },
          }}
        >
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
};

Placeholder.defaultProps = {
  from: undefined,
  // title: 'Your wishlist is empty!',
  // subtitle: 'You have not saved anything yet!',
  // buttonText: 'Start shopping',
  // to: '/',
  // img: heart,
};

export default Placeholder;
