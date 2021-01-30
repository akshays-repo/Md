import React from 'react'
import { Menu } from 'antd'

const MenuA = React.memo(({ items, onClick }) => {
  console.log('in menu')
  const handleClick = val => {
    console.log('clicked', val)
    if (onClick) onClick(val)
  }
  return (
    <Menu onClick={handleClick}>
      {items.map(item => (
        <Menu.Item key={item.key}>{item.title}</Menu.Item>
      ))}
    </Menu>
  )
})

export default MenuA
