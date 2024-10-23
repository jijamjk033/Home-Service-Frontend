export interface ResponseModel<T> {
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
      email: string;    
      id: string;       
      name: string; 
      is_done: boolean; 
      isAdmin: boolean;
    };
    message: string;
  }
  