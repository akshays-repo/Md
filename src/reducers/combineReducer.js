import { HospitalReducer as Hospital } from './ComponentReducer/hospital';
import { BranchReducer as Branch } from './ComponentReducer/branch';
import { AppointmentTypeReducer as AppointmentType } from './ComponentReducer/appointment_type';
import { ProviderTypeReducer as ProviderType } from './ComponentReducer/provider_type';
import { ProviderReducer as Provider } from './ComponentReducer/provider';
import { PatientReducer as Patient } from './ComponentReducer/patient';
import { OnlineBookingReducer as OnlineBooking } from './ComponentReducer/online_booking';
import { LoginReducer as Login } from './ComponentReducer/login';
import {CustomFormReducer as CustomForm} from './ComponentReducer/customForm'
export const reducers = {
  Hospital,
  Branch,
  AppointmentType,
  ProviderType,
  Provider,
  Patient,
  OnlineBooking,
  Login,
  CustomForm
};
