import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';



const Header = (props) => {


  useEffect(() => {
    props.fetchHospital({ userTypeId: 2, page: 1, limit: 200 });
  }, []);

console.log("jsdsdjbsdbdskj" , props.hospital)

  return (
    <div className="dashboard__header">
      <h3><Link to="/">{localStorage.getItem('name') || 'Login'}</Link></h3>
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



