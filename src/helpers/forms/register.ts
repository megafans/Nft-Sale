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
  [RegisterFormInputs.EMAIL]: string().email().required(),
  [RegisterFormInputs.PASSWORD]: string().required(),
  [RegisterFormInputs.USERNAME]: string().required(),
})
