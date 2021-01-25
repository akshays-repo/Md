/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
// import { wishlistActions } from 'redux/actions';
// import HeartIcon from './HeartIcon';
// import Authorize from './Authorize';
import Img from './Img';

const linkStyle = { color: '#333' };

const Product = props => {
  const {
    title,
    onClose,
    listPrice,
    salePrice,
    // price,
    item,
    slug,
    loading,
    deadLink,
    id,
    // isWishlist,
    // dispatch,
    bordered,
    // noButton,
    // noFav,
  } = props;
  let { frequent, img = '' } = props;
  if (img && !img.startsWith('/')) img = `/${img}`;
  frequent = Boolean(frequent);

  // const loadingClass = Boolean(title)
  //  <div className={`product-listing ${frequent ? 'frequently-brought-product-list' : ''}`}>

  /**
   *
   * @param {nodes} children
   * @param {boolean} isDeadLink
   * @param {string} toLink
   */
  const getLinked = children => {
    if (deadLink) return children;
    return (
      <Link to={`/product/${slug}`} style={linkStyle}>
        {children}
      </Link>
    );
  };

  const handleClose = () => onClose(id);

  // const handleToggleWishlist = () => {
  //   if (!isWishlist) {
  //     dispatch({
  //       type: wishlistActions.EDIT_WISHLIST,
  //       payload: {
  //         type: 'add',
  //         id,
  //       },
  //     });

  //     return '';
  //   }
  //   dispatch({
  //     type: wishlistActions.EDIT_WISHLIST,
  //     payload: {
  //       type: 'remove',
  //       id,
  //     },
  //   });

  //   return '';
  // };

  // eslint-disable-next-line no-unused-vars

  // <div className="product-listing" key={product._id}>
  //                 <div className="product-offer">
  //                   <span>
  //                     {(
  //                       (product.productPricing.salePrice / product.productPricing.listPrice) *
  //                       100
  //                     ).toFixed()}
  //                     %
  //                   </span>{' '}
  //                   Off
  //                 </div>
  //                 <div className="quick-view">
  //                   <img src="/resources/images/eye.png" alt="" />
  //                 </div>
  //                 <div className="product-image-wrapper">
  //                   <img src={product.images[0].thumbnail} alt="" className="product-image lazy" />
  //                 </div>
  //                 <Link to={`/product/${product.slug}`}>
  //                   <h6 className="product-discription">{textDescription}</h6>
  //                   <h5 className="product-name" title={product.name}>
  //                     {product.name.length > 65
  //                       ? `${product.name.substr(0, 40)}...`
  //                       : `${product.name}`}
  //                   </h5>
  //                 </Link>
  //                 <div className="price-wrapper">
  //                   <div className="og-price">
  //                     MRP{' '}
  //                     <span>
  //                       <i className="fas fa-rupee-sign" /> {product.productPricing.listPrice}
  //                     </span>
  //                   </div>
  //                   <h3>
  //                     <i className="fas fa-rupee-sign" /> {product.productPricing.salePrice}/-
  //                   </h3>
  //                 </div>
  //                 <div className="star-rating-cart-wrapper">
  //                   <div className="star-ratings">
  //                     <span className="rating green-rating">
  //                       <i className="fas fa-star" /> 4.2
  //                     </span>{' '}
  //                     514 Ratings
  //                   </div>
  //                   <Link className="small-btn" to={`/product/${product.slug}`}>
  //                     Add or Cart
  //                   </Link>
  //                 </div>
  //               </div>

  const LoadingProduct = (
    <div className="product-listing">
      <div className="product-image lazy">
        <Skeleton width={120} height={109} />{' '}
      </div>
      <h5 className="product-name">
        <Skeleton width={150} />
      </h5>
      <h6 className="product-discription">
        <Skeleton width={140} />
      </h6>

      <div>
        <h3>
          <Skeleton width={50} />
        </h3>
      </div>
      {/* <div type="button" style={{ color: 'transparent' }} className="small-btn">
        Buy
      </div> */}
    </div>
  );

  const DefaultProduct = (
    <div
      className={classNames({
        'product-listing': true,
        bordered,
        'frequently-brought-product-list': frequent,
        // 'loading': loadingClass
      })}
    >
      <div className="product-offer">
        <span>{((salePrice / listPrice) * 100).toFixed()}%</span> Off
      </div>
      <div className="quick-view">
        <img src="/resources/images/eye.png" alt="" />
      </div>
      <div className="product-image-wrapper">
        {img ? <Img src={img} alt="" className="product-image lazy" /> : <Skeleton />}
      </div>
      {getLinked(
        <>
          <h6 className="product-discription">{'textDescription' || ''}</h6>
          {title && (
            <h5 className="product-name">
              {title.length > 25 ? `${title.substr(0, 25)}...` : `${title}`}
            </h5>
          )}
          {!title && (
            <h5 className="product-name">
              <Skeleton />
            </h5>
          )}
          {/* <h6 className="product-discription">{frequent ? '' : description || <Skeleton />}</h6> */}
        </>,
      )}
      {/* <Link to={`/product/${slug}`} style={linkStyle}>
        {img ? <img src={`/${img}`} alt="" className="product-image lazy" /> : <Skeleton />}
        <h5 className="product-name">{title || <Skeleton />}</h5>
        <h6 className="product-discription">{frequent ? '' : description || <Skeleton />}</h6>
      </Link> */}
      <div className="price-wrapper">
        <div className="og-price">
          MRP{' '}
          {listPrice ? (
            <span>
              <i className="fas fa-rupee-sign" /> {listPrice}
            </span>
          ) : (
            <Skeleton />
          )}
        </div>
        {salePrice ? (
          <h3>
            <i className="fas fa-rupee-sign" />
            {salePrice}
          </h3>
        ) : (
          <h3>
            <Skeleton />
          </h3>
        )}
      </div>
      <div className="star-rating-cart-wrapper">
        <div className="star-ratings">
          <span className="rating green-rating">
            <i className="fas fa-star" /> 4.2
          </span>{' '}
          514 Ratings
        </div>
        <Link className="small-btn" to={`/product/${slug}`}>
          ORDER NOW
        </Link>
      </div>
      {/* {listPrice && salePrice ? (
        <div className="price-wrapper"> */}
      {/* <div className="og-price">
            MRP{' '}
            <span>
              <i className="fas fa-rupee-sign" /> {listPrice || <Skeleton />}
            </span>
          </div>
          <h3>
            <i className="fas fa-rupee-sign" /> {salePrice || <Skeleton />}/-
          </h3> */}
      {/* </div>
      ) : (
        <> */}
      {/* <h3>
            {(salePrice || listPrice || price) && <i className="fas fa-rupee-sign" />}
            {salePrice || listPrice || price || <Skeleton />}
          </h3> */}
      {/* <div className="order-btn">
            {title &&
              !noButton &&
              getLinked(
                <>
                  <button type="button" className="small-btn">
                    ORDER NOW
                  </button>
                </>,
              )} */}
      {/* // <button type="button" onClick={handleBuyProduct} className="small-btn">
            //   Buy
            // </button> */}
      {/* {title && !deadLink && (
              <Link to={`/product/${slug}`} style={linkStyle}>
                <button type="button" className="small-btn">
                  Add to cart
                </button>
              </Link>
            )} */}
      {/* </div> */}
      {/* </> */}
      {/* // )} */}
      {/* {!onClose && !noFav && (
        <Authorize noRedirect>
          <HeartIcon active={isWishlist} onClick={handleToggleWishlist} />
        </Authorize>
      )} */}
      {onClose && (
        <div
          className="icon-wrapper"
          role="button"
          tabIndex={0}
          onKeyDown={handleClose}
          onClick={handleClose}
        >
          <i className="fas fa-times-circle" />
        </div>
      )}
    </div>
  );
  if (item) return <div className="item">{DefaultProduct}</div>;
  if (loading) return LoadingProduct;
  return DefaultProduct;
};

Product.propTypes = {
  deadLink: PropTypes.bool,
  bordered: PropTypes.bool,
  noButton: PropTypes.bool,
  noFav: PropTypes.bool,
  // type: PropTypes.string,
};

Product.defaultProps = {
  deadLink: false,
  // type: 'regular',
  bordered: false,
  noButton: false,
  noFav: false,
};

export default connect(({ user, cart, wishlist }, ownProps) => {
  const { id } = ownProps;

  const isWishlist = !isEmpty(find(wishlist.products, i => i._id === id));
  return { user, cart, isWishlist };
})(Product);
