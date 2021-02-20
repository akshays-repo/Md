import React, { useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import Dashboard_Content from '..';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import { FaRecordVinyl } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import moment from 'moment'
const Dashboard_Templates = props => {
  useEffect(() => {
    props.fetchTemplate();
  }, []);

  useEffect(() => {
    console.log('porpojfijdjf', props.payload);
  });
  const columns = [
    
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (record, text) => {
        return (
          <Link to={`/templates/${text.id}/actions`}>
            <img className="pr2" style={{width:"35px", height:"35px"}} src={text.icon}/>{text.name}
          </Link>
        );
      },
    },
    {
      title: 'Total sent',
      dataIndex: 'total_sent',
      key: 'total_sent',
    },
    {
      title: 'Recipents',
      dataIndex: 'recipients',
      key: 'recipients',
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render:text => moment(text.updatedAt).format('MMMM Do YYYY, h:mm:ss a')

    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: text => <a>{text}</a>,
    // },
  ];

  const Templates = () => {
    return (
      <div>
        <Table columns={columns} dataSource={props.payload} />
      </div>
    );
  };
  return <Dashboard_Content content={Templates()} />;
};

const mapStoreToProps = ({ Template }) => {
  console.log('state', Template);
  return {
    payload: Template.payload,
    error: Template.error,
    message: Template.message,
    modal: Template.modal,
    modal1: Template.modal1,
    changed: Template.changed,
    templateActions: Template.templateActions
  };
};
const mapDispatchToProps = dispatch => ({
  fetchTemplate: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_TEMPLATE' })),
  addTemplate: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_USER', values })),
  editTemplate: ( id ,values , contentType) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_TEMPLATE', id , values ,contentType })),
    fetchTemplateAction: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_HOSPITAL_ACTION', id })),
  deleteTemplate: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_USER', id })),
  filterTemplate: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_APPOINTMENT',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Templates);
