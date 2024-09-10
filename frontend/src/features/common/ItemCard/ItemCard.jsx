import { Button, Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ShareRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../../Profile/profileSlice';
import { useEffect } from 'react';

dayjs.extend(relativeTime);

export default function ItemCard({ selectedItem, isViewingCategory = false }) {
  const dispatch = useDispatch();

  const { favItems = [] } = useSelector((state) => state.profile);

  const isFavourite = favItems.some(
    (v) => v.category_id === selectedItem.id || v.maintenance_plan_id === selectedItem.id
  );

  const handleFavItem = (_, selectedID, isFavourite) => {
    let draftFavItem = {};
    if (isViewingCategory) {
      draftFavItem = { category_id: selectedID };
    } else {
      draftFavItem = { maintenance_plan_id: selectedID };
    }

    if (isFavourite) {
      // toggle fav off if exists
      const currentItems = favItems.filter((v) => v.category_id === selectedID || v.maintenance_plan_id === selectedID);
      // eslint-disable-next-line no-unused-vars
      const currentItem = currentItems.find((v) => true);
      dispatch(profileActions.removeFavItem(currentItem?.id));
    } else {
      dispatch(profileActions.saveFavItem(draftFavItem));
    }
  };

  useEffect(() => {
    dispatch(profileActions.getFavItems({ limit: 1000 }));
  }, []);

  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="flex-start">
          <IconButton size="small" onClick={(ev) => handleFavItem(ev, selectedItem.id, isFavourite)}>
            <FavoriteIcon fontSize="small" sx={{ color: isFavourite ? selectedItem.color : 'secondary.main' }} />
          </IconButton>
          <Typography gutterBottom variant="h5" component="div">
            {selectedItem.name}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {selectedItem.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}
      >
        <Typography variant="caption">Last updated {dayjs(selectedItem?.updated_at).fromNow()}</Typography>
        <Stack direction="row" alignItems="center">
          <Button size="small" endIcon={<ShareRounded />}>
            Share
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
