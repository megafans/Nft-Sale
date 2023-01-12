import { object, string } from 'yup'

export enum EditProfileFormInputs {
  EMAIL = 'email',
  USERNAME = 'username',
  COUNTRY = 'country',
  AVATAR = 'image',
}

export enum EditProfileFormLabels {
  EMAIL = 'Email',
  USERNAME = 'User Name',
  COUNTRY = 'Country',
  AVATAR = 'Upload a new avatar',
}

export const editProfileValidationSchema = object({
  [EditProfileFormInputs.EMAIL]: string().email('Please provide a valid mail').required('Email is required'),
  [EditProfileFormInputs.USERNAME]: string().required('User name is required'),
  [EditProfileFormInputs.COUNTRY]: string().required('Country is required'),
  [EditProfileFormInputs.AVATAR]: string().required('Avatar is required'),
})
