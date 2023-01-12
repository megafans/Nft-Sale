import { useFormik } from 'formik'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { Button, ButtonLink, Input, LoadingState } from '@/components'
import { LoginFormInputs, LoginFormLabels, loginValidationSchema } from '@/helpers/forms'
import { useAuth } from '@/hooks'

type Values = {
  [LoginFormInputs.EMAIL]: string
  [LoginFormInputs.PASSWORD]: string
}

export const LoginForm = () => {
  const { login, loading } = useAuth()
  const { values, errors, touched, handleSubmit, handleChange } = useFormik<Values>({
    initialValues: {
      [LoginFormInputs.EMAIL]: '',
      [LoginFormInputs.PASSWORD]: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {
      login(values[LoginFormInputs.EMAIL], values[LoginFormInputs.PASSWORD])
    },
  })

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        name={LoginFormInputs.EMAIL}
        type="text"
        placeholder="Enter email"
        label={LoginFormLabels.EMAIL}
        id={LoginFormInputs.EMAIL}
        value={values[LoginFormInputs.EMAIL]}
        error={errors[LoginFormInputs.EMAIL]}
        touched={touched[LoginFormInputs.EMAIL]}
        onChange={handleChange}
        autoFocus
      />
      <Input
        name={LoginFormInputs.PASSWORD}
        type="password"
        placeholder="Enter password"
        label={LoginFormLabels.PASSWORD}
        id={LoginFormInputs.PASSWORD}
        value={values[LoginFormInputs.PASSWORD]}
        error={errors[LoginFormInputs.PASSWORD]}
        touched={touched[LoginFormInputs.PASSWORD]}
        onChange={handleChange}
      />
      <div className="flex justify-end">
        <ButtonLink href="/forgot-password" variant="transparent" size="sm">
          <p>Don&apos;t remember password?</p>
          <span className="text-red-400 ml-1">Forgot Password</span>
        </ButtonLink>
      </div>
      <div className="flex items-center sm:space-x-4 pt-12">
        <Button size="lg" variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <LoadingState width={24} />
          ) : (
            <>
              <span>Login</span>
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </>
          )}
        </Button>
        <ButtonLink href="/sign-up" variant="transparent" size="lg">
          <span className="font-bold">Create Account</span>
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </ButtonLink>
      </div>
    </form>
  )
}
