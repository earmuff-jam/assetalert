import { CloseRounded } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';

const SimpleModal = (props) => {
  const {
    title,
    subtitle,
    handleClose,
    maxSize,
    showSecondaryButton = false,
    disableSecondaryButton,
    secondaryButtonAction,
    secondaryButtonIcon,
    children,
  } = props;

  return (
    <Dialog open={true} onClose={handleClose} maxWidth={maxSize ?? 'xl'} fullWidth>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            {title}
            {subtitle ? <Typography variant="caption">{subtitle}</Typography> : null}
          </Stack>
          <Stack direction="row" alignItems="center">
            {showSecondaryButton && (
              <IconButton color="primary" onClick={secondaryButtonAction} disabled={disableSecondaryButton}>
                {secondaryButtonIcon}
              </IconButton>
            )}
            <IconButton aria-label="close" onClick={handleClose} color="error">
              <CloseRounded />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ maxHeight: '40rem', overflow: 'auto' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default SimpleModal;
