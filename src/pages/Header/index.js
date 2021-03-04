import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = props => {
  const [profileLogo, setProfileLogo] = useState('');

  useEffect(() => {
    let hospital = JSON.parse(localStorage.getItem('user_data'));
    setProfileLogo(hospital.profile_image);
    props.fetchHospital({ userTypeId: 2, page: 1, limit: 200 });
  }, []);

  return (
    <div className="dashboard__header">
      <div className="title">
      <h3><Link to="/">{localStorage.getItem('name') || 'Login'}</Link></h3>

      </div>
      <div>
        <span>
          <Avatar
            style={{ backgroundColor: '#f0f5f1' }}
            size={40}
          
            src={`${profileLogo}`} 
          />
          <Link to="/logout">
            {' '}
            <i class="fas fa-sign-out-alt pr2" />
            LOGOUT
          </Link>
        </span>
      </div>
    </div>
  );
};

const mapStoreToProps = ({ Hospital }) => {
  return {
    hospital: Hospital.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchHospital: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'CHECK_HOSPITAL', param })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Header);
