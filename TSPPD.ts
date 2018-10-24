import { IWaypointOutput, ILocation, ITrip, WaypointOutput, Trip, Waypoint, TSLocation, WaypointType, IWaypoint } from "./types";

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
    let firstTrip = trips.pop();
    let route = [new WaypointOutput(firstTrip.id, WaypointType.Pickup)];
    
    //create a list of nodes we need to visit and add the dropoff waypoint for our starting waypoint
    let waypointsToVisit: {[key: string]: IWaypoint} = {};
    waypointsToVisit[firstTrip.id] = firstTrip.dropoffWaypoint;

    //stores an assoc array we can quickly get the dropoffs out of
    let dropoffWaypoints: {[key: string]: IWaypoint} = {};

    //fill waypointsToVisit with other pickups
    trips.forEach(element => {
        waypointsToVisit[element.id] = element.pickupWaypoint;
        dropoffWaypoints[element.id] = element.dropoffWaypoint;
    });

    let currentLocation = firstTrip.pickupWaypoint.location;
    while(Object.keys(waypointsToVisit).length > 0)
    {
        //While there are still nodes to visit
        // Get the nearest neighbouring trip & remove it from waypointsToVisit
        let nearestTrip = findNearestTrip(waypointsToVisit, currentLocation);
        let nearestTripWaypoint = waypointsToVisit[nearestTrip];
        currentLocation = nearestTripWaypoint.location;
        delete waypointsToVisit[nearestTrip];
        
        // add waypoint to output
        route.push(new WaypointOutput(nearestTrip, nearestTripWaypoint.type));
        
        // If it’s a pickup, add the corresponding drop off to waypointsToVisit
        if(nearestTripWaypoint.type == WaypointType.Pickup)
            waypointsToVisit[nearestTrip] = dropoffWaypoints[nearestTrip];
        
    }
    
    return route;
}

export const findNearestTrip = (waypointList: {[key: string]: IWaypoint}, currentLocation: ILocation): string =>
{
    //find the nearest neighbouring trip
    let nearestNeighbour: string;
    let nearestNeighbourDist = Infinity;

    Object.keys(waypointList).forEach(element => {
        let dist = distance(waypointList[element].location, currentLocation);
        if(dist < nearestNeighbourDist)
        {
            nearestNeighbour = element;
            nearestNeighbourDist = dist;
        }
    });

    return nearestNeighbour;
}

const convertWaypointType = (pickupType: WaypointType): string =>
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
