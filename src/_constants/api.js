export const api = {
  login: '/api/backend/v1/login',
  getUser: '/api/users/getUser',
  signup: '/api/backend/v1/register',
  google_login: '/api/backend/v1/auth/google',
  facebook_login: '/api/backend/v1/auth/facebook',
  forgotPassword: '/api/users/forgotPassword',
  getProducts: '/api/products',
  getListingByID: '/api/backend/v1/listing/',
  viewlisting: '/api/backend/v1/listing_user',
};

export const backend_api = {
  CREATE_BRANCH: '/api/backend/v1/users/register',
  FETCH_BRANCH: '/api/backend/v1/branches',
  EDIT_BRANCH: '/api/backend/v1/users',
  DELETE_BRANCH: '/api/backend/v1/users',
  CREATE_APPOINTMENT_TYPE: '/api/backend/v1/appointment_type',
  FETCH_APPOINTMENT_TYPE: '/api/backend/v1/appointment_type',
  EDIT_APPOINTMENT_TYPE: '/api/backend/v1/appointment_type',
  DELETE_APPOINTMENT_TYPE: '/api/backend/v1/appointment_type',
  CREATE_PATIENT: '/api/backend/v1/users/patiant',
  FETCH_PATIENT: '/api/backend/v1/patiant',
  EDIT_PATIENT: '/api/backend/v1/users/patiant',
  DELETE_PATIENT: '/api/backend/v1/users/patiant',
  USER_LOGIN: '/api/backend/v1/users/login',
};
