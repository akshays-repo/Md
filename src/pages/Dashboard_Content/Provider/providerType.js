import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { store } from '../../../reducers/configureStore';
import { actionCreator } from '../../../reducers/actionCreator';
import { Table, Tag, Space, Modal, Popconfirm } from 'antd';
import ProviderTypeForm from './providerTypeForm';
const ProviderType = props => {
  const openEditModal = () => {
    //
  };
  useEffect(() =>{
      console.log("asasasasasasasas",props)
  })

  const columns = [
    {
      title: 'TYPE',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle">
          <span className="edit-color icon-button" onClick={() => openEditModal(record.id, record)}>
            <i className="fa fa-edit"></i>
          </span>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => props.deleteAppointmentType(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <span className="delete-color icon-button">
              <i className="fa fa-trash"></i>
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="appointment-type">
        <div className="header">
          <h2>Provider types</h2>
          <button
            className="plus-button"
            onClick={() => {
              store.dispatch({ type: 'OPEN_PROVIDERTYPE_MODAL1' });
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="defined -field">
          <Table dataSource={props.appointment_type} columns={columns}></Table>
        </div>
      </div>
      <Modal
          title=""
          footer={false}
          visible={props.ProviderTypemodal1}
          onCancel={() => store.dispatch({ type: 'CLOSE_PROVIDERTYPE_MODAL1' })}
          destroyOnClose
        >
          <ProviderTypeForm {...props} />
        </Modal>

    </div>
  );
};

//THIS REDUX SECTION
const mapStoreToProps = ({ ProviderType }) => {
  console.log('Store ProviderType', ProviderType);
  return {
    ProviderType: ProviderType.payload,
    ProviderTypeerror: ProviderType.error,
    ProviderTypemessage: ProviderType.message,
    ProviderTypemodal: ProviderType.modal,
    ProviderTypemodal1: ProviderType.modal1,
    ProviderTypechanged: ProviderType.changed,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProviderType: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDERTYPE', id })),

  addProviderType: (values , contentType) =>
    dispatch(
      actionCreator({ method: 'POST', action_type: 'CREATE_PROVIDER_TYPE', values ,contentType }),
    ),

  editProviderType: (id, values) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_PROVIDERTYPE', id, values })),

  deleteProviderType: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_PROVIDERTYPE', id })),

  filterProviderType: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_PROVIDERTYPE',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(ProviderType);
