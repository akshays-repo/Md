import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* <script
src="https://code.jquery.com/jquery-3.3.1.min.js"
async
defer
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"
></script> */

const Carousel = ({ title, children, viewAllLink, className, resetDefaults, responsive }) => {
  let carouselProps = {
    nav: true,
    responsive: {
      // 0: { items: 2, loop: true },
      // 500: { items: 3 },
      // 664: { items: 4 },
      // 1000: { items: 5 },
      ...responsive,
    },
    dots: true,
    lazyLoad: true,
    lazyContent: false,
    className: `owl-theme owl-carousel ${className}`,
    margin: 10,
  };
  if (resetDefaults)
    carouselProps = {
      className: `owl-theme owl-carousel ${className}`,
    };

  return (
    <>
      <div className="section-heading">
        <h2>
          {title && <span className="head">{title}</span>}
          {viewAllLink && (
            <span className="more-span">
              <Link className="view-all-btn" to={{ pathname: viewAllLink, state: { title } }}>
                View All
              </Link>
            </span>
          )}
        </h2>
      </div>

      <OwlCarousel {...carouselProps}>{children}</OwlCarousel>
    </>
  );
};

Carousel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array.isRequired,
  className: PropTypes.string,
  resetDefaults: PropTypes.bool,
};

Carousel.defaultProps = {
  title: '',
  className: '',
  resetDefaults: false,
};

export default Carousel;
