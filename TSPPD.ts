/// <reference path='types.ts'/>

function printWaypointOutputs(waypoints: IWaypointOutput[])
{
    route.forEach(element => {
        console.log("Trip " + element.tripId + " " + element.type);
    });
}

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
const execute = (trips: ITrip[]): IWaypointOutput[] => 
{

    

    return []
}

//create an example set of trips
var ts = [
    new Trip("1", new Waypoint(1, new TSLocation(0, 0)), new Waypoint(2, new TSLocation(3, 6))),
    new Trip("2", new Waypoint(1, new TSLocation(1, 0)), new Waypoint(2, new TSLocation(2, 6))),
    new Trip("3", new Waypoint(1, new TSLocation(2, 2)), new Waypoint(2, new TSLocation(3, 6))),
    new Trip("4", new Waypoint(1, new TSLocation(6, 3)), new Waypoint(2, new TSLocation(3, 6))),
    new Trip("5", new Waypoint(1, new TSLocation(3, 4)), new Waypoint(2, new TSLocation(5, 8))),
];

//Call execute with our example set
var route = execute(ts);
printWaypointOutputs(route);