import { useFormik } from 'formik'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { Button, Input, LoadingState, Select } from '@/components'
import { EditProfileFormInputs, EditProfileFormLabels, editProfileValidationSchema } from '@/helpers/forms'
import { useCountries, useUser } from '@/hooks'

type Values = {
  [EditProfileFormInputs.EMAIL]: string
  [EditProfileFormInputs.USERNAME]: string
  [EditProfileFormInputs.COUNTRY]: string
}

export const ProfileEditForm = () => {
  const { countries } = useCountries()
  const { edit, user, loading } = useUser()
  const { values, errors, touched, handleSubmit, handleChange } = useFormik<Values>({
    initialValues: {
      [EditProfileFormInputs.EMAIL]: user?.email || '',
      [EditProfileFormInputs.USERNAME]: user?.username || '',
      [EditProfileFormInputs.COUNTRY]: user?.countryCode || '',
    },
    validationSchema: editProfileValidationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      edit(
        values[EditProfileFormInputs.EMAIL],
        values[EditProfileFormInputs.USERNAME],
        values[EditProfileFormInputs.COUNTRY]
      )
    },
  })

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div className="md:pr-2 text-left space-y-3 w-3/4">
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
      </div>
      <div className="flex items-center justify-center pt-8">
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
