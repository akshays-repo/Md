import React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import 'assets/styles/banner-style.css';

const { BgElement } = Element;
class HomeBanner extends React.Component {
  render() {
    const { banner } = this.props;
    return (
      <BannerAnim
        prefixCls="banner-user banner"
        type="across"
        autoPlay
        autoPlaySpeed={5000}
        autoPlayEffect
      >
        {banner.map(item => (
          // eslint-disable-next-line no-underscore-dangle
          <Element prefixCls="banner-user-elem" key={item._id}>
            <BgElement
              key="bg"
              className="bg"
              style={{
                background: `url(/${item.images && item.images[0] && item.images[0].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <TweenOne
              className="banner-user-text"
              animation={{ y: 30, opacity: 0, type: 'from' }}
            />
          </Element>
        ))}
      </BannerAnim>
    );
  }
}

export default HomeBanner;
