export type ErrorResponse = {
  status: 'error'
  message: string
}

export type SuccessResponse<T> = {
  status: 'success'
  data: T
}

export type GenericResponse<T> = ErrorResponse | SuccessResponse<T>
