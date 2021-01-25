import React, { useEffect, useState } from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import 'assets/styles/banner-style.css';
import { Link } from 'react-router-dom';
import { orderBy } from 'lodash';

const { BgElement } = Element;

const Banner = ({ data }) => {
  const [ismobile, setMobile] = useState(window.innerWidth);
  const [mobile, setisMobile] = useState(window.innerWidth < 767);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobile(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (ismobile < 767) {
      setisMobile(true);
    } else setisMobile(false);
  }, [ismobile]);
  //   const onClickAnchor = useCallback(e => e.preventDefault(), []);

  const renderBanner = (url, tabDat) => {
    console.log('dfsd', url, tabDat);
    return (
      <Link to={tabDat?.imglink}>
        <img width="100%" className="lazy" src={url} alt="" />
      </Link>
    );
  };

  if (data && data?.typeDetails && data?.typeDetails.length > 0) {
    const order = orderBy(data?.typeDetails, ['priorityOrder'], ['asc']);

    // data.typeDetails.forEach(i => {
    //   if (order[i.priorityOrder]) order[Number(i.priorityOrder) + 1] = i;
    //   else order[i.priorityOrder] = i;
    // });

    // order = order.sort((a, b) => {
    //   return a - b;
    // });

    let viewType = null;
    if (data?.typeDetails.length === 1) {
      viewType = (
        <>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[0].image[0].url, order[0])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: !mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[0].mobileimage[0].url, order[0])}
          </div>
        </>
      );
    } else if (data?.typeDetails.length === 2) {
      viewType = (
        <>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[0].image[0].url, order[0])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[0].image[0].url, order[0])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: !mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[1].mobileimage[0].url, order[1])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: !mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[1].mobileimage[0].url, order[1])}
          </div>
        </>
      );
    } else if (data?.typeDetails.length === 3) {
      viewType = (
        <>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[2].image[0].url, order[0])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[0].image[0].url, order[0])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[1].image[0].url, order[1])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: !mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[1].mobileimage[0].url, order[1])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: !mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[2].mobileimage[0].url, order[2])}
          </div>
          <div
            className="ad-area wow fadeInUp"
            style={{
              display: !mobile ? 'none' : 'block',
              visibility: 'visible',
              animationName: 'fadeInUp',
            }}
          >
            {renderBanner(order[2].mobileimage[0].url, order[2])}
          </div>
        </>
      );
    } else {
      console.log('order banner', order);
      viewType = (
        <>
          <BannerAnim
            style={{ display: mobile ? 'none' : 'block' }}
            prefixCls="banner-user banner"
            type="across"
            autoPlay
            autoPlaySpeed={5000}
            autoPlayEffect
          >
            {order?.map(item => (
              // <a href={item.imglink}>
              <Element prefixCls="banner-user-elem">
                <BgElement
                  key="bg"
                  className="bg"
                  style={{
                    background: `url(${item.image[0].url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <TweenOne
                  className="banner-user-text"
                  animation={{ y: 30, opacity: 0, type: 'from' }}
                />
              </Element>
              // </a>
            ))}
          </BannerAnim>
          <BannerAnim
            style={{ display: !mobile ? 'none' : 'block' }}
            prefixCls="banner-user banner"
            type="across"
            autoPlay
            autoPlaySpeed={5000}
            autoPlayEffect
          >
            {data?.typeDetails.map(item => (
              <a href={item.imglink}>
                <Element prefixCls="banner-user-elem">
                  <BgElement
                    key="bg"
                    className="bg"
                    style={{
                      background: `url(${item.mobileimage[0].url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </Element>
              </a>
            ))}
          </BannerAnim>
        </>
      );
    }
    if (data?.typeDetails.length > 3) {
      return viewType;
    }
    return (
      <section
        className="shadow-section wow fadeInUp"
        style={{ visibility: 'visible', animationName: 'fadeInUp' }}
      >
        <div className="container">
          <div className="four-ads-wrapper">{viewType}</div>
        </div>
      </section>
    );
  }
  return null;
};

export default Banner;
