export interface NotificationResponse {
    timestamp:  Date;
    _id: string;                
    senderId: string;           
    senderModel: string;        
    recipientId: string;        
    recipientModel: string;     
    message: string;           
    type: string;              
    orderId?: string;           
    createdAt: Date;          
    updatedAt: string;      
}
  

export interface NotificationData{              
    senderId: string;           
    senderModel: string;        
    recipientId: string;        
    recipientModel: string;     
    message: string;           
    type: string;              
    orderId: string;           
}