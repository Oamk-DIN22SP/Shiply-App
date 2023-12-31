import { RowDataPacket } from "mysql2"


export default interface Parcel extends RowDataPacket {
    
    trackingNumber: string;
    pinCode: string;
    senderName: string;
    senderEmailAddress: string;
    senderID: number; // should be equal to FirebaseID of a user
    senderAddress: string;
    senderPhoneNumber: string;
    senderDropOffPoint: string;
    
    receiverName: string;
    receiverID: number;
    receiverEmailAddress: string;
    receiverAddress: string;
    receiverPhoneNumber: string;
    receiverDropOffPoint: string;

  
    packageWidth: string;
    packageHeight: string;
    packageMass: string;
    packageWeight: string;

    pickedUpDateTime?: Date | null; // Optional property
    readyForPickupDateTime?: Date | null; // Optional property
}
enum Status {
    Created,
    Sent,
   Delivered,
   Received
}