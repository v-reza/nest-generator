export type MessageResponse = {
  message: string
}

export type StatusResponse = {
  status: number
}

export type AccessTokenResponse = {
  access_token: string
}

export type DataResponse = {
  skip: number
  limit: number
  total: number
  data: any
}

export type OnlyData = {
  data: any
}

export type PostResponse  = MessageResponse & StatusResponse 
export type PostResponseWithToken = PostResponse & AccessTokenResponse 
export type PostResponseWithData = PostResponse & DataResponse
export type PostResponseOnlyData = PostResponse & OnlyData

export type PatchResponse  = PostResponse 
export type PatchResponseWithToken = PatchResponse & AccessTokenResponse 
export type PatchResponseWithData = PatchResponse & DataResponse
export type PatchResponseOnlyData = PatchResponse & OnlyData


export type DeleteResponse = MessageResponse & StatusResponse

export type GetResponse = DataResponse

export type RegisterResponse = PostResponse
export type LoginResponse = PostResponse & AccessTokenResponse