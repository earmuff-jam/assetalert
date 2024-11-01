import { Typography } from '@mui/material';
import SimpleModal from '../../features/common/SimpleModal';

export default {
  title: 'Common/SimpleModal',
  component: SimpleModal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const SimpleModalDefaultMode = {
  args: {
    title: 'Default title mode',
    subtitle: 'Default subtitle mode',
    handleClose: () => {},
    maxSize: 'md',
    showExport: false,
    handleExport: () => {},
  },
};

export const SimpleModalNoTitleNoSubtitleMode = {
  args: {
    title: '',
    subtitle: '',
    handleClose: () => {},
    maxSize: 'md',
    showExport: false,
    handleExport: () => {},
  },
};

export const SimpleModalShowExportMode = {
  args: {
    title: 'Default title mode',
    subtitle: 'Default subtitle mode',
    handleClose: () => {},
    maxSize: 'md',
    showExport: true,
    handleExport: () => {},
  },
};

export const SimpleModalChildrenMode = {
  args: {
    title: 'Default title mode',
    subtitle: 'Default subtitle mode',
    handleClose: () => {},
    maxSize: 'md',
    showExport: true,
    handleExport: () => {},
    children: <Typography variant="caption">Children component</Typography>,
  },
};

export const SimpleModalSizeMode = {
  args: {
    title: 'Default title mode',
    subtitle: 'Default subtitle mode',
    handleClose: () => {},
    maxSize: 'sm',
    showExport: true,
    handleExport: () => {},
    children: <Typography variant="caption">Children component</Typography>,
  },
};
