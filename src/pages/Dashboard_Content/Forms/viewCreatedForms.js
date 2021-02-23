import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal, Popconfirm } from 'antd';
import FormCreation from './formCreaton';
import { store } from '../../../reducers/configureStore';

import { set } from 'store';
import { message } from 'antd';


const ViewCreatedForms = props => {

  const [editId, setEditId] = useState('')
  const [editData, setEditData] = useState('')

  const openEditModal = (id, data) => {
    setEditData(data)
    setEditId(id)
    store.dispatch({ type: 'OPEN_EDIT1_FORM_MODAL' })
  };

  const copyid = (id) => {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.hostname}/forms/${id}`)
    message.info('Copied to ClipBoard')
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      key: 'action',
      render: record => (
        <Space className="formtableIcons" size="middle">
          <span className="edit-color icon-button" onClick={() => openEditModal(record.id, record)}>
            <i className="fa fa-edit"></i>
          </span>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => props.deleteForms(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <span className="delete-color icon-button">
              <i className="fa fa-trash"></i>
            </span>
          </Popconfirm>
          <span className="edit-color icon-button" onClick={() => copyid(record.id)}>
            <i class="fas fa-share-alt"></i>
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Create New Forms"
        visible={props.modal2}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_EDIT1_FORM_MODAL' })}
        destroyOnClose
      >
        <FormCreation editId={editId} editData={editData} {...props} />
      </Modal>
      <Table columns={columns} dataSource={props.payload} />
    </div>
  );
};
export default ViewCreatedForms;
