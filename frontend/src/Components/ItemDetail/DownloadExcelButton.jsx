import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import { CloudDownloadRounded } from '@material-ui/icons';

const DownloadExcelButton = ({ data, tooltipTitle, fileName, sheetName }) => {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
  };

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton onClick={handleDownload}>
        <CloudDownloadRounded />
      </IconButton>
    </Tooltip>
  );
};

DownloadExcelButton.defaultProps = {
  data: [],
  tooltipTitle: '',
  fileName: '',
  sheetName: '',
};

DownloadExcelButton.propTypes = {
  data: PropTypes.object,
  tooltipTitle: PropTypes.string,
  fileName: PropTypes.string,
  sheetName: PropTypes.string,
};

export default DownloadExcelButton;
