import { object, string } from 'yup'

export enum EditProfileFormInputs {
  EMAIL = 'email',
  USERNAME = 'username',
  COUNTRY = 'country',
}

export enum EditProfileFormLabels {
  EMAIL = 'Email',
  USERNAME = 'User Name',
  COUNTRY = 'Country',
}

export const editProfileValidationSchema = object({
  [EditProfileFormInputs.EMAIL]: string().email('Please provide a valid mail').required('Email is required'),
  [EditProfileFormInputs.USERNAME]: string().required('User name is required'),
  [EditProfileFormInputs.COUNTRY]: string().required('Country is required'),
})
