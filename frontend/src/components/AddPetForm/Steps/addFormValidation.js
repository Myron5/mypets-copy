import * as Yup from 'yup';

const petCategory = ['your pet', 'sell', 'lost/found', 'in good hands'];
const sexValues = ['male', 'female'];
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const stepOneValidationSchema = Yup.object().shape({
  category: Yup.string()
    .required('Category is required')
    .oneOf(petCategory, 'Invalid category selected'),
  first_name: Yup.string().required('first_name is required'),
  last_name: Yup.string().required('last_name is required'),
});

export const stepTwoValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4)
    .max(32)
    .test(
      'titleRequired',
      'Title is required for this category',
      function (value) {
        if (petCategory.includes(this.parent.category)) {
          return this.parent.category !== 'your pet' ? !!value : true;
        }
        return true;
      }
    ),
  name: Yup.string()
    .min(2, '2 symbols minimum')
    .max(16, '16 symbols maximum')
    .required('Pet name is required'),
  date: Yup.date().required('Birth date is required').nullable().max(new Date(), 'Birth date cannot be later than the current date'),
  typePet: Yup.string().required('Type is required'),
});

export const stepThreeValidationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required('File is required.')
    .test(
      'fileSize',
      'File size must be less than 3MB.',
      value => !value || (value && value.size <= 3 * 1024 * 1024)
    )
    .test(
      'FILE_FORMAT',
      'Uplouded file has unsupported format',
      value => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
  sex: Yup.string().test('sexRequired', 'Sex is required.', function (value) {
    if (
      petCategory.includes(this.parent.category) &&
      this.parent.category !== 'your pet'
    ) {
      return sexValues.includes(value);
    }
    return true;
  }),
  location: Yup.string().test(
    'locationRequired',
    'Location is required.',
    function (value) {
      if (petCategory.includes(this.parent.category)) {
        return this.parent.category !== 'your pet' ? !!value : true;
      }
      return true;
    }
  ),
  price: Yup.number().test(
    'priceRequired',
    'Price is required and must be greater than 0 for sell category.',
    function (value) {
      if (this.parent.category === 'sell') {
        return value > 0;
      }
      return true;
    }
  ),
  comments: Yup.string()
    .max(120, 'Comments cannot exceed 120 characters.')
    .required('Comments is required'),
});
