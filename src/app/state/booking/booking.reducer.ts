import { createReducer, on } from "@ngrx/store";
import { initialBookingState } from "./booking.state";
import { setAddress, setEmployeeId, setServiceId, setTimeSlotId } from "./booking.actions";

export const bookingReducer = createReducer(initialBookingState,
    on(setServiceId, (state, { serviceId }) => ({ ...state, serviceId })),
    on(setTimeSlotId,(state,{timeSlotId})=>({...state, timeSlotId})),
    on(setEmployeeId,(state,{employeeId})=>({...state, employeeId})),
    on(setAddress,(state,{address})=>({...state, address})),
)