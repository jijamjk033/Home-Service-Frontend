import { createAction, props } from '@ngrx/store';

export const setServiceId = createAction('[Booking] Set Service ID', props<{ serviceId: string }>());
export const setTimeSlotId = createAction('[Booking] Set Time Slot ID', props<{ timeSlotId: string }>());
export const setEmployeeId = createAction('[Booking] Set Employee ID', props<{ employeeId: string }>());
export const setAddress = createAction('[Booking] Set Address', props<{ address: string }>());
