import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
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
      <Container maxWidth="xl">
        <HeaderWithButton
          title="Maintenance Plans"
          primaryButtonTextLabel="Add Plan"
          primaryStartIcon={<AddRounded />}
          handleClickPrimaryButton={handleAddNewPlan}
          secondaryTitle="Assign items to maintenance plan(s) to keep them up to date."
        />
        <PlanList
          maintenancePlan={maintenancePlan}
          loading={loading}
          setDisplayModal={setDisplayModal}
          setSelectedMaintenancePlanID={setSelectedMaintenancePlanID}
        />
      </Container>
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
