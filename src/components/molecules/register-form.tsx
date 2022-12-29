import { useFormik } from 'formik'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { RegisterFormInputs, RegisterFormLabels, registrationValidationSchema } from '@/helpers/forms'
import { Button, ButtonLink, Input, LoadingState } from '@/components'
import { useAuth, useMounted, useUsername } from '@/hooks'

type Values = {
  [RegisterFormInputs.EMAIL]: string
  [RegisterFormInputs.PASSWORD]: string
  [RegisterFormInputs.USERNAME]: string
}

export const RegisterForm = () => {
  const { register } = useAuth()
  const { username, isLoading } = useUsername()
  const mounted = useMounted()
  const { values, handleSubmit, handleChange } = useFormik<Values>({
    initialValues: {
      [RegisterFormInputs.EMAIL]: '',
      [RegisterFormInputs.PASSWORD]: '',
      [RegisterFormInputs.USERNAME]: username || '',
    },
    enableReinitialize: true,
    validationSchema: registrationValidationSchema,
    onSubmit: values => {
      register(
        values[RegisterFormInputs.EMAIL],
        values[RegisterFormInputs.PASSWORD],
        values[RegisterFormInputs.USERNAME]
      )
    },
  })
  return (
    <>
      {isLoading && mounted ? (
        <div className="flex justify-center mt-10">
          <LoadingState />
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            name={RegisterFormInputs.USERNAME}
            type="text"
            placeholder="Enter username"
            label={RegisterFormLabels.USERNAME}
            id={RegisterFormInputs.USERNAME}
            value={values[RegisterFormInputs.USERNAME]}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            name={RegisterFormInputs.EMAIL}
            type="text"
            placeholder="Enter email"
            label={RegisterFormLabels.EMAIL}
            id={RegisterFormInputs.EMAIL}
            value={values[RegisterFormInputs.EMAIL]}
            onChange={handleChange}
          />
          <Input
            name={RegisterFormInputs.PASSWORD}
            type="password"
            placeholder="Enter password"
            label={RegisterFormLabels.PASSWORD}
            id={RegisterFormInputs.PASSWORD}
            value={values[RegisterFormInputs.PASSWORD]}
            onChange={handleChange}
          />
          <div className="flex items-center sm:space-x-4 pt-12">
            <Button size="lg" variant="primary" type="submit">
              <span>Sign Up Free</span>
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </Button>
            <ButtonLink href="/sign-in" variant="transparent" size="lg">
              <span className="font-bold">Sign In</span>
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </ButtonLink>
          </div>
        </form>
      )}
    </>
  )
}
