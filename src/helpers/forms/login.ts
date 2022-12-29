import { object, string } from 'yup'

export enum LoginFormInputs {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export enum LoginFormLabels {
  EMAIL = 'Email',
  PASSWORD = 'Password',
}

export const loginValidationSchema = object({
  [LoginFormInputs.EMAIL]: string().email('Please provide a valid mail').required('Email is required'),
  [LoginFormInputs.PASSWORD]: string().required('Password is required'),
})
