import { RowDataPacket } from "mysql2"


export default interface Parcel extends RowDataPacket {
    parcelID?: number;
    receiverID: number;
    driverID: number;
    status: Status;
    parcelDescription?: string;
    deliveryAddress?: string;
    deliveryDate?: Date;
    deliveryNotes: string;
}
enum Status {
    Created,
    Sent,
   Delivered,
   Received
}