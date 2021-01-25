/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'components/Carousel';

const design = {
  0: { items: 2, loop: true },
  480: { items: 3 },
  567: { items: 4 },
  650: { items: 5 },
  768: { items: 7 },
  1000: { items: 9 },
};

const Catagories = ({ data }) => {
  //   const onClickAnchor = useCallback(e => e.preventDefault(), []);

  if (data && data?.typeDetails && data?.typeDetails.length > 0)
    return (
      <section className="product-listing-wrapper wow fadeInUp">
        <div className="container">
          <div className="section-heading">
            <h2>
              <span className="head">{data.title}</span> <span className="more-span" />
            </h2>
          </div>
          <Carousel responsive={{ ...design }}>
            {data?.typeDetails.map(i => (
              <div className="item" key={i?._id}>
                <div className="category-list">
                  <div className="category-img">
                    <Link to={`/products/category/${i?._id}`}>
                      <img src={`${i?.images?.[0]?.thumbnail}`} alt={i.title} />
                    </Link>
                  </div>
                  {data.showTitle && (
                    // <Link to={`/products/category/${i?._id}`}>
                    <h5 className="category-head">{i?.name}</h5>
                    // </Link>
                  )}
                </div>
              </div>
            ))}
          </Carousel>
          <div className="row view-all">
            <Link className="ml-auto mr-3 my-1 py-1 px-3" to="/products/category">
              <span className="">
                view all <i className="ml-2 fa fa-arrow-right" />{' '}
              </span>
            </Link>
          </div>
        </div>
      </section>
    );

  return null;
};

export default Catagories;
