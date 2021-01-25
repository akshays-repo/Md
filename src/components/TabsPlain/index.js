import React, { Component } from 'react';
import './styles.scss';
import classNames from 'classnames';

class TabsPlain extends Component {
  state = {
    activeIndex: 0,
  };

  handleTabChange = index => {
    this.setState({ activeIndex: index });
  };

  getMenuItems = () => {
    const { children } = this.props;
    const { activeIndex } = this.state;
    const labels = React.Children.map(children, child => child.props.label);
    console.log(labels);
    return (
      <div className="right-side-wrapper flex-column" id="nav-tab" role="tablist">
        {React.Children.map(children, (item, index) => {
          const { label, id, onClick } = item.props;
          console.log(label, index === activeIndex ? 'active' : 'inactive');
          return (
            <button
              //  href="#"
              key={id}
              className={classNames('right-list w-100 text-left', {
                active: activeIndex === index,
              })}
              type="button"
              role="tab"
              onClick={() => {
                this.handleTabChange(index);
                if (onClick) onClick();
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  };

  getTabContent = () => {
    const { children } = this.props;
    const { activeIndex } = this.state;
    console.log(children, activeIndex);

    const activeTab =
      children.length > 0 ? children.find((item, index) => index === activeIndex) : children;
    console.log(activeTab);
    return activeTab;
  };

  render() {
    // console.log(activeIndex)
    return (
      <div className="inner-container">
        <div className="row">
          <div className="col-lg-8 order-sm-last order-lg-first">{this.getTabContent()}</div>
          <div className="col-lg-4">{this.getMenuItems()}</div>
        </div>
      </div>
    );
  }
}

export const TabsPlainPanel = ({ children, label }) => {
  return (
    <div
      className="plain-tab-detail-wrap"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
      label={label}
    >
      {children}
    </div>
  );
};

export default TabsPlain;
