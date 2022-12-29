import { object, string } from 'yup'

export enum RegisterFormInputs {
  EMAIL = 'email',
  PASSWORD = 'password',
  USERNAME = 'username',
}

export enum RegisterFormLabels {
  EMAIL = 'Email',
  PASSWORD = 'Password',
  USERNAME = 'User Name',
}

export const registrationValidationSchema = object({
  [RegisterFormInputs.EMAIL]: string().email('Please provide a valid mail').required('Email is required'),
  [RegisterFormInputs.PASSWORD]: string().required('Password is required'),
  [RegisterFormInputs.USERNAME]: string().required('User name is required'),
})
