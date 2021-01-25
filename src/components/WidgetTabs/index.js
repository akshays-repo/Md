import React from 'react';
import { isEmpty } from 'lodash';
import Category from './Category';
import Products from './Product';
import Brands from './Brands';
// import Static from './Static';
import Banner from './Banner';

const WidgetTabs = ({ data }) => {
  if (data.listingType === 'category') {
    if (!isEmpty(data.typeDetails)) {
      return <Category data={data} />;
    }
  }
  if (data.listingType === 'brands') {
    if (!isEmpty(data.typeDetails)) {
      return <Brands data={data} />;
    }
  }
  if (data.listingType === 'products') {
    if (!isEmpty(data.typeDetails)) {
      return <Products data={data} />;
    }
  }
  // if (data.listingType === 'static') {
  //   if (!isEmpty(data.typeDetails)) {
  //     return <Static data={data} />;
  //   }
  // }
  if (data.listingType === 'banner') {
    if (!isEmpty(data.typeDetails)) {
      return <Banner data={data} />;
    }
  }

  return null;
};

export default WidgetTabs;
