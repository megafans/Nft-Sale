/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ActiveGamesDataModel {
  /** @format int64 */
  id?: number
  /** @format uuid */
  app_game_uid?: string
  title?: string | null
  description?: string | null
}

export interface ActiveGamesModel {
  success?: boolean
  message?: string | null
  data?: ActiveGamesDataModel[] | null
}

export interface AppGame {
  /** @format int64 */
  id?: number
  /** @format int64 */
  userId?: number
  /** @format uuid */
  appGameUid?: string
  title?: string | null
  description?: string | null
  statusId?: boolean | null
  /** @format date-time */
  createdAt?: string
  /** @format date-time */
  modified?: string
  onesignalApi?: string | null
  onesignalAppId?: string | null
  /** @format int32 */
  p2pGamesPlayed?: number | null
  /** @format int32 */
  f2pGamesPlayed?: number | null
  currentVersion?: string | null
  currentVersionIos?: string | null
  currentVersionAndroid?: string | null
  landscape?: boolean
  defaultTournamentImage?: string | null
}

export interface AppGameListPagedResponse {
  data?: AppGame[] | null
  succeeded?: boolean
  errors?: string[] | null
  message?: string | null
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format uri */
  firstPage?: string | null
  /** @format uri */
  lastPage?: string | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalRecords?: number
  /** @format uri */
  nextPage?: string | null
  /** @format uri */
  previousPage?: string | null
}

export interface Country {
  /** @format int64 */
  id?: number
  name?: string | null
  countryCode?: string | null
  isActive?: boolean
  stateRequired?: boolean
  gdpr?: boolean
  /** @format date-time */
  createdAt?: string
  /** @format date-time */
  modified?: string
  sms?: boolean
  prefix?: string | null
}

export interface CountryResponse {
  /** @format int64 */
  id?: number
  name?: string | null
  countryCode?: string | null
  flag?: string | null
}

export interface EditProfileModel {
  username?: string | null
  email?: string | null
  /** @format int64 */
  countryId?: number
  imageUri?: string | null
}

export interface ForgotPasswordModel {
  email?: string | null
}

export interface ListTotalNFTRewardsResponse {
  success?: boolean
  message?: string | null
  /** @format int32 */
  totalRewards?: number
  dollarValue?: string | null
}

export interface LoginDataModel {
  token?: string | null
  refresh?: string | null
  username?: string | null
  image?: string | null
  /** @format int64 */
  userId?: number
  sms?: boolean
  email?: string | null
}

export interface LoginModel {
  success?: boolean
  message?: string | null
  data?: LoginDataModel
}

export interface NewPasswordModel {
  code?: string | null
  password?: string | null
}

export interface NewWalletModel {
  walletAddress?: string | null
}

export interface Refresh {
  token?: string | null
  refresh?: string | null
}

export interface RefreshDataModel {
  token?: string | null
  refresh?: string | null
}

export interface RefreshModel {
  success?: boolean
  message?: string | null
  data?: RefreshDataModel
}

export interface StakeNFTModel {
  transactionId?: string | null
}

export interface Status {
  message?: string | null
  success?: boolean
}

export interface UploadImageResponse {
  success?: boolean
  message?: string | null
  imageURI?: string | null
}

export interface User {
  /** @format int64 */
  id?: number
  username?: string | null
  email?: string | null
  password?: string | null
  hash?: string | null
  phoneNumber?: string | null
  deviceType?: string | null
  deviceToken?: string | null
  gender?: string | null
  /** @format date-time */
  dateOfBirth?: string | null
  /** @format double */
  clientBalance?: number
  facebookLoginId?: string | null
  image?: string | null
  phoneVerified?: boolean
  /** @format int64 */
  roleId?: number
  /** @format int64 */
  statusId?: number
  /** @format int32 */
  countryId?: number
  /** @format date-time */
  createdAt?: string
  /** @format date-time */
  modified?: string
  /** @format int32 */
  signupLevel?: number | null
  onesignalId?: string | null
  emailConfirmed?: boolean | null
  banned?: boolean | null
  walletAddress?: string | null
}

export interface UserAddRequest {
  username?: string | null
  email?: string | null
  password?: string | null
}

export interface ViewProfileDataModel {
  username?: string | null
  email?: string | null
  phoneNumber?: string | null
  isPhoneVerified?: boolean
  deviceType?: string | null
  gender?: string | null
  /** @format date-time */
  dateOfBirth?: string | null
  /** @format double */
  clientBalance?: number
  facebookLoginId?: string | null
  image?: string | null
  role?: string | null
  /** @format int64 */
  status?: number
  countryCode?: string | null
  countryName?: string | null
  countryFlag?: string | null
  /** @format int32 */
  tournamentsWon?: number | null
  /** @format int32 */
  tournamentsEntered?: number | null
  /** @format int32 */
  highestRank?: number | null
  /** @format int32 */
  practiceGames?: number | null
  /** @format double */
  highestPracticeScore?: number | null
  /** @format double */
  highestTournamentScore?: number | null
}

