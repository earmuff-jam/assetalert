import { Box, Container, Dialog, Tab, Tabs, Tooltip, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import TextComponent from '../../stories/TextComponent/TextComponent';
import { AddRounded, CancelRounded, DoneRounded } from '@material-ui/icons';
import ButtonComponent from '../../stories/Button/ButtonComponent';
import EasyEdit, { Types } from 'react-easy-edit';
import { INVENTORY_TABS, VIEW_PERSONAL_INVENTORY_LIST_HEADERS } from './constants';
import Title from '../DialogComponent/Title';
import AddItemDetail from '../ItemDetail/AddItemDetail';
import List from '../DrawerListComponent/List';
import dayjs from 'dayjs';

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
  const [value, setValue] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => setEditMode(!editMode);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = [
    {
      bought_at: 'Walmart',
      created_at: '2024-03-17T15:55:02.701296Z',
      created_by: '71759d26-8128-4b30-abb3-b84f63439bf3',
      creator_name: 'Native Plants',
      description: 'Large kitchen knife to slice meat for dog food',
      eventID: '0a7fec04-c07f-4545-9ec5-80abdb48f31d',
      id: '5a271435-a055-45b9-9481-97b41e5a4d05',
      location: 'Kitchen Pantry',
      name: 'Kitchen Knife',
      quantity: 1,
      storage_location_id: 'efc8e1f6-9462-492c-9ce6-821bdb591fea',
      updated_at: '2024-03-17T15:55:02.701296Z',
      updated_by: '71759d26-8128-4b30-abb3-b84f63439bf3',
      updater_name: 'Native Plants',
    },
  ];
  const columns = Object.keys(data.length > 0 && data[0]); // for header purpose
  // removing unwanted values from the display column
  const filteredItems = data?.map((item) => {
    const { id, eventID, storage_location_id, created_by, updated_by, ...rest } = item;
    return rest;
  });

  const columnHeaderFormatter = (column) => {
    const header = VIEW_PERSONAL_INVENTORY_LIST_HEADERS[column];
    // Apply a modifier function if defined
    const formattedTitle = header?.modifier ? header.modifier(header.title) : header?.displayName;
    return formattedTitle;
  };

  const rowFormatter = (row, column, rowIndex) => {
    // if any of the row includes timestamp we modify it
    if (['created_at', 'updated_at'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }
    const inputColumns = ['bought_at', 'unit_price', 'quantity', 'name', 'description'];
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

  const displaySelection = (value) => {
    switch (value) {
      case 0:
        return (
          <Container maxWidth="lg">
            <List
              tooltipTitle={'download inventory list'}
              fileName={'Personal Inventory.xlsx'}
              sheetName={'Inventory Sheet'}
              data={data}
              columns={columns}
              filteredData={filteredItems}
              columnHeaderFormatter={columnHeaderFormatter}
              rowFormatter={rowFormatter}
            />
          </Container>
        );
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      default:
        return null;
    }
  };

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
          <AddItemDetail eventID={''} userID={'userDetail.userID'} setDisplayMode={setEditMode} />
        </Dialog>
      )}
      <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
        {INVENTORY_TABS.map((v) => (
          <Tooltip title={v.tootipTitle}>
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
