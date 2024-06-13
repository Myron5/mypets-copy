import React from 'react';
import css from './FormStepper.module.css';

const FormStepper = ({ currentStep, steps }) => {
  return (
    <div className={css.stepWrap}>
      {steps.map((step, index) => {
        const chooseClass = (index, currentStep) => {
          if (index < currentStep) {
            return `${css.compleated}`;
          } else if (index === currentStep) {
            return `${css.current}`;
          } else {
            return `${css.next}`;
          }
        };

        return (
          <div className={chooseClass(index, currentStep)} key={step.value}>
            {step.label}
          </div>
        );
      })}
    </div>
  );
};

export default FormStepper;
