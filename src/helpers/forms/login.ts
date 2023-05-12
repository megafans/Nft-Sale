import { object, string } from 'yup'

export enum LoginFormInputs {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export enum LoginFormLabels {
  EMAIL = 'Email or Username',
  PASSWORD = 'Password',
}

export const loginValidationSchema = object({
  [LoginFormInputs.EMAIL]: string().required('Email or Username is required'),
  [LoginFormInputs.PASSWORD]: string().required('Password is required'),
})
