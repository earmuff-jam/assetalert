import ColorPicker from '../../features/common/ColorPicker';

export default {
  title: 'Common/ColorPicker',
  component: ColorPicker,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const ColorPickerDefaultMode = {
  args: {
    handleChange: () => {},
    value: '',
  },
};
