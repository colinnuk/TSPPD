import { IWaypointOutput, ILocation, ITrip, WaypointOutput, Trip, Waypoint, TSLocation, WaypointType } from "./types";

/**
*
* @param location1 Input location
* @param location2 Input location
* @returns Very simple crow distance between 2 points
*/
const distance = (location1: ILocation, location2: ILocation): number => 
{
    const dlat = (location2.latitude - location1.latitude)
    const dlon = (location2.longitude - location1.longitude)
    return Math.sqrt(dlat * dlat + dlon * dlon)
}

/**
*
* @param trips List of rider trips
* @returns List of waypoints outputs in the most efficient
* order (minimizing distance between locations)
*/
export const execute = (trips: ITrip[]): IWaypointOutput[] => 
{

    
    var route = [new WaypointOutput("1", 1),];
    return route;
}

function convertWaypointType(pickupType: WaypointType)
{
    switch(pickupType)
    {
        case WaypointType.Pickup:  return "Pickup";
        case WaypointType.Dropoff:  return "Dropoff";
    }
}

export function printWaypointOutputs(waypoints: IWaypointOutput[])
{
    waypoints.forEach(element => {
        console.log("Trip " + element.tripId + " " + convertWaypointType(element.type));
    });
}
