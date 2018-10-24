import { IWaypointOutput, ILocation, ITrip, WaypointOutput, WaypointType, IWaypoint, ILeg, Leg } from "./types";

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

    //stores an assoc array we can quickly get the dropoffs out of per trip
    let dropoffWaypoints: {[key: string]: IWaypoint} = {};

    //fill waypointsToVisit with other pickups and add all other dropoffs to our assoc array of dropoffs
    trips.forEach(element => {
        waypointsToVisit[element.id] = element.pickupWaypoint;
        dropoffWaypoints[element.id] = element.dropoffWaypoint;
    });

    let currentLocation = firstTrip.pickupWaypoint.location;
    while(Object.keys(waypointsToVisit).length > 0)
    {
        //While there are still nodes to visit
        // Get the nearest neighbouring leg of the trip & remove it from waypointsToVisit
        let nearestLeg = findNearestLeg(waypointsToVisit, currentLocation);
        currentLocation = nearestLeg.waypoint.location;
        delete waypointsToVisit[nearestLeg.tripId];
        
        // add waypoint to output
        route.push(new WaypointOutput(nearestLeg.tripId, nearestLeg.waypoint.type));
        
        // If it’s a pickup, add the corresponding drop off to waypointsToVisit
        if(nearestLeg.waypoint.type == WaypointType.Pickup)
            waypointsToVisit[nearestLeg.tripId] = dropoffWaypoints[nearestLeg.tripId];

    }
    
    return route;
}

/**
*
* @param waypointList Associative array of waypoints we can go to next
* @param currentLocation Our current location
* @returns The next leg of the trip to take. This is the closest Waypoint to our current location.
*/
export const findNearestLeg = (waypointList: {[key: string]: IWaypoint}, currentLocation: ILocation): ILeg =>
{
    //find the nearest neighbouring trip
    let nearestNeighbour: ILeg;
    let nearestNeighbourDist: number = Infinity;

    Object.keys(waypointList).forEach(element => {
        let dist = distance(waypointList[element].location, currentLocation);
        if(dist < nearestNeighbourDist)
        {
            nearestNeighbour = new Leg(element, waypointList[element]);
            nearestNeighbourDist = dist;
        }
    });

    return nearestNeighbour;
}