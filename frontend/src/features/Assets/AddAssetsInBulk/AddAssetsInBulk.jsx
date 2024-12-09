import AddAssetsInBulkHeader from '@features/Assets/AddAssetsInBulk/AddAssetsInBulkHeader';
import AddAssetsInBulkContent from '@features/Assets/AddAssetsInBulk/AddAssetsInBulkContent';

export default function AddAssetsInBulk({ handleClose }) {
  return (
    <>
      <AddAssetsInBulkHeader />
      <AddAssetsInBulkContent handleClose={handleClose} />
    </>
  );
}
