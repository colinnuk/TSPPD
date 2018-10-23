type TripId = string

interface ILocation 
{
    latitude: number,
    longitude: number
}

enum WaypointType 
{
    Pickup = 1,
    Dropoff = 2
}

interface IWaypoint
{
    type: WaypointType
    location: ILocation
}

interface ITrip 
{
    id: TripId
    pickupWaypoint: IWaypoint
    dropoffWaypoint: IWaypoint
}

interface IWaypointOutput 
{
    tripId: TripId
    type: WaypointType
}

class TSLocation implements ILocation 
{
    constructor(latitude: number, longitude: number)
    {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    
    latitude: number;    
    longitude: number;
}

class Waypoint implements IWaypoint 
{
    constructor(type: WaypointType, location: ILocation)
    {
        this.type = type;
        this.location = location;
    }
    
    type: WaypointType;    
    location: ILocation;
}

class Trip implements ITrip 
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

class WaypointOutput implements IWaypointOutput
{
    constructor(tripId: string, type: WaypointType)
    {
        this.tripId = tripId;
        this.type = type;
    }
    
    tripId: string;
    type: WaypointType;
}