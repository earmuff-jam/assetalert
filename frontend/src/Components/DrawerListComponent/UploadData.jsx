import PropTypes from 'prop-types';
import React from 'react';
import { Box, Input, Button } from '@material-ui/core';

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
}) => {
  return (
    <Box>
      <form>
        <Input type="file" onChange={onChange} />
      </form>
      <Button onClick={onCancelClick} disabled={disableCancelButton} className={cancelButtonStyles}>
        {buttonCancelText}
      </Button>
      <Button onClick={onSubmitClick} disabled={disableSubmitButton} className={submitButtonStyles}>
        {buttonSubmitText}
      </Button>
    </Box>
  );
};

UploadData.defaultProps = {
  buttonCancelText: 'Cancel',
  buttonSubmitText: 'Submit',
  onChange: () => {},
  onSubmitClick: () => {},
  onCancelClick: () => {},
  cancelButtonStyles: {},
  disableCancelButton: false,
  submitButtonStyles: {},
  disableSubmitButton: false,
};

UploadData.propTypes = {
  buttonCancelText: PropTypes.string,
  buttonSubmitText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmitClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  cancelButtonStyles: PropTypes.object,
  disableCancelButton: PropTypes.string,
  buttonSubmitText: PropTypes.string,
  submitButtonStyles: PropTypes.object,
  disableSubmitButton: PropTypes.bool,
};

export default UploadData;
