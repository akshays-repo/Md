import { HospitalState as Hospital } from './ComponentState/hospital';
import { BranchState as Branch } from './ComponentState/branch';
import { AppointmentTypeState as AppointmentType } from './ComponentState/appointment_type';
import { ProviderTypeState as ProviderType } from './ComponentState/provider_type';
import { ProviderState as Provider } from './ComponentState/provider';
import { PatientState as Patient } from './ComponentState/patient';
import { OnlineBookingState as OnlineBooking } from './ComponentState/online_booking';
import {CustomFormState as CustomForm} from './ComponentState/customForm'
import {AppointmentState as Appointment} from './ComponentState/customForm'
import {DashboardState as Dashboard} from './ComponentState/dashboard'
import { UsersState as Users } from './ComponentState/users';
import { FormsState as Forms} from './ComponentState/forms';
export const initialState = {
  Hospital,
  Branch,
  AppointmentType,
  ProviderType,
  Provider,
  Patient,
  OnlineBooking,
  CustomForm,
  Appointment,
  Dashboard,
  Users,
   Forms
};
