import { useEffect, useState } from 'react';
import InventoryListDetails from './InventoryListDetails';
import { useDispatch } from 'react-redux';
import { profileActions } from '../Profile/profileSlice';
import { RetrieveClientLocation } from '../common/utils';

export default function InventoryList() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({ lat: 0, long: 0 });

  console.debug(location); // todo remove this later

  useEffect(() => {
    dispatch(profileActions.getAllInventoriesForUser());
    const clientLocationCoordinates = RetrieveClientLocation();
    setLocation(clientLocationCoordinates);
  }, []);

  return <InventoryListDetails />;
}
