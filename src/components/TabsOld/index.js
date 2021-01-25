import React, { Component } from 'react'
import './styles.scss'
import classNames from 'classnames'

class Tabs extends Component {
  state = {
    activeIndex: 0,
  }

  handleTabChange = index => {
    this.setState({ activeIndex: index })
  }

  getMenuItems = () => {
    const { children } = this.props
    const { activeIndex } = this.state
    const labels = React.Children.map(children, child => child.props.label)
    console.log(labels)
    return (
      <div className="details-tab-wrapper" id="nav-tab" role="tablist">
        {React.Children.map(children, (item, index) => {
          const { label, id } = item.props
          console.log(label, index === activeIndex ? 'active' : 'inactive')
          return (
            <button
              key={id}
              className={classNames('single-tab', { 'active': activeIndex === index })}
              type="button"
              role="tab"
              onClick={() => this.handleTabChange(index)}
            >
              {label}
            </button>
          )
        })}
      </div>
    )
  }

  getTabContent = () => {
    const { children } = this.props
    const { activeIndex } = this.state
    console.log(children, activeIndex)
    
    const activeTab = children.length > 0 ? children.find((item, index) => index === activeIndex) : children;
    console.log(activeTab)
    return activeTab
  }

  render() {
    // console.log(activeIndex)
    return (
      <div className="tabs-wrapper">
        {this.getMenuItems()}
        <div className="tab-details">{this.getTabContent()}</div>
      </div>
    )
  }
}

export const TabsPanel = ({ children, label }) => {
  return (
    <div
      className="tab-detail-wrap"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
      label={label}
    >
      {children}
    </div>
  )
}

export default Tabs
