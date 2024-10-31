import ImagePicker from '../../features/common/ImagePicker/ImagePicker';

export default {
  title: 'Common/ImagePicker',
  component: ImagePicker,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const ImagePickerDefaultMode = {
  args: {
    selectedData: {
      id: '5e85412e-921d-4783-84ca-8e3212db730d',
      name: 'Dog food',
      description: '6 pounds of food bought from tractor supply',
      price: 96,
      status: 'HIDDEN',
      barcode: 'barcode#1123928',
      sku: 'sku#123456734',
      quantity: 1,
      location: 'Utility Closet',
      storage_location_id: '0f74baf6-30e7-4e4e-aee9-384316a60f96',
      is_returnable: false,
      return_location: 'amazon return',
      max_weight: '12',
      min_weight: '4',
      max_height: '20',
      min_height: '12',
      associated_image_url: '',
      created_at: '2024-10-15T01:42:30.555717Z',
      created_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
      creator_name: 'IngestSvcUser',
      updated_at: '2024-10-15T01:42:30.555717Z',
      updated_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
      updater_name: 'IngestSvcUser',
      bought_at: 'Walmart',
      sharable_groups: ['e09a085b-71c7-4a22-a5ff-aca26bfa01c6'],
    },
    handleClose: () => {},
  },
};

export const ImagePickerEmptySelectionDataMode = {
  args: {
    selectedData: {},
    handleClose: () => {},
  },
};
