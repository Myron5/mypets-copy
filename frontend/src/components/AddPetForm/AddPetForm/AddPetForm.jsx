import { useEffect, useState } from 'react';
import ChooseOption from '../Steps/ChooseOption';
import FormStepper from '../FormStepper/FormStepper';
import MoreInfo from '../Steps/MoreInfo';
import PersonalDetails from '../Steps/PersonalDetails';
import css from './AddPetForm.module.css';
import { categoryObj, petCategory } from 'constants/petCategory';
import { useDispatch, useSelector } from 'react-redux';
import { addPet } from 'redux/pets/operations';
import stepsLable from 'constants/stepsLable';
import { useNavigate } from 'react-router-dom';
import {  getIsNavigate } from 'redux/pets/selectors';


import makeformData from 'service/addPetHelpers/makeformData';

const initialValues = {
  category: 'your pet',
  title: '',
  name: '',
  date: '',
  sex: '',
  file: null,
  location: '',
  price: '',
  typePet: '',
  comments: '',
};

const { MYPET } = categoryObj;

const AddPetForm = () => {
  const [data, setData] = useState(initialValues);
  const [currentStep, setCurrentStep] = useState(0);
  const dispatsh = useDispatch();
  const navigate = useNavigate();
  const isNavigate = useSelector(getIsNavigate);

  useEffect(() => {
    if (isNavigate) {
      if (data.category === MYPET.label) {
        navigate('/user');
      }
      if (data.category !== MYPET.label) {
        navigate('/notices');
      }
    }
  }, [data.category, isNavigate, navigate]);

  const handleNextStep = async (newData, final = false, actions) => {
    setData(prev => ({ ...prev, ...newData }));

    if (final) {
      const formData = makeformData(newData);
      dispatsh(addPet(formData));

      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = newData => {
    setData(prev => ({ ...prev, ...newData }));
    setCurrentStep(prev => prev - 1);
  };

  const steps = [
    <ChooseOption next={handleNextStep} data={data} />,
    <PersonalDetails next={handleNextStep} data={data} prev={handlePrevStep} />,
    <MoreInfo next={handleNextStep} data={data} prev={handlePrevStep} />,
  ];

  return (
    <>
      <section
        className={
          currentStep === 2 && data.category !== petCategory[0]
            ? css.notMyPetstepSection
            : css.section
        }
      >
        {(currentStep === 0 || data.category === petCategory[0]) && (
          <h1 className={css.title}>Add pet</h1>
        )}
        {currentStep !== 0 && data.category === petCategory[1] && (
          <h1 className={css.title}>Add pet for sale</h1>
        )}
        {currentStep !== 0 && data.category === petCategory[2] && (
          <h1 className={css.title}>Add lost pet</h1>
        )}
        {currentStep !== 0 && data.category === petCategory[3] && (
          <h1 className={css.title}>Add pet in good hands</h1>
        )}
        <FormStepper currentStep={currentStep} steps={stepsLable} />
        {steps[currentStep]}
      </section>
    </>
  );
};

export default AddPetForm;
