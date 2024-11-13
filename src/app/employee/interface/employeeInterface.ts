export interface employeeData {
    name: string;
    email: string; 
    phone:string;
    designation: string;
    experience: string;
    status: string;
    password?: string;
  }

  export interface timeSlotscreationResponse{
    message : string;
  }

  export interface BookedTimeslot{
    message : string;
    success: boolean
  }

  export interface timeSlotsResponse {
    _id:string,
    date: string;
    startTime: string;  
    endTime: string;
    isBooked:boolean
  }
  
  export interface timeslotDeletionResponse{
    message : string;
  }

  export interface timeslotResponse{
    date: string;
    startTime: string;  
    endTime: string;
    employee:string;
  }

  export interface BookingResponse{
    message : string;
    success: boolean;
  }