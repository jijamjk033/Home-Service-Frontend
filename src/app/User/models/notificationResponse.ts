export interface NotificationResponse {
    _id: string;                
    senderId: string;           
    senderModel: string;        
    recipientId: string;        
    recipientModel: string;     
    message: string;           
    type: string;              
    orderId?: string;           
    createdAt: string;          
    updatedAt: string;      
}
  