import MUIDataTable from 'mui-datatables';
import React, { useEffect } from 'react';

export default function DataTable({ options, ...props }) {
  const optionsFinal = {
    filterType: 'checkbox',
    download: false,
    print: false,
    ...options,
  };
  console.log("props got", props)
  return <MUIDataTable {...props} options={optionsFinal} />;
}
