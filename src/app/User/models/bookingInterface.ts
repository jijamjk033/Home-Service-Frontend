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


