export interface IBookingData {
    userId: string | null;
    serviceId: string | null;
    employeeId: string | null;
    addressId: string;
    timeslotId: string | null;
    paymentMethod: string | null;
    totalAmount: number;
    paymentResponse?: PaymentResponse;
}
export interface PaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    status: 'Success' | 'Failed' | 'Pending';
    amount: number;
    currency: string;
    timestamp: Date;
}

export interface PaymentDetails {
    bookingStatus: string;
    paymentMethod: string | null;
    totalAmount: number;
    paymentDate: Date;
    paymentResponse?: PaymentResponse | {};
}

export interface BookingListData {
    _id: string;
    employee?: string; 
    userName?: string;
    date: string;     
    category:string;
    service: string; 
    address?:string; 
    totalAmount: number;    
    paymentMethod: string;
    bookingStatus: string;
    completed: boolean;
}

export interface BookingDetails {
    _id: string;
    userId:string;
    employee: string; 
    date: string;     
    category: string;
    service: string;  
    serviceImage: string;
    totalAmount: number;    
    paymentMethod: string;
    paymentStatus: string;
    bookingStatus: string;
    completed: boolean;
    address: { city: string }; 
}

