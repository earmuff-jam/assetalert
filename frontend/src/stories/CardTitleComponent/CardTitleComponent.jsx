import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Tooltip, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerText: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.error.main,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  extraSubtitle: {
    fontSize: '0.725rem',
    fontWeight: 'bold',
    overflowWrap: 'anywhere',
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  userProfileDetailsContainer: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  ellipsisContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));

const CardTitleComponent = ({
  firstIcon,
  firstToolTipLabel,
  firstLabel,
  secondIcon,
  secondLabel,
  secondTooltipLabel,
  titleText,
  titleTooltip,
  extraSubtitle,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.userProfileDetailsContainer}>
      <Box className={[classes.rowContainer, classes.ellipsisContainer].join(' ')}>
        <Tooltip title={titleTooltip}>
          <Typography className={[classes.headerText, classes.ellipsisContainer].join(' ')}>{titleText}</Typography>
        </Tooltip>
        <Box className={classNames(classes.rowContainer, classes.centerContent)}>
          <Tooltip title={firstToolTipLabel}>
            <Chip size="small" icon={firstIcon} label={firstLabel} />
          </Tooltip>
          <Tooltip title={secondTooltipLabel}>
            <Chip size="small" icon={secondIcon} label={secondLabel} />
          </Tooltip>
        </Box>
      </Box>
      <Typography className={classes.extraSubtitle}>{extraSubtitle}</Typography>
    </Box>
  );
};

CardTitleComponent.defaultProps = {
  firstIcon: {},
  firstLabel: '',
  firstToolTipLabel: '',
  secondIcon: {},
  secondLabel: '',
  secondTooltipLabel: '',
  titleText: '',
  titleTooltip: '',
  extraSubtitle: '',
};

CardTitleComponent.propTypes = {
  titleText: PropTypes.string,
  titleTooltip: PropTypes.string,
  firstIcon: PropTypes.object,
  firstLabel: PropTypes.string,
  secondIcon: PropTypes.object,
  secondLabel: PropTypes.number,
  extraSubtitle: PropTypes.string,
  firstToolTipLabel: PropTypes.string,
  secondTooltipLabel: PropTypes.string,
};

export default CardTitleComponent;
