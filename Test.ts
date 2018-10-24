import { Trip, Waypoint, Location, WaypointType, IWaypointOutput } from "./types";
import { execute } from "./TSPPD"

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
        console.log(`Trip ${element.tripId} ${convertWaypointType(element.type)}`);
    });
}

//create an example set of trips
let ts = [
    new Trip("A", new Waypoint(1, new Location(2, 6)), new Waypoint(2, new Location(0, 1))),
    new Trip("B", new Waypoint(1, new Location(1, 0)), new Waypoint(2, new Location(2, 6))),
    new Trip("C", new Waypoint(1, new Location(2, 2)), new Waypoint(2, new Location(3, 6))),
    new Trip("D", new Waypoint(1, new Location(6, 3)), new Waypoint(2, new Location(3, 6))),
    new Trip("E", new Waypoint(1, new Location(3, 4)), new Waypoint(2, new Location(5, 8))),
];

//Call execute with our example set
let route = execute(ts);
printWaypointOutputs(route);