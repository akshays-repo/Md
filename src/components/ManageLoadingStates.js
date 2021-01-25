import React from 'react';
import Loader from 'components/Loader'

const ManageLoadingStates = ({ isLoading, isFetching, data, children }) => {
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && data && children}
      {data && isFetching && <div>isFetching...</div>}
    </>
  );
};

export default ManageLoadingStates;
