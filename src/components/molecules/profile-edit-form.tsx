import { useFormik } from 'formik'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { Button, Input, InputFile, LoadingState, Select } from '@/components'
import { EditProfileFormInputs, EditProfileFormLabels, loginValidationSchema } from '@/helpers/forms'
import { useCountries, useUser } from '@/hooks'

type Values = {
  [EditProfileFormInputs.EMAIL]: string
  [EditProfileFormInputs.USERNAME]: string
  [EditProfileFormInputs.COUNTRY]: string
  [EditProfileFormInputs.AVATAR]: string
}

export const ProfileEditForm = () => {
  const { countries } = useCountries()
  const { edit, user, loading } = useUser()
  const { values, errors, touched, handleSubmit, handleChange } = useFormik<Values>({
    initialValues: {
      [EditProfileFormInputs.EMAIL]: user?.email || '',
      [EditProfileFormInputs.USERNAME]: user?.username || '',
      [EditProfileFormInputs.COUNTRY]: user?.countryName || '',
      [EditProfileFormInputs.AVATAR]: user?.image || '',
    },
    validationSchema: loginValidationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      edit(
        values[EditProfileFormInputs.EMAIL],
        values[EditProfileFormInputs.USERNAME],
        values[EditProfileFormInputs.COUNTRY]
      )
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          handleChange({
            target: {
              name: EditProfileFormInputs.AVATAR,
              value: reader.result,
            },
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])

      console.log(values[EditProfileFormInputs.AVATAR])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="w-1/2 space-y-6 pr-2">
        <Input
          name={EditProfileFormInputs.EMAIL}
          type="text"
          placeholder="Enter email"
          label={EditProfileFormLabels.EMAIL}
          id={EditProfileFormInputs.EMAIL}
          value={values[EditProfileFormInputs.EMAIL]}
          error={errors[EditProfileFormInputs.EMAIL]}
          touched={touched[EditProfileFormInputs.EMAIL]}
          onChange={handleChange}
          autoFocus
        />
        <Input
          name={EditProfileFormInputs.USERNAME}
          type="text"
          placeholder="Enter username"
          label={EditProfileFormLabels.USERNAME}
          id={EditProfileFormInputs.USERNAME}
          value={values[EditProfileFormInputs.USERNAME]}
          error={errors[EditProfileFormInputs.USERNAME]}
          touched={touched[EditProfileFormInputs.USERNAME]}
          onChange={handleChange}
        />
        <Select
          placeholder="Select country"
          items={countries}
          onChange={handleChange}
          name={EditProfileFormInputs.COUNTRY}
          id={EditProfileFormInputs.COUNTRY}
          label={EditProfileFormLabels.COUNTRY}
          value={values[EditProfileFormInputs.COUNTRY]}
        />
      </div>
      <div className="w-1/2 pl-2 md:pt-7">
        <InputFile
          onChange={handleFileChange}
          name={EditProfileFormInputs.AVATAR}
          id={EditProfileFormInputs.AVATAR}
          label={EditProfileFormLabels.AVATAR}
          value={values[EditProfileFormInputs.AVATAR]}
        />
      </div>
      <div className="flex items-center sm:space-x-4 pt-8">
        <Button size="lg" variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <LoadingState width={24} />
          ) : (
            <>
              <span>Update Profile</span>
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
