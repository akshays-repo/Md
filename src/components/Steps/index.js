import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { SaveButton } from 'components/Button'
import Panel from './Panel';

class Steps extends Component {
  

  getStepMenu = children => {
    return (
      <div className="col-lg-12">
        <div className="checkout-steps" role="tablist">
          {React.Children.map(children, (item, index) => {
            const { menuItem, id } = item.props;
            const { activeIndex } = this.props;
            console.log(menuItem, index === activeIndex ? 'active' : '');
            return (
              <div
                key={id}
                className={classNames('checkout-single-step', { active: activeIndex === index })}
                role="presentation"
              >
                {menuItem}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  handleStepChange = newIndex => {
    this.setState({ activeIndex: newIndex });
  };

  getStepContentA = children => {
    // console.log(children);
    const { activeIndex } = this.props;
    const childRender = children.find((child, index) => index === activeIndex) || '';
    console.log(childRender);
    console.log(React.Children.map(children, (child, i) => (i === activeIndex ? i : null)));
    const currentIndex = React.Children.map(children, (child, i) =>
      i === activeIndex ? i : null,
    )[0];
    console.log(currentIndex);

    return (
      <>
        {React.cloneElement(childRender, {
          currentIndex,
          onPrevClick: () => this.handlePrevClick(currentIndex),
          onNextClick: () => this.handleNextClick(currentIndex),
          totalSteps: children.length,
        })}
        {/* {childRender}
        {currentIndex > 0 && (
          <SaveButton type="button" onClick={() => this.handlePrevClick(currentIndex)}>
            Back
          </SaveButton>
        )}
        {currentIndex < children.length && (
          <SaveButton type="button" onClick={() => this.handleNextClick(currentIndex)}>
            Next
          </SaveButton>
        
        )} */}
      </>
    );
  };

  getStepContent = children => {
    // console.log(children);
    const { activeIndex } = this.props;
    const childRender = children.find((child, index) => index === activeIndex) || '';
    console.log(childRender);
    console.log(React.Children.map(children, (child, i) => (i === activeIndex ? i : null)));
    const currentIndex = React.Children.map(children, (child, i) =>
      i === activeIndex ? i : null,
    )[0];
    console.log(currentIndex);

    return <>{childRender}</>;
  };

  handlePrevClick = i => {
    console.log('in prev click');
    const { activeIndex } = this.state;

    const { children } = this.props;
    const {
      // isValidated,
      // isCompleted,
      canGoBack,
    } = children[i].props;

    return (
      activeIndex > 0 &&
      // isValidated &&
      // isCompleted &&
      canGoBack &&
      this.setState(prevState => {
        return { activeIndex: prevState.activeIndex - 1 };
      })
    );
  };

  handleNextClick = i => {
    console.log('in next click');
    const { activeIndex } = this.state;
    const { children } = this.props;
    const {
      // isValidated,
      isCompleted,
    } = children[i].props;
    console.log(isCompleted);
    return (
      activeIndex < children.length &&
      // isValidated &&
      isCompleted &&
      this.setState(prevState => {
        let nextIndex = prevState.activeIndex + 1;
        if (nextIndex > children.length - 1) nextIndex = children.length - 1;
        return { activeIndex: nextIndex };
      })
    );
  };

  static Panel = Panel;

  render() {
    const { className, children } = this.props;
    return (
      <div className={className}>
        {this.getStepMenu(children)}
        {this.getStepContent(children)}
      </div>
    );
  }
}

const childrenPropTypeLogic = (props, propName, componentName) => {
  const prop = props[propName];
  return React.Children.toArray(prop).find(child => {
    console.log(child.props.menuItem.props.children);

    console.log(
      child.props.menuItem.props.children === PropTypes.arrayOf(PropTypes.element),
      // PropTypes.oneOf([PropTypes.arrayOf(PropTypes.node), PropTypes.string]),
    );
    if (child.type.name !== 'Panel')
      throw new Error(`${componentName} must have <Step.Panel> as children`);
    if (!child.props.id) throw new Error(`${componentName} must have id prop`);
    if (!child.props.menuItem) throw new Error(`${componentName} must have menuItem prop`);
    return null;
  });
};

Steps.propTypes = {
  className: PropTypes.string,
  children: childrenPropTypeLogic,
};

Steps.defaultProps = {
  className: 'row checkout-wrapper',
  children: <Steps.Panel />,
};

export default Steps;
