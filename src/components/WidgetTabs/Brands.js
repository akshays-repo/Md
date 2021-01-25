/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'components/Carousel';

const sliderSettings = {
  0: { items: 1, loop: true },
  450: { items: 2 },
  576: { items: 3 },
  768: { items: 5 },
  1000: { items: 6 },
};

const Brands = ({ data }) => {
  //   const onClickAnchor = useCallback(e => e.preventDefault(), []);
  if (data && data?.typeDetails && data?.typeDetails.length > 0) {
    return (
      <section className="product-listing-wrapper shadow-section wow fadeInUp">
        <div className="container">
          <Carousel
            responsive={{ ...sliderSettings }}
            title={data.showTitle === true ? data.title : ''}
            // viewAllLink={`/products/category/${cates[0].slug}`}
          >
            {data?.typeDetails.map(i => (
              <div className="item" key={i?._id}>
                <div className="featured-products">
                  <div className="featured-products-img">
                    <Link to={`/products/category/${i?._id}`}>
                      <img src={`${i?.image?.[0]?.thumbnail}`} alt={i.title} />
                    </Link>
                  </div>
                  {data.showTitle && (
                    // {/* <Link to={`/products/category/${i?._id}`}> */}
                    <h4 className="featured-products-head">{i?.name}</h4>
                    // {/* </Link> */}
                  )}
                </div>
              </div>
            ))}
          </Carousel>
          <div className="row view-all">
            <Link className="ml-auto mr-3 my-1 py-1 px-3" to="/products/brands">
              <span className="">
                view all <i className="ml-2 fa fa-arrow-right" />{' '}
              </span>
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default Brands;
