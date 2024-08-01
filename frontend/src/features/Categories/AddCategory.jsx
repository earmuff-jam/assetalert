import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { ADD_CATEGORY_FORM_FIELDS } from './constants';
import ColorPicker from '../common/ColorPicker';
import { useDispatch } from 'react-redux';
import { categoryActions } from './categoriesSlice';
import { AddRounded, CheckCircleRounded } from '@mui/icons-material';

const AddCategory = ({ categories, loading, handleCloseAddCategory, selectedCategoryID, setSelectedCategoryID }) => {
  const dispatch = useDispatch();
  const [planColor, setPlanColor] = useState('#fff');
  const [formFields, setFormFields] = useState(ADD_CATEGORY_FORM_FIELDS);

  const handleInput = (event) => {
    const { name, value } = event.target;
    const updatedFormFields = Object.assign({}, formFields, {
      [name]: {
        ...formFields[name],
        value: value,
        errorMsg: '',
      },
    });

    for (const validator of updatedFormFields[name].validators) {
      if (validator.validate(value)) {
        updatedFormFields[name].errorMsg = validator.message;
        break;
      }
    }
    setFormFields(updatedFormFields);
  };

  const handleColorChange = (newValue) => {
    setPlanColor(newValue);
  };

  const submit = () => {
    const containsErr = Object.values(formFields).some((el) => el.errorMsg);
    const userID = localStorage.getItem('userID');
    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    if (containsErr || isRequiredFieldsEmpty) {
      enqueueSnackbar('Cannot add new category.', {
        variant: 'error',
      });
      return;
    }

    const formattedData = Object.values(formFields).reduce((acc, el) => {
      if (el.value) {
        acc[el.name] = el.value;
      }
      return acc;
    }, {});

    // seperated to prevent updating sharable groups
    if (selectedCategoryID) {
      const draftCategories = {
        id: selectedCategoryID,
        ...formattedData,
        color: planColor,
        updated_by: userID,
      };
      dispatch(categoryActions.updateCategory(draftCategories));
    } else {
      const draftCategories = {
        ...formattedData,
        color: planColor,
        created_by: userID,
        updated_by: userID,
        sharable_groups: [userID],
      };
      dispatch(categoryActions.createCategory(draftCategories));
    }

    setSelectedCategoryID(null);
    setFormFields(ADD_CATEGORY_FORM_FIELDS);
    setPlanColor('#fff');
    handleCloseAddCategory();
  };

  useEffect(() => {
    if (!loading && selectedCategoryID !== null) {
      const draftCategory = categories.filter((v) => v.id === selectedCategoryID).find(() => true);
      const updatedFormFields = Object.assign({}, formFields, {
        name: {
          ...formFields.name,
          value: draftCategory?.name || '',
        },
        description: {
          ...formFields.description,
          value: draftCategory?.description || '',
        },
      });
      setFormFields(updatedFormFields);
      setPlanColor(draftCategory.color);
    } else {
      setFormFields(ADD_CATEGORY_FORM_FIELDS);
      setPlanColor('#fff');
    }
  }, [selectedCategoryID]);

  return (
    <Stack>
      <Stack paddingBottom="2rem">
        <Typography> Fill in the necessary details</Typography>
        <Typography variant="caption">Add new category.</Typography>
      </Stack>
      <Stack alignItems="center">
        <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
          <Stack spacing={2} useFlexGap>
            {Object.values(formFields).map((v, index) => (
              <TextField
                key={index}
                id={v.name}
                name={v.name}
                label={v.label}
                value={v.value}
                placeholder={v.placeholder}
                onChange={handleInput}
                required={v.required}
                fullWidth={v.fullWidth}
                error={!!v.errorMsg}
                helperText={v.errorMsg}
                variant={v.variant}
                minRows={v.rows || 4}
                multiline={v.multiline || false}
              />
            ))}
            <ColorPicker value={planColor} handleChange={handleColorChange} />
          </Stack>
          <Button
            onClick={submit}
            startIcon={selectedCategoryID ? <CheckCircleRounded /> : <AddRounded />}
            sx={{ alignSelf: 'flex-start' }}
          >
            {selectedCategoryID ? 'Edit Category' : 'Add Category'}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AddCategory;
