import { TErrorSource, TGenericErrorResponse } from '../interface/error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error: any): TGenericErrorResponse => {
  //   const match = error.message.match(/"(.*?)"/)

  const match = error.message.match(/"(.*?)"/)
  const extractedMessage = match && match[1]
  console.log(extractedMessage)
  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ]

  const statusCode = 400
  {
    return {
      statusCode,
      message: ' Invalid ID',
      errorSources,
    }
  }
}

export default handleDuplicateError
