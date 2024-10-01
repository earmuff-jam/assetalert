import { useState } from 'react';
import { Chip, Stack } from '@mui/material';
import RowHeader from '../../common/RowHeader';
import { ItemWrapper } from './ItemWrapper';

const data = [
  {
    id: 1,
    type: 'monthly',
    items: [
      {
        title: 'Basic',
        pricing: '$49.99',
        perRatio: '/month',
        bulletList: [
          '10 Category limit',
          '5 maintenance plan limit',
          '100 asset limit',
          'Unlimited download of reports',
          'Unlimited download of plans',
          '2 collaborators limit',
        ],
      },
      {
        title: 'Pro features',
        pricing: '$149.99',
        perRatio: '/month',
        bulletList: [
          '20 Category limit',
          '10 maintenance plan limit',
          '1000 asset limit',
          'Unlimited download of reports',
          'Unlimited download of plans',
          '10 collaborators limit',
        ],
      },
      {
        title: 'Custom features',
        pricing: '$299.99',
        perRatio: '/month',
        bulletList: [
          'Unlimited categories',
          'Unlimited maintenance items',
          'Unlimited assets',
          'Unlimited download of reports',
          'Unlimited download of plans',
          'Unlimited collaborators',
        ],
      },
    ],
  },
  {
    id: 1,
    type: 'yearly',
    items: [
      {
        title: 'Basic',
        pricing: '$149.99',
        perRatio: '/year',
        bulletList: [
          '10 Category limit',
          '5 maintenance plan limit',
          '100 asset limit',
          'Unlimited download of reports',
          'Unlimited download of plans',
          '2 collaborators limit',
        ],
      },
      {
        title: 'Pro features',
        pricing: '$449.99',
        perRatio: '/year',
        bulletList: [
          '20 Category limit',
          '10 maintenance plan limit',
          '1000 asset limit',
          'Unlimited download of reports',
          'Unlimited download of plans',
          '10 collaborators limit',
        ],
      },
      {
        title: 'Custom features',
        pricing: '$899.99',
        perRatio: '/year',
        bulletList: [
          'Unlimited categories',
          'Unlimited maintenance items',
          'Unlimited assets',
          'Unlimited download of reports',
          'Unlimited download of plans',
          'Unlimited collaborators',
        ],
      },
    ],
  },
];

export default function Pricing() {
  const [selected, setSelected] = useState('monthly');
  const handleSelection = (value) => setSelected(value);

  return (
    <Stack>
      <RowHeader title="Pricing" secondaryTitle="Pricing and Information" />
      <Stack direction="row" spacing="1rem" justifyContent="center">
        <Chip
          label="Monthly"
          variant={selected === 'monthly' ? 'filled' : 'outlined'}
          onClick={() => handleSelection('monthly')}
        />
        <Chip
          label="Yearly"
          variant={selected === 'yearly' ? 'filled' : 'outlined'}
          onClick={() => handleSelection('yearly')}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" padding="2rem 10rem">
        {data
          .filter((v) => v.type === selected)
          .map((v) =>
            v.items.map((item) => (
              <ItemWrapper
                key={item.title}
                title={item.title}
                pricing={item.pricing}
                perRatio={item.perRatio}
                bulletList={item.bulletList}
              />
            ))
          )}
      </Stack>
    </Stack>
  );
}
