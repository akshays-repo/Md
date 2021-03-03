import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';



const Header = (props) => {


  useEffect(() => {
    props.fetchHospital({ userTypeId: 2, page: 1, limit: 200 });
  }, []);


  return (
    <div className="dashboard__header">
      <div className="title">
      <h3><Link to="/">{localStorage.getItem('name') || 'Login'}</Link></h3>

      </div>
      <div>
        <Link to='/logout'>  <i class="fas fa-sign-out-alt pr2"/>LOGOUT</Link>
      </div>
    </div>
  );
};


const mapStoreToProps = ({ Hospital}) => {
  return {    
    hospital: Hospital.payload,
  };
};
const mapDispatchToProps = dispatch => ({
    fetchHospital: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'CHECK_HOSPITAL', param })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Header);



