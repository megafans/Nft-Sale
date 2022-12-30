import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { Button, Input, LoadingState } from '@/components'
import { ResetFormInputs, ResetFormLabels, resetValidationSchema } from '@/helpers/forms'
import { useAuth } from '@/hooks'

type Values = {
  [ResetFormInputs.PASSWORD]: string
  [ResetFormInputs.CONFIRM_PASSWORD]: string
}

export const ResetForm = () => {
  const { query } = useRouter()

  console.log(query)

  const { reset, loading } = useAuth()
  const { values, errors, touched, handleSubmit, handleChange } = useFormik<Values>({
    initialValues: {
      [ResetFormInputs.PASSWORD]: '',
      [ResetFormInputs.CONFIRM_PASSWORD]: '',
    },
    validationSchema: resetValidationSchema,
    onSubmit: values => {
      reset(values[ResetFormInputs.PASSWORD], values[ResetFormInputs.CONFIRM_PASSWORD], query.id)
    },
  })

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        name={ResetFormInputs.PASSWORD}
        type="password"
        placeholder="Enter New Password"
        label={ResetFormLabels.PASSWORD}
        id={ResetFormInputs.PASSWORD}
        value={values[ResetFormInputs.PASSWORD]}
        error={errors[ResetFormInputs.PASSWORD]}
        touched={touched[ResetFormInputs.PASSWORD]}
        onChange={handleChange}
        autoFocus
      />
      <Input
        name={ResetFormInputs.CONFIRM_PASSWORD}
        type="password"
        placeholder="Confirm New Password"
        label={ResetFormLabels.CONFIRM_PASSWORD}
        id={ResetFormInputs.CONFIRM_PASSWORD}
        value={values[ResetFormInputs.CONFIRM_PASSWORD]}
        error={errors[ResetFormInputs.CONFIRM_PASSWORD]}
        touched={touched[ResetFormInputs.CONFIRM_PASSWORD]}
        onChange={handleChange}
      />
      <div className="flex items-center sm:space-x-4 pt-12">
        <Button size="lg" variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <LoadingState width={24} />
          ) : (
            <>
              <span>Reset Password</span>
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
