export type TripId = string

export interface ILocation 
{
    latitude: number,
    longitude: number
}

export enum WaypointType 
{
    Pickup = 1,
    Dropoff = 2
}

export interface IWaypoint
{
    type: WaypointType
    location: ILocation
}

export interface ITrip 
{
    id: TripId
    pickupWaypoint: IWaypoint
    dropoffWaypoint: IWaypoint
}

export interface IWaypointOutput 
{
    tripId: TripId
    type: WaypointType
}

export interface ILeg
{
    tripId: TripId
    waypoint: IWaypoint
}

export class Location implements ILocation 
{
    constructor(latitude: number, longitude: number)
    {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    
    latitude: number;    
    longitude: number;
}

export class Waypoint implements IWaypoint 
{
    constructor(type: WaypointType, location: ILocation)
    {
        this.type = type;
        this.location = location;
    }
    
    type: WaypointType;    
    location: ILocation;
}

export class Trip implements ITrip 
{
    constructor(id: string, pickupWaypoint: Waypoint, dropoffWaypoint: Waypoint)
    {
        this.id = id;
        this.pickupWaypoint = pickupWaypoint;
        this.dropoffWaypoint = dropoffWaypoint;
    }
    
    id: string;    
    pickupWaypoint: IWaypoint;
    dropoffWaypoint: IWaypoint;
}

export class WaypointOutput implements IWaypointOutput
{
    constructor(tripId: TripId, type: WaypointType)
    {
        this.tripId = tripId;
        this.type = type;
    }
    
    tripId: TripId;
    type: WaypointType;
}

export class Leg implements ILeg
{
    constructor(tripId: TripId, waypoint: IWaypoint)
    {
        this.tripId = tripId;
        this.waypoint = waypoint;
    }

    tripId: TripId;
    waypoint: IWaypoint;
}