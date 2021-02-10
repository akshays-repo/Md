import React from 'react';
import { createPlugin } from '@fullcalendar/react';

const FilterPlugin = () => {
  return <div className="check">Shailesh</div>;
};

export default createPlugin({
  views: {
    custom: FilterPlugin,
  },
});
