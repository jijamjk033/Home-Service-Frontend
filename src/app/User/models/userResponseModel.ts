export interface ResponseModel<T> {
    map(arg0: (booking: any) => { employee: any; date: string; service: any; totalAmount: any; paymentMethod: any; bookingStatus: any; }): never[];
    status: 'success' | 'error';
    data: T;
    message?: string;
    error?: string;
}


export interface SignupResponse {
    message: string;
    otpToken: string;
}

export interface VerifyOtpResponse {
    message: string;
  }
  
  export interface ResendOtpResponse {
    message: string;
    newOtpToken: string;
  }

  export interface LoginResponse {
    token: string;
    user: {
      role: string;
      email: string;    
      id: string;       
      name: string; 
      is_done: boolean; 
      isAdmin: boolean;
    };
    message: string;
  }
  