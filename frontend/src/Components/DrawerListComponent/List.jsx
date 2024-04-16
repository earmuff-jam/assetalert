import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmptyComponent from '../../util/EmptyComponent';
import DownloadExcelButton from '../ItemDetail/DownloadExcelButton';
import { useState } from 'react';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: theme.spacing(1),
    overflow: 'auto',
  },
  modifyHeightVariant: {
    // used for view items  && expense drawer
    height: `calc(100vh - 20rem)`,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: '2.0rem',
    letterSpacing: '0.125rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  text: {
    fontSize: '0.925rem',
    fontWeight: 'lighter',
    color: theme.palette.error.dark,
    margin: theme.spacing(2),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const List = ({
  title,
  subtitle,
  data,
  filteredData,
  columns,
  columnHeaderFormatter,
  rowFormatter,
  tooltipTitle,
  fileName,
  sheetName,
  modifyHeightVariant,
}) => {
  const classes = useStyles();

  const [rowSelected, setRowSelected] = useState([]);

  const handleClick = (event, name) => {
    const selectedIndex = rowSelected.indexOf(name);
    let draftSelected = [];

    if (selectedIndex === -1) {
      draftSelected = draftSelected.concat(rowSelected, name);
    } else if (selectedIndex === 0) {
      draftSelected = draftSelected.concat(rowSelected.slice(1));
    } else if (selectedIndex === rowSelected.length - 1) {
      draftSelected = draftSelected.concat(rowSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      draftSelected = draftSelected.concat(rowSelected.slice(0, selectedIndex), rowSelected.slice(selectedIndex + 1));
    }
    setRowSelected(draftSelected);
  };

  return (
    <>
      <Typography className={classes.headerText}>{title}</Typography>
      <Box className={classes.container}>
        <Box className={classes.rowContainer}>
          <Typography className={classes.text}>{subtitle}</Typography>
          <Box className={classes.rowContainer}>
            {data.length > 0 && (
              <DownloadExcelButton data={data} tooltipTitle={tooltipTitle} fileName={fileName} sheetName={sheetName} />
            )}
          </Box>
        </Box>
        {!filteredData.length ? (
          <EmptyComponent subtitle={'Add inventories to view data.'} />
        ) : (
          <TableContainer
            component={Paper}
            className={classNames({ [classes.modifyHeightVariant]: modifyHeightVariant })}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox disabled />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column} className={classes.tableHeaderCell}>
                      {columnHeaderFormatter(column)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, rowIndex) => {
                  const isSelected = (name) => rowSelected.indexOf(name) !== -1;
                  const selectedItem = row.name ? row.name : row.item_name;
                  const isItemSelected = isSelected(selectedItem);
                  return (
                    <TableRow hover key={rowIndex} onClick={(event) => handleClick(event, selectedItem)}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          color="primary"
                          inputProps={{ 'aria-labelledby': 'labelId' }}
                        />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column}>{rowFormatter(row, column, rowIndex)}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

List.defaultProps = {
  title: '',
  subtitle: '',
  data: [],
  columns: [],
  rowFormatter: () => {},
  filteredData: [],
  columnHeaderFormatter: () => {},
  tooltipTitle: '',
  fileName: '',
  sheetName: '',
  modifyHeightVariant: false,
};

List.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  rowFormatter: PropTypes.func,
  filteredData: PropTypes.array,
  columnHeaderFormatter: PropTypes.func,
  tooltipTitle: PropTypes.string,
  fileName: PropTypes.string,
  sheetName: PropTypes.string,
  modifyHeightVariant: PropTypes.bool,
};

export default List;
