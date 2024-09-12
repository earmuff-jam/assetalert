import { useState } from 'react';
import SecurityQuestionAnswerForm from './SecurityQuestionAnswerForm';
import UserValidationForm from './UserValidationForm';

export default function PwdReset({ handleCloseModal }) {

  const [step, setStep] = useState(0);

  const increaseStepCount = () => setStep(step + 1);

  const loadComponent = (step, increaseStepCount) => {
    switch (step) {
      case 0:
        return <UserValidationForm increaseStepCount={increaseStepCount} />;
      case 1:
        return <SecurityQuestionAnswerForm handleCloseModal={handleCloseModal} />;
      default:
        break;
    }
  };

  return <>{loadComponent(step, increaseStepCount)}</>;
}
