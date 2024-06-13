import ArrowLeftBtn from 'components/Buttons/ArrowLeftBtn/ArrowLeftBtn';
import PawPrintBtn from 'components/Buttons/PawPrintBtn/PawPrintBtn';
import { petCategory } from 'constants/petCategory';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { stepTwoValidationSchema } from './addFormValidation';
import css from './steps.module.css';
import TextField from './TextFielf';


const PersonalDetails = ({ data, next, prev }) => {
  const handleSubmit = values => {
    next(values);
  };


  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={stepTwoValidationSchema}
    >
      {({ values }) => (
        <Form className={css.wrapper}>
          {values.category !== petCategory[0] && (
            <div className={css.inptWrapper}>
              <label className={css.lable} htmlFor="title">
                Title of add
              </label>
              <TextField
                placeholder="Title of add"
                name="title"
                id="title"
                type="text"
              />
            </div>
          )}

          <div className={css.inptWrapper}>
            <label className={css.lable} htmlFor="name">
              Pet’s name
            </label>
            <TextField
              placeholder="Type name pet"
              name="name"
              id="name"
              type="text"
            />
          </div>
          <div className={css.inptWrapper}>
            <label className={css.lable} htmlFor="date">
              Date of birth
            </label>
            <Field
              className={css.input}
              name="date"
              type="date"
              placeholder="Type date of birth"
            />
            <ErrorMessage className={css.error} name="date" component="div" />
          </div>
          <div className={css.inptWrapper}>
            <label className={css.lable} htmlFor="typePet">
              Type
            </label>
            <TextField
              placeholder="Type of pet"
              name="typePet"
              id="typePet"
              type="text"
            />
          </div>
          <div className={css.btnWrapper}>
            <PawPrintBtn title="Next" type="submit" />
            <ArrowLeftBtn
              title="Back"
              type="button"
              handleBackClick={()=>prev(values)}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalDetails;
