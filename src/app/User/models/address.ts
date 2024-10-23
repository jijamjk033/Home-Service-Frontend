export interface Address {
    _id: string,
    address: string,
    locality: string,
    city: string,
    state: string,
    pincode: number,
    typeOfAddress: string,
}

export interface addAddressResponse {
    message: string,
}

export interface getAddressResponse {
    _id: string,
    address: string,
    locality: string,
    city: string,
    state: string,
    pincode: number,
    typeOfAddress: string,
}