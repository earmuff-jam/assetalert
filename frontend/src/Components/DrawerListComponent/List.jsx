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
  IconButton,
  Box,
  Checkbox,
  Tooltip,
} from '@material-ui/core';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import EmptyComponent from '../../util/EmptyComponent';
import { DeleteRounded, ShareRounded } from '@material-ui/icons';
import DownloadExcelButton from '../ItemDetail/DownloadExcelButton';

const useStyles = makeStyles((theme) => ({
  container: {
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
  disabled: {
    opacity: 0.3,
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
  displayDeleteRowIcon,
  displayShareIcon,
  removeSelectedItems,
  handleMenuClick,
  rowSelected,
  handleRowSelection,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.headerText}>{title}</Typography>
      <Box className={classes.container}>
        <Box className={classes.rowContainer}>
          <Typography className={classes.text}>{subtitle}</Typography>
          <Box className={classes.rowContainer}>
            <Box>
              {data.length > 0 && (
                <DownloadExcelButton
                  data={data}
                  tooltipTitle={tooltipTitle}
                  fileName={fileName}
                  sheetName={sheetName}
                />
              )}
            </Box>
            <Box>
              {displayDeleteRowIcon && rowSelected.length > 0 && (
                <IconButton onClick={() => removeSelectedItems(rowSelected)}>
                  <DeleteRounded color="primary" />
                </IconButton>
              )}
              {displayShareIcon && (
                <IconButton onClick={() => handleMenuClick(rowSelected)}>
                  <ShareRounded color="primary" />
                </IconButton>
              )}
            </Box>
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
                  const isSelected = (id) => rowSelected.indexOf(id) !== -1;
                  const selectedID = row.id;
                  const isItemSelected = isSelected(selectedID);
                  const isItemDisabled = row.is_transfer_allocated;
                  return (
                    <Tooltip
                      key={rowIndex}
                      title={isItemDisabled ? `Item is associated with ${row.associated_event_title}` : ''}
                    >
                      <TableRow
                        hover
                        key={rowIndex}
                        className={classNames({
                          [classes.disabled]: isItemDisabled,
                        })}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={!isItemDisabled && isItemSelected}
                            disabled={isItemDisabled}
                            color="primary"
                            onClick={(event) => (!isItemDisabled ? handleRowSelection(event, selectedID) : null)}
                            inputProps={{ 'aria-labelledby': 'labelId' }}
                          />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell key={column}>{rowFormatter(row, column, rowIndex)}</TableCell>
                        ))}
                      </TableRow>
                    </Tooltip>
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
  removeSelectedItems: () => {},
  displayDeleteRowIcon: false,
  displayShareIcon: false,
  handleMenuClick: () => {},
  rowSelected: [],
  handleRowSelection: () => {},
};

List.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  rowFormatter: PropTypes.func,
  filteredData: PropTypes.array,
  columnHeaderFormatter: PropTypes.func,
  removeSelectedItems: PropTypes.func,
  tooltipTitle: PropTypes.string,
  fileName: PropTypes.string,
  sheetName: PropTypes.string,
  modifyHeightVariant: PropTypes.bool,
  displayDeleteRowIcon: PropTypes.bool,
  displayShareIcon: PropTypes.bool,
  handleMenuClick: PropTypes.func,
  rowSelected: PropTypes.array,
  handleRowSelection: PropTypes.func,
};

export default List;
