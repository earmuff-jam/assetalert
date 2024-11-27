import RowHeader from '../../../common/RowHeader';
import DetailsCard from '../../../common/ItemCard/DetailsCard';

export default function CategoryItemDetailsHeader({ selectedCategory, selectedCategoryImage }) {
  return (
    <>
      <RowHeader
        title={selectedCategory?.name ? `${selectedCategory.name} Overview` : 'Category Overview'}
        caption="View details of selected category"
      />
      <DetailsCard selectedItem={selectedCategory} selectedImage={selectedCategoryImage} isViewingCategory />
    </>
  );
}
