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
  }

  export interface timeSlotsResponse {
    date: string;
    startTime: string;  
    endTime: string;
  }
  
  export interface timeslotDeletionResponse{
    message : string;
  }