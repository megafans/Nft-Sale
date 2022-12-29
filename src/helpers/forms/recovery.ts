import { object, string } from 'yup'

export enum RecoveryFormInputs {
  EMAIL = 'email',
}

export enum RecoveryFormLabels {
  EMAIL = 'Email',
}

export const recoveryValidationSchema = object({
  [RecoveryFormInputs.EMAIL]: string().email('Please provide a valid mail').required('Email is required'),
})
