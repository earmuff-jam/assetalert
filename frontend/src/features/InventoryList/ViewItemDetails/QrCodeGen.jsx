import { Stack, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

const QrCodeGen = ({ value }) => {
  return (
    <Stack>
      <Typography variant="caption">QR Code</Typography>
      <QRCodeSVG value={value} />
    </Stack>
  );
};

export default QrCodeGen;
