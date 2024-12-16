import { Stack } from '@mui/material';

import RowHeader from '@common/RowHeader';
import FilterAndSortMenu from '@common/StatusOptions/FilterAndSortMenu';
import SectionCardHeaderButton from '@common/SectionCard/SectionCardHeaderButton';

export default function SectionCardHeader({
  title,
  caption,
  primaryBtnTitle,
  toggleModal,
  selectedFilter,
  setSelectedFilter,
  sortingOrder,
  setSortingOrder,
  handleDownload,
  disableDownloadIcon,
}) {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader title={title} caption={caption} />
        <SectionCardHeaderButton
          title={primaryBtnTitle}
          handleButtonClick={toggleModal}
          handleIconButtonClick={handleDownload}
          disableDownloadIcon={disableDownloadIcon}
        />
      </Stack>
      <FilterAndSortMenu
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </>
  );
}
