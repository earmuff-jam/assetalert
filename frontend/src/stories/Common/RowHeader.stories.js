import { AddRounded, EditRounded } from '@mui/icons-material';
import RowHeader from '../../features/common/RowHeader';

export default {
  title: 'Common/RowHeader',
  component: RowHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const RowHeaderDefaultMode = {
  args: {
    title: 'Default Title',
    titleVariant: 'h4',
    caption: 'Default caption',
    showRedirectLink: false,
    redirectTo: '',
    primaryButtonTextLabel: '',
    primaryButtonDisabled: false,
    primaryStartIcon: <EditRounded />,
    secondaryButtonTextLabel: '',
    secondaryStartIcon: '',
    handleClickPrimaryButton: () => {},
    handleClickSecondaryButton: () => {},
  },
};

export const RowHeaderTitleWithCaptionMode = {
  args: {
    title: 'Default title',
    titleVariant: 'h6',
    caption: 'Default caption for title',
  },
};

export const RowHeaderTitleWithPrimaryButtonMode = {
  args: {
    title: 'Default title',
    titleVariant: 'h6',
    caption: 'Default caption for title',
    primaryButtonTextLabel: 'Edit',
    primaryButtonDisabled: false,
    primaryStartIcon: <EditRounded />,
  },
};

export const RowHeaderTitleWithPrimaryAndSecondaryButtonMode = {
  args: {
    title: 'Default title',
    titleVariant: 'h6',
    caption: 'Default caption for title',
    primaryButtonTextLabel: 'Edit',
    primaryButtonDisabled: false,
    primaryStartIcon: <EditRounded />,
    secondaryButtonTextLabel: 'Add',
    secondaryStartIcon: <AddRounded />,
  },
};
