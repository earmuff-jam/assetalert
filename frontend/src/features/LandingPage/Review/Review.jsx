import dayjs from 'dayjs';
import HeaderWithButton from '../../common/HeaderWithButton';
import ItemDetails from '../../Reports/ItemDetails';
import { capitalizeFirstLetter } from '../../common/utils';
import { Stack } from '@mui/material';
import ReviewCardWrapper from './ReviewCardWrapper';

export default function Review() {
  const review = [
    {
      id: 1,
      title: '4 stars',
      description: 'Been using it for a couple of months, and I just love how easy it is to use.',
      creator: 'Mary Jane',
      created_at: dayjs(),
    },
    {
      id: 2,
      title: 'Love the export button',
      description: 'The ability to quickly export content is what I am super fan of.',
      creator: 'Jane',
      created_at: dayjs(),
    },
    {
      id: 3,
      title: 'Gets the job done',
      description: 'I used a couple of other apps but this lets me create composite assets. That is really handy.',
      creator: 'Gary',
      created_at: dayjs(),
    },
    {
      id: 4,
      title: 'Love it.',
      description:
        'Just want to thank the creators for this amazing app. We have been looking for something like this for the longest',
      creator: 'Rabin',
      created_at: dayjs(),
    },
    {
      id: 5,
      title: 'Worth it.',
      description:
        'I tried it because I was recommended about it. I love how it helps me manage all my assets with ease.',
      creator: 'Nisha',
      created_at: dayjs(),
    },
  ];

  return (
    <>
      <HeaderWithButton title="Learn more" secondaryTitle="Read reviews from clients that use asset alert." />
      <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
        {review.map((v) => (
          <ReviewCardWrapper key={v.id} title={v.title} chipLabel={dayjs(v.created_at).format('MMM')}>
            <ItemDetails
              loading={false}
              avatarValue={capitalizeFirstLetter(v?.creator?.charAt(0))}
              label={v?.title || ''}
              caption={v?.description || ''}
            />
          </ReviewCardWrapper>
        ))}
      </Stack>
    </>
  );
}
