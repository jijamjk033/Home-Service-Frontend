export interface ITimeslot {
    employeeId: string, 
    date: string;
    startTime: string;
    endTime: string;
    isBooked?: boolean; 
}