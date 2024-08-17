import { useEffect } from 'react';
import InventoryListDetails from './InventoryListDetails';
import { useDispatch } from 'react-redux';
import { inventoryActions } from './inventorySlice';

export default function InventoryList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inventoryActions.getAllInventoriesForUser());
  }, []);

  return <InventoryListDetails />;
}
