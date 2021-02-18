import { HospitalReducer as Hospital } from './ComponentReducer/hospital';
import { BranchReducer as Branch } from './ComponentReducer/branch';
import { AppointmentTypeReducer as AppointmentType } from './ComponentReducer/appointment_type';
import { ProviderTypeReducer as ProviderType } from './ComponentReducer/provider_type';
import { ProviderReducer as Provider } from './ComponentReducer/provider';
import { PatientReducer as Patient } from './ComponentReducer/patient';
import { OnlineBookingReducer as OnlineBooking } from './ComponentReducer/online_booking';
import { LoginReducer as Login } from './ComponentReducer/login';
import { CustomFormReducer as CustomForm } from './ComponentReducer/customForm';
import { ScheduleReducer as Schedule } from './ComponentReducer/schedule';
import { OnlineBookingFormReducer as OnlineBookingForm } from './ComponentReducer/onlineBookingForm';
import { AppointmentReducer as Appointment } from './ComponentReducer/appointment';
import { DashboardReducer as Dashboard } from './ComponentReducer/dashboard';
import { MesssageReducer as Message } from './ComponentReducer/message';
import { SummaryMesssageReducer as SummaryMessage } from './ComponentReducer/summary_message';
import { UsersReducer as Users } from './ComponentReducer/users';
import { UnavailableReducer as Unavailable } from './ComponentReducer/unavailable';
import { FormsReducer as Forms } from './ComponentReducer/forms';
export const reducers = {
  Hospital,
  Branch,
  AppointmentType,
  ProviderType,
  Provider,
  Patient,
  OnlineBooking,
  Login,
  CustomForm,
  Schedule,
  OnlineBookingForm,
  Appointment,
  Dashboard,
  Message,
  SummaryMessage,
  Users,
  Unavailable,
  Forms
};
