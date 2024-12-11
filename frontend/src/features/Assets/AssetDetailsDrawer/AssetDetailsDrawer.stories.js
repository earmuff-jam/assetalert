import QrCodeGen from '@common/QrCodeGen';
import AssetDetailsDrawer from '@features/Assets/AssetDetailsDrawer/AssetDetailsDrawer';
import { VIEW_INVENTORY_LIST_HEADERS } from '@features/Assets/constants';

export default {
  title: 'AssetList/AssetDetailsDrawer/AssetDetailsDrawer',
  component: AssetDetailsDrawer,
  tags: ['autodocs'],
};

const Template = (args) => <AssetDetailsDrawer {...args} />;

export const AssetDetailsDrawerDefault = Template.bind({});

AssetDetailsDrawerDefault.args = {
  resetSelection: () => {},
  title: 'Test asset details drawer title',
  selectedRow: {
    name: 'test name',
    description: 'test description',
    price: '12.00',
    barcode: '123123123123',
    sku: 'ABCD32232',
    quantity: 1,
    location: 'Small Kitchen Cabinet',
    is_returnable: true,
    return_location: 'Walmart',
    max_weight: '12',
    min_weight: '1',
    max_height: '',
    min_height: '',
    bought_at: 'Amazon',
    qr_code: <QrCodeGen value={'test name'} />,
  },
  columns: Object.values(VIEW_INVENTORY_LIST_HEADERS),
};
