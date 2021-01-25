/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slide from './Slide';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import Dots from './Dots';

class Slider extends PureComponent {
  state = {
    images: [],
    currentIndex: 0,
    translateValue: 0,
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props, state);

    return {
      images: props.images,
    };
  }

  // componentDidUpdate(prevProps){
  //   console.warn('slider :componentDidUpdate')
  //   console.log(prevProps, this.props)
  //   if (prevProps.images !== this.props.images){
  //     this.setState()
  //   }
  // }

  slideWidth = () => {
    return document.querySelector('.slide').clientWidth;
  };

  goPrevClick = () => {
    const { currentIndex } = this.state;
    console.log(currentIndex);
    // if (currentIndex > 0) {
    //   this.setState(prevState => {
    //     return {
    //       currentIndex: prevState.currentIndex - 1,
    //       translateValue: prevState.translateValue + this.slideWidth(),
    //     };
    //   });
    // }
    if(currentIndex === 0)
    return;
    this.setState(prevState => {
     return {
       translateValue: prevState.translateValue + this.slideWidth(),
       currentIndex: prevState.currentIndex - 1
     }
    })
  };

  goNextClick = () => {
    const { images, currentIndex } = this.state;
    console.log(currentIndex);

    // if (currentIndex < images.length - 1) {
    //   this.setState(prevState => {
    //     return {
    //       currentIndex: prevState.currentIndex + 1,
    //       translateValue: prevState.translateValue + -this.slideWidth(),
    //     };
    //   });
    // } else {
    //   this.setState({
    //     currentIndex: 0,
    //     translateValue: 0,
    //   });
    // }
    if(currentIndex === images.length - 1) {
      return this.setState({
        translateValue: 0,
        currentIndex: 0
      })
    }
    
    return this.setState(prevState => {
      return {
        translateValue: prevState.translateValue - this.slideWidth(),
        currentIndex: prevState.currentIndex + 1
      }
    })
  };

  handleDotClick = i => {
    console.log('clicked a dot', i);
    const { currentIndex, translateValue } = this.state;
    console.table(currentIndex, i, translateValue);
    if (i === currentIndex) return;

    if (i > currentIndex) {
      this.setState({ translateValue: -i * this.slideWidth() });
    }
    // We need to go forward to a particular slide
    else {
      this.setState({
        translateValue: translateValue + (currentIndex - i) * this.slideWidth(),
      });
    }

    this.setState({ currentIndex: i });
  };

  render() {
    const { translateValue, currentIndex, images } = this.state;
    console.log(images);
    console.log(currentIndex);
    return (
      <>
        <div className="slider">
          <div
            className="slider-wrapper"
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: 'transform ease-out 0.45s',
            }}
          >
            {images.map(image => (
              <>
                <Slide key={image.id} image={image.image} />
              </>
            ))}
          </div>
          {currentIndex !== 0 && <LeftArrow goPrevClick={this.goPrevClick} />}
          {currentIndex !== images.length - 1 && <RightArrow goNextClick={this.goNextClick} />}

          <Dots
            images={images.map(image => {
              return { image: image.thumb, id: image.id };
            })}
            activeIndex={currentIndex}
            onDotClick={this.handleDotClick}
          />
        </div>
      </>
    );
  }
}

Slider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
      thumbUrl: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(({ product }) => ({ product }))(Slider);
