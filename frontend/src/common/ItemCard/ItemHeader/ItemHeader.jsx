import RowHeader from '@common/RowHeader';
import DetailsCard from '@common/ItemCard/DetailsCard';

export default function ItemHeader({ categoryMode = false, label, caption, item, image }) {
  return (
    <>
      <RowHeader title={label} caption={caption} />
      <DetailsCard selectedItem={item} selectedImage={image} categoryMode={categoryMode} />
    </>
  );
}