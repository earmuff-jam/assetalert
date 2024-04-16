import PropTypes from 'prop-types';
import React from 'react';
import { Box, Input, Button, Typography } from '@material-ui/core';

const UploadData = ({
  buttonCancelText,
  cancelButtonStyles,
  disableCancelButton,
  buttonSubmitText,
  submitButtonStyles,
  disableSubmitButton,
  onChange,
  onCancelClick,
  onSubmitClick,
  displaySecondaryText,
  secondaryText,
}) => {
  return (
    <Box>
      <form>
        <Input type="file" onChange={onChange} />
      </form>
      {displaySecondaryText && (
        <Typography variant={'caption'} className={cancelButtonStyles}>
          {secondaryText}
        </Typography>
      )}
      <Box>
        <Button onClick={onCancelClick} disabled={disableCancelButton} className={cancelButtonStyles}>
          {buttonCancelText}
        </Button>
        <Button onClick={onSubmitClick} disabled={disableSubmitButton} className={submitButtonStyles}>
          {buttonSubmitText}
        </Button>
      </Box>
    </Box>
  );
};

UploadData.defaultProps = {
  buttonCancelText: 'Cancel',
  buttonSubmitText: 'Submit',
  onChange: () => {},
  onSubmitClick: () => {},
  onCancelClick: () => {},
  cancelButtonStyles: '',
  disableCancelButton: false,
  submitButtonStyles: '',
  disableSubmitButton: false,
  displaySecondaryText: false,
  secondaryText: '',
};

UploadData.propTypes = {
  buttonCancelText: PropTypes.string,
  buttonSubmitText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmitClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  cancelButtonStyles: PropTypes.string,
  disableCancelButton: PropTypes.bool,
  buttonSubmitText: PropTypes.string,
  submitButtonStyles: PropTypes.string,
  disableSubmitButton: PropTypes.bool,
  displaySecondaryText: PropTypes.bool,
  secondaryText: PropTypes.string,
};

export default UploadData;
