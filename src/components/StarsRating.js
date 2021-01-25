/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';

// import usePrevious from 'hooks/usePrevious';

class StarsRating extends React.PureComponent {
  // console.log(prevRating, rating, prevRating === 5, rating === 5);
  state = {
    rating: this.props.initialValue || 0,
  };

  handleRatingChange = e => {
    const { onChange } = this.props;
    const { currentTarget } = e;
    const { dataset } = currentTarget;
    const newRating = parseInt(dataset.rating, 10);
    console.log('stars rating new rating', newRating);
    const { rating: currentRating } = this.state;
    if (newRating === currentRating) this.resetRating();
    this.setState(
      {
        rating: newRating,
      },
      () => {
        if (onChange) onChange(this.state.rating);
      },
    );
  };

  resetRating = () => {
    const {onChange} = this.props;
    this.setState(
      {
        rating: 0,
      },
      () => {
        if (onChange) onChange(this.state.rating);
      },
    );
  };

  render() {
    const { rating } = this.state;
    return (
      <div className="stars-wrapper">
        <i
          aria-label="rating-1"
          className={classNames('fa-star', { far: rating === 0, fas: rating > 0 })}
          data-rating="1"
          onClick={this.handleRatingChange}
          role="button"
          onKeyDown={this.handleRatingChange}
          tabIndex={-1}
        />
        <i
          aria-label="rating-2"
          className={classNames('fa-star', { far: rating < 2, fas: rating > 1 })}
          data-rating="2"
          onClick={this.handleRatingChange}
          role="button"
          onKeyDown={this.handleRatingChange}
          tabIndex={-1}
        />
        <i
          aria-label="rating-3"
          className={classNames('fa-star', { far: rating < 3, fas: rating > 2 })}
          data-rating="3"
          onClick={this.handleRatingChange}
          role="button"
          onKeyDown={this.handleRatingChange}
          tabIndex={-1}
        />
        <i
          aria-label="rating-4"
          className={classNames('fa-star', { far: rating < 4, fas: rating > 3 })}
          data-rating="4"
          onClick={this.handleRatingChange}
          role="button"
          onKeyDown={this.handleRatingChange}
          tabIndex={-1}
        />
        <i
          aria-label="rating-5"
          className={classNames('fa-star', { far: rating < 5, fas: rating === 5 })}
          data-rating="5"
          onClick={this.handleRatingChange}
          role="button"
          onKeyDown={this.handleRatingChange}
          tabIndex={-1}
        />
      </div>
    );
  }
}

StarsRating.defaultProps = {
  rating: 5,
};

export default StarsRating;
