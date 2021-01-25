/* eslint-disable no-underscore-dangle */
// import Slider from 'react-slick';
// import LazyImg from 'components/LazyImg';
// import { Link } from 'react-router-dom';
// import List from 'modules/product/list/List';
import React from 'react';
import Carousel from 'components/Carousel';
import { Link } from 'react-router-dom';

const design = {
  0: { items: 1, loop: true },
  567: { items: 2 },
  767: { items: 3 },
  1000: { items: 4 },
  1200: { items: 6 },
};
const Brands = ({ data }) => {
  if (data && data?.typeDetails && data?.typeDetails.length > 0) {
    return (
      <section className="product-listing-wrapper wow fadeInUp">
        <div className="container">
          <Carousel
            responsive={{ ...design }}
            title={data.showTitle === true ? data.title : ''}
            // viewAllLink={`/products/category/${cates[0].slug}`}
          >
            {data?.typeDetails.map(product => {
              const { medicinetype } = product;
              const { containervalue, medicinetype: type, midleText } = medicinetype;
              const textDescription = `${containervalue.name || ''} ${midleText || ''} (${
                type.name
              })`;
              return (
                <div className="product-listing" key={product._id}>
                  <div className="product-offer">
                    <span>
                      {(
                        (product.productPricing.salePrice / product.productPricing.listPrice) *
                        100
                      ).toFixed()}
                      %
                    </span>{' '}
                    Off
                  </div>
                  <div className="quick-view">
                    <img src="/resources/images/eye.png" alt="" />
                  </div>
                  <div className="product-image-wrapper">
                    <img src={product.images[0].thumbnail} alt="" className="product-image lazy" />
                  </div>
                  <Link to={`/product/${product.slug}`}>
                    <h6 className="product-discription">{textDescription}</h6>
                    <h5 className="product-name" title={product.name}>
                      {product.name.length > 25
                        ? `${product.name.substr(0, 25)}...`
                        : `${product.name}`}
                    </h5>
                  </Link>
                  <div className="price-wrapper">
                    <div className="og-price">
                      MRP{' '}
                      <span>
                        <i className="fas fa-rupee-sign" /> {product.productPricing.listPrice}
                      </span>
                    </div>
                    <h3>
                      <i className="fas fa-rupee-sign" /> {product.productPricing.salePrice}/-
                    </h3>
                  </div>
                  <div className="star-rating-cart-wrapper">
                    <div className="star-ratings">
                      <span className="rating green-rating">
                        <i className="fas fa-star" /> 4.2
                      </span>{' '}
                      514 Ratings
                    </div>
                    <Link className="small-btn" to={`/product/${product.slug}`}>
                      Add or Cart
                    </Link>
                  </div>
                </div>
              );
            })}
          </Carousel>
          <div className="row view-all">
            <Link className="ml-auto mr-3 my-1 py-1 px-3" to="/products">
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
