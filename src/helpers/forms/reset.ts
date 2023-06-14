import { object, string, ref } from 'yup'

export enum ResetFormInputs {
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirm_password',
}

export enum ResetFormLabels {
  PASSWORD = 'Password',
  CONFIRM_PASSWORD = 'Confirm Password',
}

export const resetValidationSchema = object({
  [ResetFormInputs.PASSWORD]: string().required('Password is required'),
  [ResetFormInputs.CONFIRM_PASSWORD]: string()
    .required('Confirm Password is required')
    .oneOf([ref(ResetFormInputs.PASSWORD), null], 'Passwords must match'),
})
