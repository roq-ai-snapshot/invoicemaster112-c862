import * as yup from 'yup';
import { paymentValidationSchema } from 'validationSchema/payments';

export const invoiceValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  due_date: yup.date().required(),
  status: yup.string().required(),
  organisation_id: yup.string().nullable().required(),
  client_id: yup.string().nullable().required(),
  payment: yup.array().of(paymentValidationSchema),
});
