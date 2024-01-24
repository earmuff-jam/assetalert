import React from 'react';
import * as XLSX from 'xlsx';
import { IconButton, Tooltip } from '@material-ui/core';
import { CloudDownloadRounded } from '@material-ui/icons';

const DownloadExcelButton = ({ items }) => {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(items);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory Sheet');
    XLSX.writeFile(wb, 'Event Inventory.xlsx');
  };

  return (
      <Tooltip title="download inventory list">
        <IconButton onClick={handleDownload}>
          <CloudDownloadRounded />
        </IconButton>
      </Tooltip>
  );
};

export default DownloadExcelButton;
