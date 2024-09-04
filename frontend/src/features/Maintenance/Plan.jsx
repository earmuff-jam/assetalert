import { useState } from 'react';
import { AddRounded, FileDownload, FilterAltRounded, SortRounded } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';
import AddPlan from './AddPlan';
import PlanList from './PlanList';
import HeaderWithButton from '../common/HeaderWithButton';
import SimpleModal from '../common/SimpleModal';
import { useSelector } from 'react-redux';

const Plan = () => {
  const { maintenancePlan, loading } = useSelector((state) => state.maintenance);

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedMaintenancePlanID, setSelectedMaintenancePlanID] = useState('');

  const handleAddNewPlan = () => setDisplayModal(!displayModal);
  const handleCloseAddNewPlan = () => {
    setDisplayModal(false);
    setSelectedMaintenancePlanID('');
  };

  return (
    <Box sx={{ py: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderWithButton
          title="Maintenance Plans"
          secondaryTitle="Assign items to maintenance plan(s) to keep them up to date."
        />
        <Stack direction="row" spacing="1rem">
          <Button onClick={handleAddNewPlan} startIcon={<AddRounded />} variant="outlined">
            Add Plan
          </Button>
          <IconButton size="small">
            <FileDownload fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
      <Stack sx={{ flexDirection: 'row', gap: '1rem', mb: '1rem' }}>
        <IconButton size="small">
          <FilterAltRounded fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <SortRounded fontSize="small" />
        </IconButton>
      </Stack>
      <PlanList
        maintenancePlan={maintenancePlan}
        loading={loading}
        setDisplayModal={setDisplayModal}
        setSelectedMaintenancePlanID={setSelectedMaintenancePlanID}
      />
      {displayModal && (
        <SimpleModal title="Add new maintenance plan" handleClose={handleCloseAddNewPlan} maxSize="md">
          <AddPlan
            handleCloseAddNewPlan={handleCloseAddNewPlan}
            maintenancePlan={maintenancePlan}
            selectedMaintenancePlanID={selectedMaintenancePlanID}
            setSelectedMaintenancePlanID={setSelectedMaintenancePlanID}
          />
        </SimpleModal>
      )}
    </Box>
  );
};

export default Plan;
