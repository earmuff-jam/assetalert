import LocationPicker from '../../features/common/Location/LocationPicker';

export default {
  title: 'Common/LocationPicker',
  component: LocationPicker,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const LocationPickerDefaultMode = {
  args: {
    location: { lon: 0, lat: 0 },
    onLocationChange: () => {},
    disabled: false,
    subtitle: 'Default subtitle',
    editMode: false,
  },
};

export const LocationPickerTestLocation = {
  args: {
    location: { lat: 42.203217, lon: -72.625481 },
    onLocationChange: () => {},
    disabled: false,
    subtitle: 'Test Location is used to display values here',
    editMode: false,
  },
};

export const LocationPickerEditMode = {
  args: {
    location: { lat: 42.203217, lon: -72.625481 },
    onLocationChange: () => {},
    disabled: false,
    subtitle: 'Test Location is used to display values here',
    editMode: true,
  },
};

export const LocationPickerDisabledMode = {
  args: {
    location: { lat: 42.203217, lon: -72.625481 },
    onLocationChange: () => {},
    disabled: true,
    subtitle: 'Default subtitle',
    editMode: true,
  },
};
