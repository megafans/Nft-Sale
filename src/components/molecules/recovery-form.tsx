import { useFormik } from 'formik'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { Button, ButtonLink, Input, LoadingState } from '@/components'
import { RecoveryFormInputs, RecoveryFormLabels, recoveryValidationSchema } from '@/helpers/forms'
import { useAuth } from '@/hooks'

type Values = {
  [RecoveryFormInputs.EMAIL]: string
}

export const RecoveryForm = () => {
  const { recovery, loading } = useAuth()
  const { values, errors, touched, handleSubmit, handleChange } = useFormik<Values>({
    initialValues: {
      [RecoveryFormInputs.EMAIL]: '',
    },
    validationSchema: recoveryValidationSchema,
    onSubmit: values => {
      recovery(values[RecoveryFormInputs.EMAIL])
    },
  })

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        name={RecoveryFormInputs.EMAIL}
        type="text"
        placeholder="Enter email"
        label={RecoveryFormLabels.EMAIL}
        id={RecoveryFormInputs.EMAIL}
        value={values[RecoveryFormInputs.EMAIL]}
        error={errors[RecoveryFormInputs.EMAIL]}
        touched={touched[RecoveryFormInputs.EMAIL]}
        onChange={handleChange}
        autoFocus
      />
      <div className="flex items-center sm:space-x-4 pt-12">
        <Button size="lg" variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <LoadingState width={24} />
          ) : (
            <>
              <span>Forgot Password</span>
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </>
          )}
        </Button>
        <ButtonLink href="/sign-in" variant="transparent" size="lg">
          <span className="font-bold">Sign In</span>
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </ButtonLink>
      </div>
    </form>
  )
}
