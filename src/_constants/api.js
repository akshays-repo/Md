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
  
  CREATE_PROVIDER:'/api/backend/v1/users/register',
  FETCH_PROVIDER:'/api/backend/v1/providers',
  EDIT_PROVIDER:'/api/backend/v1/users',
  DELETE_PROVIDER:'/api/backend/v1/provider',
  
  CREATE_CUSTOMFORM:'/api/backend/v1/custom_form',
  FETCH_CUSTOMFORM:'/api/backend/v1/custom_form',
  
  FETCH_SCHEDULE: '/api/backend/v1/newshedule',
  CREATE_SCHEDULE: '/api/backend/v1/newshedule',

  CREATE_ONLINE_APPOINTMENT:'/api/backend/v1/online_booking',
  GET_APPOINTMENTS:'/api/backend/v1/online_booking',

  CREATE_PROVIDER_TYPE:'/api/backend/v1/provider_type',
  FETCH_PROVIDER_TYPE:'/api/backend/v1/provider_types',
  EDIT_PROVIDER_TYPE:' /api/backend/v1/provider_type',
  DELETE_PROVIDER_TYPE:'/api/backend/v1/provider_type',
};
