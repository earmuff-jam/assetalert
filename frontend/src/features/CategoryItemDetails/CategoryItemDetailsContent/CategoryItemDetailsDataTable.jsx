import { Paper } from '@mui/material';
import { AddRounded, RemoveRounded } from '@mui/icons-material';

import RowHeader from '../../../common/RowHeader';
import { pluralizeWord } from '../../../common/utils';
import { VIEW_INVENTORY_LIST_HEADERS } from '../../Assets/constants';
import TableComponent from '../../../common/DataTable/CustomTableComponent/TableComponent';

export default function CategoryItemDetailsDataTable({
  rowSelected,
  setRowSelected,
  itemsInCategory,
  handleOpenModal,
  handleRemoveAssociation,
}) {
  const handleRowSelection = (_, id) => {
    if (id === 'all') {
      if (rowSelected.length !== 0) {
        setRowSelected([]);
      } else {
        setRowSelected(itemsInCategory.map((v) => v.id));
      }
    } else {
      const selectedIndex = rowSelected.indexOf(id);
      let draftSelected = [];
      if (selectedIndex === -1) {
        draftSelected = draftSelected.concat(rowSelected, id);
      } else if (selectedIndex === 0) {
        draftSelected = draftSelected.concat(rowSelected.slice(1));
      } else if (selectedIndex === rowSelected.length - 1) {
        draftSelected = draftSelected.concat(rowSelected.slice(0, -1));
      } else if (selectedIndex > 0) {
        draftSelected = draftSelected.concat(rowSelected.slice(0, selectedIndex), rowSelected.slice(selectedIndex + 1));
      }
      setRowSelected(draftSelected);
    }
  };

  const rowFormatter = (row, columnName, columnData) => {
    if (columnData.modifier) {
      return columnData.modifier(row[columnName] || '-');
    } else {
      return row[columnName] || '-';
    }
  };

  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <RowHeader
        title="Items"
        caption={`Total ${pluralizeWord('item', itemsInCategory?.length || 0)}`}
        primaryButtonTextLabel="Add"
        primaryStartIcon={<AddRounded />}
        handleClickPrimaryButton={handleOpenModal}
        secondaryButtonTextLabel="Remove"
        secondaryStartIcon={<RemoveRounded color="error" />}
        handleClickSecondaryButton={handleRemoveAssociation}
        secondaryButtonDisabled={rowSelected.length <= 0}
      />
      <TableComponent
        showActions={false}
        data={itemsInCategory}
        columns={Object.values(VIEW_INVENTORY_LIST_HEADERS).filter((v) => v.displayConcise)}
        rowFormatter={rowFormatter}
        rowSelected={rowSelected}
        handleRowSelection={handleRowSelection}
        emptyComponentSubtext="Associate assets."
      />
    </Paper>
  );
}
