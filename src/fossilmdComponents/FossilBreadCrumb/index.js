import React from 'react'
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';

const FossilBreadCrumb = ({currentUrl, currentPageName}) =>{
    return(
        
        <div className="breadcrumb">
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <Link to={currentUrl}>{currentPageName}</Link>
        </div>
        </div>
    )
}
export default FossilBreadCrumb