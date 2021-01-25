/* eslint-disable no-underscore-dangle */
import React from 'react';
// import Slider from 'react-slick';
// import LazyImg from 'components/LazyImg';
// import { Link } from 'react-router-dom';

// const sliderSettings = {
//   arrows: true,
//   slidesToShow: 7,
//   infinite: true,
//   speed: 500,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 767,
//       settings: {
//         slidesToShow: 2,
//       },
//     },
//   ],
// };

const Brands = ({ data }) => {
  //   const onClickAnchor = useCallback(e => e.preventDefault(), []);
  if (data && data?.typeDetails && data?.typeDetails.length > 0) {
    return (
      <section className="section-b-space logo no-border">
        <div
          className="container"
          id="staticConntentZapKart"
          dangerouslySetInnerHTML={{ __html: data?.typeDetails[0] }}
        />
      </section>
    );
  }
  return null;
};

export default Brands;
