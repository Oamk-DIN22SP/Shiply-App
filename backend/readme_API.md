### Parcel API routing
@maguitaria author

# Parcel Route

The Parcel Route provides endpoints for managing parcels in the system. You can use these endpoints to retrieve, create, update, and delete parcels.
All endpoints for parcels begin from ``` /api/parcels ```.
Example :  URL: `http://[website]/api/parcels/{endpoint}`
## Table of Contents
- Parcel model
### Parcels endpoints
- [Retrieve All Parcels](#retrieve-all-parcels)
- [Retrieve Parcel by ID](#retrieve-parcel-by-id)
- [Create a New Parcel](#create-a-new-parcel)
- [Update Parcel Status](#update-parcel-status)
- [Delete Parcel](#delete-parcel)
### Client endpoints
- Client model
### Locker endpoints
- Locker model
### Driver endpoints
- Driver model
---


## Parcel Model

A parcel in the system has the following unique properties:

- `parcelID` (number): A unique identifier for the parcel.
- `receiverID` (number): The ID of the receiver.
- `driverID` (number): The ID of the driver.
- `status` (enum): The status of the parcel, which can be one of the following values:
  - "created"
  - "sent"
  - "delivered"
  - "received"
- `parcelDescription` (string): A description of the parcel.
- `pickupAddress` (string): The address for parcel pickup.
- `deliveryAddress` (string): The address for parcel delivery.
- `deliveryDate` (date): The date and time for parcel delivery.
- `deliveryNotes` (string): Additional notes for handling the parcel.
#### Example of a response:
```
[
    {
        "parcelID": 7,
        "receiverID": 1,
        "driverID": 1,
        "status": "created",
        "parcelDescription": "Sample Parcel 1",
        "pickupAddress": "123 Main St, City",
        "deliveryAddress": "456 Elm St, City",
        "deliveryDate": "2023-11-09T22:00:00.000Z",
        "deliveryNotes": "Fragile, handle with care"
    },
    
```
---
## Retrieve All Parcels

**Endpoint:** `GET /getAllParcels`

This endpoint retrieves a list of all parcels from the Parcels table.

**Request:**

- Method: `GET`
- URL: `http://[website]/api/parcels/getAllParcels`

**Response:**

- Status: `200 OK`
- Body: A JSON array containing the list of parcels.

---

## Retrieve Parcel by ID

**Endpoint:** `GET /:parcelID`

This endpoint allows you to retrieve a specific parcel by its parcelID.

**Request:**

- Method: `GET`
- URL: `/:parcelID`
- Params:
  - `parcelID` (number): The unique identifier of the parcel to retrieve.

**Response:**

- Status: `200 OK`
- Body: A JSON object containing the details of the specified parcel.

---

## Create a New Parcel

**Endpoint:** `POST /createParcel`

This endpoint allows you to create a new parcel.

**Request:**

- Method: `POST`
- URL: `/createParcel`
- Body: JSON object with the following fields:
  - `receiverID` (number): ID of the receiver.
  - `driverID` (number): ID of the driver.
  - `status` (number): Status of the parcel.
  - `parcelDescription` (string): Description of the parcel.
  - `pickupAddress` (string): Address for parcel pickup.
  - `deliveryAddress` (string): Address for parcel delivery.
  - `deliveryDate` (date): Date for parcel delivery.
  - `deliveryNotes` (string): Additional delivery notes.

**Response:**

- Status: `201 Created` (if the parcel is created successfully)
- Status: `500 Internal Server Error` (if the creation fails)

---

## Update Parcel Status

**Endpoint:** `PUT /status/:parcelID`

This endpoint allows you to update the status of a parcel by its parcelID.

**Request:**

- Method: `PUT`
- URL: `/status/:parcelID`
- Params:
  - `parcelID` (number): The unique identifier of the parcel to update.
- Body: JSON object with the following field:
  - `status` (number): New status for the parcel.

**Response:**

- Status: `200 OK`
- Body: A success message indicating that the parcel's status has been updated.

---

## Delete Parcel

**Endpoint:** `DELETE /deleteParcel/:parcelID`

This endpoint allows you to delete a parcel by its parcelID.

**Request:**

- Method: `DELETE`
- URL: `/deleteParcel/:parcelID`
- Params:
  - `parcelID` (number): The unique identifier of the parcel to delete.

**Response:**

- Status: `200 OK`
- Body: A success message indicating that the parcel has been deleted.

---

### Client endpoints

### Locker database endpoints