import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Panel from './Panel'

class Tabs extends Component {
  state = {
    activeIndex: 0,
  }

  getTabMenu = children => {
    return (
      <div className="col-lg-12">
        <div className="checkout-steps" role="tablist">
          {React.Children.map(children, (item, index) => {
            const { menuItem, id } = item.props
            const { activeIndex } = this.state
            console.log(menuItem, index === activeIndex ? 'active' : '')
            return (
              <div
                key={id}
                className={classNames('checkout-single-step', { 'active': activeIndex === index })}
                role="presentation"
                onClick={() => this.handleTabChange(index)}
              >
                {menuItem}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  handleTabChange = newIndex => {
    this.setState({ activeIndex: newIndex })
  }

  getTabContent = children => {
    const { activeIndex } = this.state
    return children.find((child, index) => index === activeIndex) || ''
  }

  static Panel = Panel;

  render() {
    const { className, children } = this.props
    return (
      <div className={className}>
        {this.getTabMenu(children)}
        {this.getTabContent(children)}
      </div>
    )
  }
}

const childrenPropTypeLogic = (props, propName, componentName) => {
  const prop = props[propName]
  return React.Children.toArray(prop).find(child => {
    console.log(child.props.menuItem.props.children)
    
    console.log(
      child.props.menuItem.props.children === PropTypes.arrayOf(PropTypes.element)
        // PropTypes.oneOf([PropTypes.arrayOf(PropTypes.node), PropTypes.string]),
    )
    if (child.type.name !== 'Panel')
      throw new Error(`${componentName} must have <Tab.Panel> as children`)
    if (!child.props.id) throw new Error(`${componentName} must have id prop`)
    if (!child.props.menuItem)
      throw new Error(`${componentName} must have menuItem prop`)
    return null
  })
}

Tabs.propTypes = {
  className: PropTypes.string,
  children: childrenPropTypeLogic,
}

Tabs.defaultProps = {
  className: 'row checkout-wrapper',
  children: <Tabs.Panel />,
}

export default Tabs
