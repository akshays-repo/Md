import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const CustomFormField = () => {
    const [field , setField] = useState()
    const menuItems = [
        {
          key: 'active',
          title: 'Active',
        },
        {
          key: 'hold',
          title: 'Hold',
        },
      ];

      
      const handleMenuClick = () =>{
console.log("daada")
      }
    const menu = <Menu items={menuItems} onClick={handleMenuClick} />;

return(
    <div>
        CUSTOM FORM FIELD

        <div>
        <div>
        This is what FossilMd asks your patients by default.
        You can create additional questions and fields by clicking on the plus sign below.


        <Dropdown
        overlay={menu}
        trigger={['click']}

      >
        <button>Create a New Field</button>
      </Dropdown>

      This is what FossilMd asks your patients by default.
        You can create additional questions and fields by clicking on the plus sign below.
        This is what FossilMd asks your patients by default.
        You can create additional questions and fields by clicking on the plus sign below.
        This is what FossilMd asks your patients by default.
        You can create additional questions and fields by clicking on the plus sign below.



        </div>



        </div>
    </div>
)
}
export default CustomFormField