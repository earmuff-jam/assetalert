import AssetListContent from '@features/Assets/AssetListContent/AssetListContent';
import { MODAL_STATE } from '@features/Assets/constants';
import dayjs from 'dayjs';

export default {
  title: 'AssetList/AssetListContent/AssetListContent',
  component: AssetListContent,
  tags: ['autodocs'],
};

const Template = (args) => <AssetListContent {...args} />;

export const AssetListContentDefault = Template.bind({});
export const AssetListContentGridMode = Template.bind({});
export const AssetListContentGridModeSelectedItem = Template.bind({});
export const AssetListContentLoading = Template.bind({});

AssetListContentDefault.args = {
  loading: false,
  modalState: MODAL_STATE.NONE,
  setModalState: () => {},
  inventories: [],
  options: [
    {
      id: 1,
      name: 'Test item',
      price: 12.0,
      quantity: 1,
      location: 'Bedroom Closet',
      updated_at: dayjs(),
      updator: 'JOHN DOE',
    },
  ],
  gridMode: false,
  rowSelected: [],
  setRowSelected: () => {},
  handleCloseModal: () => {},
};

AssetListContentGridMode.args = {
  loading: false,
  modalState: MODAL_STATE.NONE,
  setModalState: () => {},
  inventories: [],
  options: [
    {
      id: 'test-id-1',
      name: 'Test item',
      price: 12.0,
      quantity: 1,
      location: 'Bedroom Closet',
      updated_at: dayjs(),
      updator: 'JOHN DOE',
    },
  ],
  gridMode: true,
  rowSelected: [],
  setRowSelected: () => {},
  handleCloseModal: () => {},
};

AssetListContentGridModeSelectedItem.args = {
  loading: false,
  modalState: MODAL_STATE.NONE,
  setModalState: () => {},
  inventories: [],
  options: [
    {
      id: 'test-id-1',
      name: 'Test Selected item',
      price: 14.0,
      quantity: 5,
      location: 'Bedroom Closet',
      updated_at: dayjs(),
      updator: 'JOHN DOE',
    },
  ],
  gridMode: true,
  rowSelected: ['test-id-1'],
  setRowSelected: () => {},
  handleCloseModal: () => {},
};

AssetListContentLoading.args = {
  loading: true,
  modalState: MODAL_STATE.NONE,
  setModalState: () => {},
  inventories: [],
  options: [
    {
      id: 1,
      name: 'Test item',
      price: 12.0,
      quantity: 1,
      location: 'Bedroom Closet',
      updated_at: dayjs(),
      updator: 'JOHN DOE',
    },
  ],
  gridMode: false,
  rowSelected: [],
  setRowSelected: () => {},
  handleCloseModal: () => {},
};
