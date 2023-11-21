import { RowDataPacket } from "mysql2"


export default interface Parcel extends RowDataPacket {
    parcelID?: number;
    senderID: number; // which is a firebase id of a user who is signed in now
    receiverID: number;
   // info of a receiver
   receiverEmail: string;

    driverID: number;
    status: Status;
    parcelDescription?: string;
    deliveryAddress?: string;
    pickupDate: Date; // date when parcel is picked up
    deliveryDate?: Date;
    deliveryNotes: string;
}
enum Status {
    Created,
    Sent,
   Delivered,
   Received
}