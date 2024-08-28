/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { enqueueSnackbar } from 'notistack';
import Title from '../DialogComponent/Title';
import List from '../DrawerListComponent/List';
import EasyEdit, { Types } from 'react-easy-edit';
import React, { useEffect, useState } from 'react';
import AddInventoryDetail from './AddInventoryDetail';
import { useDispatch, useSelector } from 'react-redux';
import UploadData from '../DrawerListComponent/UploadData';
import ViewSharedInventories from './ViewSharedInventories';
import TextComponent from '../TextFieldComponent/TextComponent';
import { eventActions } from '../../Containers/Event/eventSlice';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { profileActions } from '../../features/Profile/profileSlice';
import { AddRounded, CancelRounded, DoneRounded } from '@mui/icons-material';
import { INVENTORY_TABS, VIEW_PERSONAL_INVENTORY_LIST_HEADERS } from './constants';
import { Box, Dialog, Slide, Tab, Tabs, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SelectedRowItemComponent from '../../features/InventoryList/SelectedRowItemComponent';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textIconContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  emptyGap: {
    flexGrow: 1,
  },
  headingText: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    color: theme.palette.text.secondary,
  },
  buttonContainer: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: theme.spacing(1.2),
  },
  rightAlignPaper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Inventories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // open the bulk upload
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const [value, setValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [displayMoreItems, setDisplayMoreItems] = useState(false);
  const [uploadedFileInJson, setUploadedFileInJson] = useState([]);

  const USER_ID = localStorage.getItem('userID');
  const { loading, inventories } = useSelector((state) => state.profile);

  // for header purpose
  const columns = Object.keys(displayData.length > 0 && displayData[0]);
  const unwantedHeaderValues = [
    'id',
    'is_transfer_allocated',
    'associated_event_id',
    'associated_event_title',
    'storage_location_id',
    'price',
    'is_returnable',
    'return_location',
    'barcode',
    'sku',
    'max_weight',
    'min_weight',
    'max_height',
    'min_height',
    'created_at',
    'created_by',
    'bought_at',
  ];
  const filteredCols = columns.filter((v) => !unwantedHeaderValues.includes(v));

  const filteredItems = displayData?.map((item) => {
    const {
      associated_event_id,
      storage_location_id,
      created_by,
      creator_name,
      updated_by,
      is_resolved,
      is_returnable,
      return_location,
      price,
      max_weight,
      min_weight,
      max_height,
      min_height,
      ...rest
    } = item;
    return rest;
  });

  const handleEditMode = () => {
    setEditMode(!editMode);
    dispatch(eventActions.getStorageLocations());
  };

  const handleRowSelection = (_, id) => {
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
  };

  const handleDisplayMoreDetails = (event, id) => {
    if (rowSelected.length > 0) {
      // if selected > 1 row, throw error
      resetSelection();
      enqueueSnackbar('Unable to display more details for multiple rows.', {
        variant: 'error',
      });
      return;
    }
    handleRowSelection(event, id);
    const selectedRow = inventories.filter((v) => v.id === id).find(() => true);
    setSelectedRow(selectedRow);
    setDisplayMoreItems(!displayMoreItems);
  };

  const resetSelection = () => {
    setDisplayMoreItems(false);
    setRowSelected([]);
  };

  const handleMenuClick = () => {
    setOpenMenu(true);
    dispatch(profileActions.retrieveEventsSharedWithSelectProfile());
  };

  const handleMenuClose = () => {
    setOpenMenu(null);
    resetSelection();
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
    const selectionMenu = {
      1: 'COUPONS',
      2: 'DRAFT',
      3: 'HIDDEN',
    };
    const currentSelectedCriteria = selectionMenu[newValue];
    const formattedData =
      (currentSelectedCriteria && inventories.filter((v) => v.status === currentSelectedCriteria)) || inventories;
    setDisplayData([...formattedData]);
  };

  const removeSelectedItems = (selectedRows) => {
    dispatch(profileActions.removeInventoryRows(selectedRows));
  };

  const save = (value, rowIndex, column) => {
    const row = inventories.filter((_, index) => index === rowIndex).find(() => true);
    const { id } = row;
    dispatch(profileActions.updateInventory({ id, userID: USER_ID, value, column, updated_by: USER_ID }));
  };

  const columnHeaderFormatter = (column) => {
    const header = VIEW_PERSONAL_INVENTORY_LIST_HEADERS[column];
    return header?.label;
  };

  const rowFormatter = (row, column, rowIndex) => {
    const isItemDisabled = row.is_transfer_allocated;
    const inputColumns = ['quantity', 'name', 'description'];

    if (['created_at', 'updated_at'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }

    if (!isItemDisabled && column === 'status') {
      return (
        <EasyEdit
          type="select"
          options={[
            { label: 'All products', value: 'ALL' },
            { label: 'Coupons/deals products', value: 'DEALS' },
            { label: 'Draft products', value: 'DRAFT' },
            { label: 'Hidden products', value: 'HIDDEN' },
          ]}
          onSave={(value) => {
            save(value, rowIndex, VIEW_PERSONAL_INVENTORY_LIST_HEADERS[column].colName);
          }}
          onCancel={(o) => o}
          placeholder={row[column].toString()}
          saveButtonLabel={<DoneRounded />}
          cancelButtonLabel={<CancelRounded />}
          attributes={{ name: 'awesome-input', id: 1 }}
          instructions={`Currently editing ${column}`}
        />
      );
    }

    if (!isItemDisabled && inputColumns.includes(column)) {
      return (
        <EasyEdit
          type={Types.TEXT}
          onSave={(value) => {
            save(value, rowIndex, VIEW_PERSONAL_INVENTORY_LIST_HEADERS[column].colName);
          }}
          onCancel={(o) => o}
          placeholder={row[column].toString()}
          saveButtonLabel={<DoneRounded />}
          cancelButtonLabel={<CancelRounded />}
          attributes={{ name: 'awesome-input', id: 1 }}
          instructions={`Currently editing ${column}`}
        />
      );
    }

    // remove unwanted items from cluttering the display
    const { associated_event_title, ...rest } = row;
    return <span>{rest[column]}</span>;
  };

  const handleTemplateDownload = () => {
    const templatedData = [
      {
        name: '',
        description: '',
        price: '',
        barcode: '',
        sku: '',
        quantity: '',
        location: '',
        bought_at: '',
      },
    ];
    const ws = XLSX.utils.json_to_sheet(templatedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'inventories');
    XLSX.writeFile(wb, 'inventory-template.xlsx');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const formattedArr = XLSX.utils.sheet_to_json(worksheet, { rawNumbers: false });
        setUploadedFileInJson(formattedArr);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const resetData = () => {
    setOpen(false);
    setUploadedFileInJson(null);
  };

  const submitExcel = () => {
    if (Array.isArray(uploadedFileInJson) && uploadedFileInJson.length > 0) {
      dispatch(profileActions.addBulkInventory(Object.values(uploadedFileInJson)));
    }
    resetData();
  };

  const displaySelection = (value) => {
    switch (value) {
      case 0:
        return (
          <List
            key={performance.now()}
            open={open}
            tooltipTitle={'Download all items'}
            fileName={'inventories.xlsx'}
            sheetName={'All Inventories'}
            data={displayData}
            columns={filteredCols}
            filteredData={filteredItems}
            columnHeaderFormatter={columnHeaderFormatter}
            rowFormatter={rowFormatter}
            removeSelectedItems={removeSelectedItems}
            displayDeleteRowIcon={true}
            handleMenuClick={handleMenuClick}
            rowSelected={rowSelected}
            handleRowSelection={handleRowSelection}
            displayShareIcon={true}
            handleDisplayMoreDetails={handleDisplayMoreDetails}
            isInventoryPage={true}
          />
        );
      case 1:
        return (
          <List
            key={performance.now()}
            open={open}
            tooltipTitle={'Download all items with coupons '}
            fileName={'inventories.xlsx'}
            sheetName={'Coupons'}
            data={displayData}
            columns={filteredCols}
            filteredData={filteredItems}
            columnHeaderFormatter={columnHeaderFormatter}
            rowFormatter={rowFormatter}
            removeSelectedItems={removeSelectedItems}
            handleMenuClick={handleMenuClick}
            rowSelected={rowSelected}
            handleRowSelection={handleRowSelection}
            handleDisplayMoreDetails={handleDisplayMoreDetails}
            isInventoryPage={true}
          />
        );
      case 2:
        return (
          <List
            key={performance.now()}
            open={open}
            tooltipTitle={'Download all items with draft status '}
            fileName={'inventories.xlsx'}
            sheetName={'Draft Status'}
            data={displayData}
            columns={filteredCols}
            filteredData={filteredItems}
            columnHeaderFormatter={columnHeaderFormatter}
            rowFormatter={rowFormatter}
            removeSelectedItems={removeSelectedItems}
            handleMenuClick={handleMenuClick}
            rowSelected={rowSelected}
            handleRowSelection={handleRowSelection}
            isInventoryPage={true}
          />
        );
      case 3:
        return (
          <List
            key={performance.now()}
            open={open}
            tooltipTitle={'Download all inventories with hidden status '}
            fileName={'inventories.xlsx'}
            sheetName={'Hidden Inventories'}
            data={displayData}
            columns={filteredCols}
            filteredData={filteredItems}
            rowFormatter={rowFormatter}
            handleMenuClick={handleMenuClick}
            removeSelectedItems={removeSelectedItems}
            columnHeaderFormatter={columnHeaderFormatter}
            rowSelected={rowSelected}
            handleRowSelection={handleRowSelection}
            handleDisplayMoreDetails={handleDisplayMoreDetails}
            isInventoryPage={true}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (Array.isArray(inventories)) {
      setDisplayData(inventories);
    }
  }, [loading]);

  useEffect(() => {
    dispatch(profileActions.getAllInventoriesForUser());
  }, []);

  return (
    <Box>
      <Box className={classes.rowContainer}>
        <TextComponent value={'Inventories'} gutterBottom={true} loading={false} textStyle={classes.headingText} />
        <Box className={classes.emptyGap}></Box>
        <ButtonComponent
          buttonVariant={'text'}
          icon={<AddRounded />}
          showIcon={true}
          text={'Add new item'}
          onClick={handleEditMode}
        />
        {open ? (
          <UploadData
            buttonCancelText={'cancel'}
            buttonSubmitText={'submit'}
            onChange={handleFileChange}
            onSubmitClick={submitExcel}
            onCancelClick={resetData}
            cancelButtonStyles={classes.buttonContainer}
            submitButtonStyles={classes.buttonContainer}
            displaySecondaryText={true}
            secondaryText={'Uploading excel data must contain required headers'}
            disableTemplateDownload={false}
            onDownloadTemplate={handleTemplateDownload}
            templateDownloadStyles={classes.buttonContainer}
            templateDownloadText={'Template'}
          />
        ) : (
          // only display download button under all inventories
          value == 0 && (
            <ButtonComponent
              buttonVariant={'text'}
              icon={<AddRounded />}
              showIcon={true}
              text={'Add item in bulk'}
              onClick={setOpen}
            />
          )
        )}
      </Box>
      {editMode ? (
        <Dialog open width={'md'} fullWidth={true}>
          <Title onClose={() => setEditMode(false)}>Add New Item</Title>
          <AddInventoryDetail setDisplayMode={setEditMode} />
        </Dialog>
      ) : null}
      {openMenu ? (
        <Dialog open width={'md'} fullWidth={true}>
          <Title onClose={handleMenuClose}>Share items with Events</Title>
          <ViewSharedInventories rowSelected={rowSelected} handleMenuClose={handleMenuClose} />
        </Dialog>
      ) : null}
      <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
        {INVENTORY_TABS.map((v, index) => (
          <Tooltip title={v.tootipTitle} key={index}>
            <Tab
              label={
                <span className={classes.textIconContainer}>
                  {v.icon} {v.label}
                </span>
              }
            />
          </Tooltip>
        ))}
      </Tabs>
      {displaySelection(value)}
      {displayMoreItems && (
        <Dialog
          open
          TransitionComponent={Transition}
          keepMounted
          onClose={resetSelection}
          aria-labelledby="simple-dialog-title"
          scroll="paper"
          classes={{
            scrollPaper: classes.rightAlignPaper,
          }}
        >
          <Title onClose={resetSelection}>More Details</Title>
          <SelectedRowItemComponent
            selectedRow={selectedRow}
            columns={Object.values(VIEW_PERSONAL_INVENTORY_LIST_HEADERS)}
          />
        </Dialog>
      )}
    </Box>
  );
};

export default Inventories;
