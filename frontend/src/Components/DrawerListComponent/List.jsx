import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    height: `calc(100vh - 20rem)`,
    overflow: 'auto',
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

const List = ({ title, subtitle, data, columns, tooltipTitle, fileName, sheetName }) => {
  const classes = useStyles();
  const options = {
    filterType: 'checkbox',
  };
  return (
    <>
      <Typography className={classes.headerText}>{title}</Typography>
      <Box className={classes.container}>
        <Box className={classes.rowContainer}>
          <Typography className={classes.text}>{subtitle}</Typography>
        </Box>
        <MUIDataTable title={title} data={data} columns={columns} options={options} />
      </Box>
    </>
  );
};

List.defaultProps = {
  title: '',
  subtitle: '',
  data: [],
  filteredData: [],
  columns: [],
  columnHeaderFormatter: () => {},
  rowFormatter: () => {},
  tooltipTitle: '',
  fileName: '',
  sheetName: '',
};

List.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.array,
  filteredData: PropTypes.array,
  columns: PropTypes.array,
  columnHeaderFormatter: PropTypes.func,
  rowFormatter: PropTypes.func,
  tooltipTitle: PropTypes.string,
  fileName: PropTypes.string,
  sheetName: PropTypes.string,
};

export default List;
