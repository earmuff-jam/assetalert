import PropTypes from 'prop-types';
import React from 'react';
import { Box, Input, Typography } from '@material-ui/core';
import ButtonComponent from '../../stories/Button/ButtonComponent';
import { CancelRounded, GetAppRounded } from '@material-ui/icons';

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
  onDownloadTemplate,
  disableTemplateDownload,
  templateDownloadStyles,
  templateDownloadText,
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
        <ButtonComponent
          buttonVariant={'text'}
          icon={<CancelRounded />}
          showIcon={true}
          text={buttonCancelText}
          onClick={onCancelClick}
          disabled={disableCancelButton}
          buttonStyles={cancelButtonStyles}
        />
        <ButtonComponent
          buttonVariant={'text'}
          showIcon={false}
          text={buttonSubmitText}
          onClick={onSubmitClick}
          disabled={disableSubmitButton}
          buttonStyles={submitButtonStyles}
        />
        {!disableTemplateDownload && (
          <ButtonComponent
            buttonVariant={'text'}
            icon={<GetAppRounded />}
            showIcon={true}
            text={templateDownloadText}
            onClick={onDownloadTemplate}
            disabled={disableTemplateDownload}
            buttonStyles={templateDownloadStyles}
          />
        )}
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
  onDownloadTemplate: () => {},
  disableTemplateDownload: true,
  templateDownloadStyles: '',
  templateDownloadText: 'Download template',
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
  onDownloadTemplate: PropTypes.func,
  disableTemplateDownload: PropTypes.bool,
  templateDownloadStyles: PropTypes.string,
  templateDownloadText: PropTypes.string,
};

export default UploadData;
