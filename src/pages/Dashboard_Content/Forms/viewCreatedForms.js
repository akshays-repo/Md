import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal, Popconfirm } from 'antd';
import FormCreation from './formCreaton';
import { store } from '../../../reducers/configureStore';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { set } from 'store';
import { message } from 'antd';

const ViewCreatedForms = props => {
  const [editId, setEditId] = useState('');
  const [editData, setEditData] = useState('');

  const openEditModal = (id, data) => {
    setEditData(data);
    setEditId(id);
    store.dispatch({ type: 'OPEN_EDIT1_FORM_MODAL' });
  };

  const copyid = id => {
    navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.hostname}/forms/${id}`,
    );
    message.info('Copied to ClipBoard');
  };
const onCopy = () =>{
  message.info('Copied to ClipBoard');

}
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Form Link',
      dataIndex: 'id',
      key: 'id',
      render: Text => (
        <a
          href={`${window.location.origin}/forms/${Text}`}
        >{`${window.location.origin}/forms/${Text}`}</a>
      ),
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
          <CopyToClipboard onCopy={onCopy} text={`${window.location.origin}/forms/${record.id}`}>
            <span  className="edit-color icon-button">
            <i class="far fa-copy"></i>
            </span>
          </CopyToClipboard>
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
      <Table  scroll={{  x: 240 }}  columns={columns} dataSource={props.payload} />
    </div>
  );
};
export default ViewCreatedForms;
