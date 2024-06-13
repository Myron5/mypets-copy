import ArrowLeftBtn from 'components/Buttons/ArrowLeftBtn/ArrowLeftBtn';
import PawPrintBtn from 'components/Buttons/PawPrintBtn/PawPrintBtn';
import { petCategory } from 'constants/petCategory';
import { Field, Form, Formik } from 'formik';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './steps.module.css';


const ChooseOption = ({ data, next }) => {
const location = useLocation();
const backLinkLocationRef = useRef(location.state?.from ?? '/');

  const handleSubmit = (values, helpers) => {
    next(values);
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form className={css.radioForm}>
          <div
            className={css.radioWrap}
            role="group"
            aria-labelledby="my-radio-group"
          >
            {petCategory.map(category => {
              const uniqueId = `category-${category}`;
              return (
                <div key={category}>
                  <Field
                    className="visually-hidden"
                    type="radio"
                    name="category"
                    value={category}
                    id={uniqueId}
                  />
                  <label htmlFor={uniqueId} className={css.btn} key={category}>
                    {category}
                  </label>
                </div>
              );
            })}
          </div>
          <div className={css.btnWrapper}>
            <PawPrintBtn title="Next" type="submit" />
            <Link to={backLinkLocationRef.current}>
              <ArrowLeftBtn title="Сancel" type="button" />
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChooseOption;
