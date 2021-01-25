import React, { PureComponent } from 'react';
import { omit } from '_utils';
// import Skeleton from 'react-loading-skeleton';

// const imgStyle = {
//   minHeight: '120px',
// };

class Img extends PureComponent {
  componentDidMount() {
    // check if browser supports IO
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        entries => {
          // console.log('IntersectionObserver', 'callback', entries);
          entries.forEach(entry => {
            const { src, className } = this.props;
            const { isIntersecting } = entry;
            if (isIntersecting) {
              console.log('isIntersecting', isIntersecting, src);
              if (this.element) {
                this.element.className = `${className} fade show`;
                this.element.src = src;
              }
              if (this.observer) this.observer = this.observer.disconnect();
            }
          });
        },
        {
          // root: document.querySelector(".container"),
          rootMargin: '0px 0px 200px 0px',
          // rootMargin: '0px 0px -100px 0px',
        },
      );
      if (this.element) this.observer.observe(this.element);
    } else {
      console.log('IntersectionObserver not supported');
      const { src, className } = this.props;
      if (this.element) {
        this.element.className = `${className} fade show`;
        this.element.src = src;
      }
    }
  }

  render() {
    const restProps = omit(this.props, 'src');
    // restProps = omit(restProps, 'className');
    const alt = restProps.alt || '';
    const className = typeof restProps.className !== 'undefined' ? restProps.className : '';
    const style = {};
    // if (!this.element || (this.element && !this.element.src)) style = imgStyle;

    return (
      <img
        {...style}
        {...restProps}
        className={`${className} fade`}
        alt={alt}
        ref={el => {
          this.element = el;
        }}
      />
    );
    // return <Skeleton width={120} height={109} />;
  }
}

export default Img;