export interface WeatherForecast {
  /** @format date-time */
  date?: string
  /** @format int32 */
  temperatureC?: number
  /** @format int32 */
  temperatureF?: number
  summary?: string | null
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key])
    return keys
      .map(key => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async response => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch(e => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title MegaFansWebsiteAPI
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  authorization = {
    /**
     * No description
     *
     * @tags Authorization
     * @name ForgotPasswordCreate
     * @request POST:/Authorization/forgot_password
     */
    forgotPasswordCreate: (data: ForgotPasswordModel, params: RequestParams = {}) =>
      this.request<Status, any>({
        path: `/Authorization/forgot_password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name NewPasswordCreate
     * @request POST:/Authorization/new_password
     */
    newPasswordCreate: (data: NewPasswordModel, params: RequestParams = {}) =>
      this.request<Status, any>({
        path: `/Authorization/new_password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name LoginCreate
     * @request POST:/Authorization/login
     */
    loginCreate: (
      query?: {
        /** @default "" */
        appGameUid?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<LoginModel, any>({
        path: `/Authorization/login`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name LogoutCreate
     * @request POST:/Authorization/logout
     * @secure
     */
    logoutCreate: (
      query?: {
        /** @default "" */
        appGameUid?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<Status, void>({
        path: `/Authorization/logout`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name RefreshCreate
     * @request POST:/Authorization/refresh
     */
    refreshCreate: (
      data: Refresh,
      query?: {
        /** @default "" */
        appGameUid?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<RefreshModel, any>({
        path: `/Authorization/refresh`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }
  api = {
    /**
     * No description
     *
     * @tags Countries
     * @name CountriesList
     * @request GET:/api/Countries
     */
    countriesList: (params: RequestParams = {}) =>
      this.request<CountryResponse[], any>({
        path: `/api/Countries`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Countries
     * @name CountriesCreate
     * @request POST:/api/Countries
     */
    countriesCreate: (data: Country, params: RequestParams = {}) =>
      this.request<Country, any>({
        path: `/api/Countries`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Countries
     * @name CountriesDetail
     * @request GET:/api/Countries/{id}
     */
    countriesDetail: (id: number, params: RequestParams = {}) =>
      this.request<Country, any>({
        path: `/api/Countries/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Countries
     * @name CountriesUpdate
     * @request PUT:/api/Countries/{id}
     */
    countriesUpdate: (id: number, data: Country, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Countries/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Countries
     * @name CountriesDelete
     * @request DELETE:/api/Countries/{id}
     */
    countriesDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Countries/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Games
     * @name GamesActivegamesList
     * @request GET:/api/Games/activegames
     * @secure
     */
    gamesActivegamesList: (params: RequestParams = {}) =>
      this.request<ActiveGamesModel, void>({
        path: `/api/Games/activegames`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Image
     * @name ImageImageUploadCreate
     * @request POST:/api/Image/ImageUpload
     * @secure
     */
    imageImageUploadCreate: (
      data: {
        /** @format binary */
        File?: File
      },
      query?: {
        /** @format int32 */
        typeId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<UploadImageResponse, void>({
        path: `/api/Image/ImageUpload`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Image
     * @name ImageGenerateRandomProfileImageList
     * @request GET:/api/Image/GenerateRandomProfileImage
     */
    imageGenerateRandomProfileImageList: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/Image/GenerateRandomProfileImage`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags MetaData
     * @name MetaDataNftMetaDataDetail
     * @request GET:/api/MetaData/NFTMetaData/{id}
     */
    metaDataNftMetaDataDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/MetaData/NFTMetaData/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftListNftRewardsList
     * @request GET:/api/NFT/ListNFTRewards
     * @secure
     */
    nftListNftRewardsList: (
      query?: {
        /** @format int32 */
        PageNumber?: number
        /** @format int32 */
        PageSize?: number
        /** @format int32 */
        nftId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<AppGameListPagedResponse, void>({
        path: `/api/NFT/ListNFTRewards`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftListTotalNftRewardsList
     * @request GET:/api/NFT/ListTotalNFTRewards
     * @secure
     */
    nftListTotalNftRewardsList: (
      query?: {
        /** @format int32 */
        nftId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ListTotalNFTRewardsResponse, void>({
        path: `/api/NFT/ListTotalNFTRewards`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftListTotalNftRewards2List
     * @request GET:/api/NFT/ListTotalNFTRewards2
     * @secure
     */
    nftListTotalNftRewards2List: (
      query?: {
        /** @format int32 */
        nftId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ListTotalNFTRewardsResponse, void>({
        path: `/api/NFT/ListTotalNFTRewards2`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftWalletCreate
     * @request POST:/api/NFT/wallet
     * @secure
     */
    nftWalletCreate: (data: NewWalletModel, params: RequestParams = {}) =>
      this.request<Status, void>({
        path: `/api/NFT/wallet`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftPayOutNftStakersList
     * @request GET:/api/NFT/PayOutNftStakers
     */
    nftPayOutNftStakersList: (params: RequestParams = {}) =>
      this.request<Status, any>({
        path: `/api/NFT/PayOutNftStakers`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftStakeNftCreate
     * @request POST:/api/NFT/Stake_nft
     * @secure
     */
    nftStakeNftCreate: (data: StakeNFTModel, params: RequestParams = {}) =>
      this.request<Status, void>({
        path: `/api/NFT/Stake_nft`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersGenerateUserNameList
     * @request GET:/api/Users/GenerateUserName
     */
    usersGenerateUserNameList: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/Users/GenerateUserName`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersCreate
     * @request POST:/api/Users
     */
    usersCreate: (data: UserAddRequest, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/Users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersViewProfileList
     * @request GET:/api/Users/view_profile
     * @secure
     */
    usersViewProfileList: (params: RequestParams = {}) =>
      this.request<ViewProfileDataModel, void>({
        path: `/api/Users/view_profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersEditProfileCreate
     * @request POST:/api/Users/edit_profile
     * @secure
     */
    usersEditProfileCreate: (data: EditProfileModel, params: RequestParams = {}) =>
      this.request<Status, void>({
        path: `/api/Users/edit_profile`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }
  weatherForecast = {
    /**
     * No description
     *
     * @tags WeatherForecast
     * @name GetWeatherForecast
     * @request GET:/WeatherForecast
     * @secure
     */
    getWeatherForecast: (params: RequestParams = {}) =>
      this.request<WeatherForecast[], void>({
        path: `/WeatherForecast`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  }
}
