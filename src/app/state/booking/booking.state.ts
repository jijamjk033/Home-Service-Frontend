export interface BookingState {
    serviceId: string | null;
    timeSlotId: string | null;
    employeeId: string | null;
    address: string | null;
  }
  
  export const initialBookingState: BookingState = {
    serviceId: null,
    timeSlotId: null,
    employeeId: null,
    address: null,
  };
  