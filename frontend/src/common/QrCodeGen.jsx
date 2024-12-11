import { QRCodeSVG } from 'qrcode.react';

import { Stack, Typography } from '@mui/material';

const QrCodeGen = ({ value }) => {
  return (
    <Stack>
      <Typography variant="caption">QR Code</Typography>
      <QRCodeSVG value={value} />
    </Stack>
  );
};

export default QrCodeGen;
