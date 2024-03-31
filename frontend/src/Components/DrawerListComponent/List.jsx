import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    overflow: 'auto',
  },
  addedHeightVariant: {
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

const List = ({ title, subtitle, data, columns, tableTitle, tableOptions, applyHeightVariant }) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.headerText}>{title}</Typography>
      <Box className={classNames(classes.container, { [classes.addedHeightVariant]: applyHeightVariant })}>
        <Box className={classes.rowContainer}>
          <Typography className={classes.text}>{subtitle}</Typography>
        </Box>
        <MUIDataTable title={tableTitle} data={data} columns={columns} options={tableOptions} />
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
  applyHeightVariant: false,
};

List.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  rowFormatter: PropTypes.func,
  tableTitle: PropTypes.string,
  applyHeightVariant: PropTypes.bool,
};

export default List;
