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
  FETCH_PATIENT: '/api/backend/v1/patiant/filter',
  EDIT_PATIENT: '/api/backend/v1/users/patiant',
  DELETE_PATIENT: '/api/backend/v1/users/patiant',
  FILTER_PATIENT: '/api/backend/v1/patiant/filter',
  EDIT_PATIENT_STATUS: '/api/backend/v1/users/patiant',

  USER_LOGIN: '/api/backend/v1/users/login',

  CREATE_PROVIDER: '/api/backend/v1/users/register',
  FETCH_PROVIDER: '/api/backend/v1/providers',
  EDIT_PROVIDER: '/api/backend/v1/users',
  DELETE_PROVIDER: '/api/backend/v1/provider',
  FETCH_BRANCH_PROVIDER: '/api/backend/v1/providers',
  EDIT_STATUS_PROVIDER: '/api/backend/v1/users/',
  FILTER_PROVIDER: '/api/backend/v1/providers',

  CREATE_CUSTOMFORM: '/api/backend/v1/custom_form',
  FETCH_CUSTOMFORM: '/api/backend/v1/custom_form',

  FETCH_SCHEDULE: '/api/backend/v1/newshedule',
  CREATE_SCHEDULE: '/api/backend/v1/newshedule',

  CREATE_ONLINE_APPOINTMENT: '/api/backend/v1/online_booking',
  FETCH_APPOINTMENT: '/api/backend/v1/online_booking',
  FILTER_APPOINTMENT: '/api/backend/v1/online_bookings/filter',
  VIEW_APPOINTMENT: '/api/backend/v1/online_booking',
  DELETE_APPOINTMENT: '/api/backend/v1/online_booking',
  EDIT_APPOINTMENT: '/api/backend/v1/online_booking',
  STATUS_CHANGE_APPOINTMENT: '/api/backend/v1/online_booking',

  CREATE_PROVIDER_TYPE: '/api/backend/v1/provider_type',
  FETCH_PROVIDER_TYPE: '/api/backend/v1/provider_types',
  EDIT_PROVIDER_TYPE: ' /api/backend/v1/provider_type',
  DELETE_PROVIDER_TYPE: '/api/backend/v1/provider_type',

  FETCH_PROVIDER_SCHEDULE: '/api/backend/v1/booking_schedule',
  FETCH_PROVIDER_HOSPITAL: '/api/backend/v1/providers/hospital',
  FETCH_BRANCH_APPOINTMENT_PROVIDER: '/api/backend/v1/providers/type_id',
  FETCH_HOSPITAL_APPOINTMENT_TYPE: '/api/backend/v1/appointment_types/hospital',
  CHECK_HOSPITAL: '/api/backend/v1/users',

  CREATE_USER: '/api/backend/v1/users/user',
  FETCH_USER: '/api/backend/v1/users/user',
  DELETE_USER: '/api/backend/v1/users/user',
  EDIT_USER: '/api/backend/v1/users/user',

  FETCH_APPOINTMENT_HOME: '/api/backend/v1/online_bookings/filter',
  FETCH_UNAVAILABLE_PROVIDER: '/api/backend/v1/unavailable/hospital',
  CREATE_PROVIDER_UNAVAILABLE: '/api/backend/v1/appointments/unavailable',

  CREATE_FORM: '/api/backend/v1/forms',
  EDIT_FORM:'/api/backend/v1/forms',
  FETCH_FORM: '/api/backend/v1/forms',

  GET_RESPONSE:'/api/backend/v1/hospital/response',
  FETCH_FROM_BY_ID:'/api/backend/v1/hospital/response',
  DELETE_FORM:'/api/backend/v1/forms',
  FILL_FORM:'/api/backend/v1/response/form',
  FETCH_FORM_FOR_FILLING:'/api/backend/v1/forms',
  
  EDIT_PROVIDER_UNAVAILABLE: '/api/backend/v1/appointments/unavailable',
  DELETE_PROVIDER_UNAVAILABLE: '/api/backend/v1/appointments/unavailable',
  FILTER_APPOINTMENT_CALENDAR: '/api/backend/v1/online_bookings/filter',
  FILTER_APPOINTMENT_CALENDAR_WITH_CANCELLED: '/api/backend/v1/online_bookings/filter',

  FETCH_TEMPLATE: '/api/backend/v1/hospital/template',
  EDIT_TEMPLATE: '/api/backend/v1/hospital/action',

  FETCH_HOSPITAL_ACTION: '/api/backend/v1/hospital/action',
  FILTER_SCHEDULE: '/api/backend/v1/allshedules',
  CHECK_HOSPITAL_ONLINE: '/api/backend/v1/users/hospital',
  FETCH_BRANCH_ONLINE: '/api/backend/v1/branches/public',

  FETCH_CAMPAIGN_PATIENTS:'/api/backend/v1/campaign/patients',
  CREATE_CAMPAIGN:'/api/backend/v1/campaign',
  FETCH_CAMPAIGN:'/api/backend/v1/campaigns',
  FETCH_CAMPAIGN_ID:'/api/backend/v1/campaigns',
  EDIT_CAMPAIGN:'/api/backend/v1/campaigns',

  GET_ALL_PATIENTS:"/api/backend/v1/getpatients",



  LANDING_PAGE_PACKAGES:'/api/backend/v1/packages/public',
};
