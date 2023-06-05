import * as yup from 'yup';

export const organisationUserValidationSchema = yup.object().shape({
  organisation_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
