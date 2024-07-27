import { Box, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { BLANK_CATEGORY_DETAILS, BLANK_CATEGORY_DETAILS_ERROR, BLANK_CATEGORY_DETAILS_TOUCHED } from './constants';
import ColorPicker from '../common/ColorPicker';

const AddCategory = ({ handleCloseAddCategory }) => {

  const [planColor, setPlanColor] = useState('#fff');
  const [categoryDetails, setCategoryDetails] = useState({
    ...BLANK_CATEGORY_DETAILS,
  });
  const [categoryDetailsError, setCategoryDetailsError] = useState({
    ...BLANK_CATEGORY_DETAILS_ERROR,
  });

  const [categoryDetailsTouched, setCategoryDetailsTouched] = useState({
    ...BLANK_CATEGORY_DETAILS_TOUCHED,
  });

  const handleColorChange = (newValue) => {
    setPlanColor(newValue);
  };
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    const draftErrorElements = { ...categoryDetailsError };
    let errorFound = false;

    for (const validator of draftErrorElements[id].validators) {
      if (validator.validate(value)) {
        draftErrorElements[id] = {
          ...draftErrorElements[id],
          errorMsg: validator.message,
        };
        errorFound = true;
        break;
      }
    }

    if (!errorFound) {
      draftErrorElements[id] = {
        ...draftErrorElements[id],
        errorMsg: '',
      };
    }

    setCategoryDetailsError(draftErrorElements);
    setCategoryDetailsTouched({ ...categoryDetailsTouched, [id]: true });
    setCategoryDetails({ ...categoryDetails, [id]: value });
  };

  const handleSubmit = () => {
    if (
      Object.values(categoryDetailsTouched).filter(Boolean).length != 2 ||
      Object.values(categoryDetailsError).some((v) => v.errorMsg.length > 0)
    ) {
      return (
        <Snackbar
          autoHideDuration={6000}
          color="error"
          message={`Error updating category ${categoryDetails.category_name}`}
        />
      );
    }

    // const draftRequest = {
    //   ...categoryDetails,
    //   is_deleteable: true,
    //   color: planColor,
    //   created_by: user.id,
    //   created_on: dayjs(),
    //   sharable_groups: [user.id],
    // };

    // api request
    // createCategory.mutate(draftRequest); 
    setCategoryDetails({ ...BLANK_CATEGORY_DETAILS });
    setCategoryDetailsTouched({ ...BLANK_CATEGORY_DETAILS_TOUCHED });
    setPlanColor('#fff');
    handleCloseAddCategory();
  };

  return (
    <Stack>
      <Stack paddingBottom="2rem">
        <Typography> Fill in the necessary details</Typography>
        <Typography variant="caption">Add new category.</Typography>
      </Stack>
      <Stack alignItems="center">
        <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
          <Stack spacing={2} useFlexGap>
            <TextField
              id="category_name"
              label="Category name"
              value={categoryDetails.name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(categoryDetailsError.category_name['errorMsg'].length)}
              helperText={categoryDetailsError.category_name['errorMsg']}
            />
            <TextField
              id="category_description"
              label="Category description"
              placeholder="Description of category in less than 500 words"
              value={categoryDetails.category_description}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              multiline
              maxRows={4}
              rows={4}
              error={Boolean(categoryDetailsError.category_description['errorMsg'].length)}
              helperText={categoryDetailsError.category_description['errorMsg']}
            />
            <ColorPicker value={planColor} handleChange={handleColorChange} />
          </Stack>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            sx={{ mt: 1 }}
            disabled={
              Object.values(categoryDetailsTouched).filter(Boolean).length != 2 ||
              Object.values(categoryDetailsError).some((v) => v.errorMsg.length > 0)
            }
          >
            Create new category
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AddCategory;
