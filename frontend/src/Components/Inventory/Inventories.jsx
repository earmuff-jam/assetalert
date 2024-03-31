import { Box, Dialog, Tab, Tabs, Tooltip, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TextComponent from '../../stories/TextComponent/TextComponent';
import { AddRounded, CancelRounded, DoneRounded } from '@material-ui/icons';
import ButtonComponent from '../../stories/Button/ButtonComponent';
import EasyEdit, { Types } from 'react-easy-edit';
import {
  ADD_ITEM_PROFILE_FORM,
  ADD_NEW_INVENTORY_SUBTITLE_TEXT,
  INVENTORY_TABS,
  VIEW_PERSONAL_INVENTORY_COLUMNS,
} from './constants';
import Title from '../DialogComponent/Title';
import AddItemDetail from '../ItemDetail/AddItemDetail';
import List from '../DrawerListComponent/List';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';
import { profileActions } from '../../Containers/Profile/profileSlice';

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
  text: {
    fontSize: '1.125rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const Inventories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  const { loading: inventoriesLoading, inventories } = useSelector((state) => state.profile);

  const handleEditMode = () => {
    setEditMode(!editMode);
    dispatch(eventActions.getStorageLocations());
  };

  const handleChange = (event, newValue) => {
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

  const filteredItems = displayData?.map((item) => {
    const { id, eventID, storage_location_id, created_by, updated_by, ...rest } = item;
    return rest;
  });

  const rowFormatter = (row, column, rowIndex) => {
    // if any of the row includes timestamp we modify it
    if (['created_at', 'updated_at'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }
    const inputColumns = ['bought_at', 'price', 'status', 'quantity', 'name', 'description'];
    if (inputColumns.includes(column)) {
      return (
        <EasyEdit
          type={Types.TEXT}
          onSave={(value) => {
            // the column.key is the db column name
            save(value, rowIndex, VIEW_ITEMS_COLUMN_HEADERS[column].key);
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
    return row[column];
  };

  const displaySelection = (value, data) => {
    const tableOptions = {
      filterType: 'checkbox',
      elevation: 0,
      // customRowRender: rowFormatter
    };

    switch (value) {
      case 0:
        return (
          <List
            key={performance.now()}
            tableTitle={'All Products'}
            tooltipTitle={'Download all items '}
            fileName={'inventories.xlsx'}
            sheetName={'All Inventories'}
            data={displayData}
            columns={VIEW_PERSONAL_INVENTORY_COLUMNS}
            filteredData={filteredItems}
            tableOptions={tableOptions}
          />
        );
      case 1:
        return (
          <List
            key={performance.now()}
            tableTitle={'Coupons / Deals'}
            tooltipTitle={'Download all items with coupons '}
            fileName={'inventories.xlsx'}
            sheetName={'Coupons'}
            data={displayData}
            columns={VIEW_PERSONAL_INVENTORY_COLUMNS}
            filteredData={filteredItems}
            rowFormatter={rowFormatter}
          />
        );
      case 2:
        return (
          <List
            key={performance.now()}
            tableTitle={'Draft'}
            fileName={'inventories.xlsx'}
            sheetName={'Draft Status'}
            data={displayData}
            columns={VIEW_PERSONAL_INVENTORY_COLUMNS}
            filteredData={filteredItems}
          />
        );
      case 3:
        return (
          <List
            key={performance.now()}
            tableTitle={'Hidden'}
            tooltipTitle={'Download all inventories with hidden status '}
            fileName={'inventories.xlsx'}
            sheetName={'Hidden Inventories'}
            data={displayData}
            columns={VIEW_PERSONAL_INVENTORY_COLUMNS}
            filteredData={filteredItems}
            rowFormatter={rowFormatter}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(profileActions.getAllInventoriesForUser());
  }, []);

  useEffect(() => {
    if (Array.isArray(inventories)) {
      setDisplayData(inventories);
    }
  }, [inventoriesLoading]);

  return (
    <Box>
      <Box className={classes.rowContainer}>
        <TextComponent value={'Inventories'} gutterBottom={true} loading={false} textStyle={classes.text} />
        <Box className={classes.emptyGap}></Box>
        <ButtonComponent
          buttonVariant={'text'}
          icon={<AddRounded />}
          showIcon={true}
          text={'Add new item'}
          onClick={handleEditMode}
        />
      </Box>
      {editMode && (
        <Dialog open width={'md'} fullWidth={true}>
          <Title onClose={() => setEditMode(false)}>Add New Item</Title>
          <AddItemDetail
            setDisplayMode={setEditMode}
            draftFormFields={ADD_ITEM_PROFILE_FORM}
            subtitleText={ADD_NEW_INVENTORY_SUBTITLE_TEXT}
          />
        </Dialog>
      )}
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
    </Box>
  );
};

export default Inventories;
