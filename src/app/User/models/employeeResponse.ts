  export interface employeeLoginResponse {
    token: string;
    employee: {
      email: string;    
      id: string;       
      name: string; 
      is_done: boolean; 
    };
    message: string;
  }