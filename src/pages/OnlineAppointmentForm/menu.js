import React from 'react';
import { Menu } from 'antd';

export const MenuO = React.memo(({ items, setFieldValue }) => {
  console.log('in menu');
  const handleClick = val => {
    console.log('clicked', val);
    console.log('clicked', val.domEvent.target.textContent);

    setFieldValue('appointment_type_id', val.key);
    setFieldValue('appointment_type', val.domEvent.target.textContent);
  };
  return (
    <Menu onClick={handleClick}>
      {items.map(item => (
        <Menu.Item key={item.id}>{item.name}</Menu.Item>
      ))}
    </Menu>
  );
});
