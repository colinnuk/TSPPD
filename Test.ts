import { Trip, Waypoint, TSLocation } from "./types";
import { execute, printWaypointOutputs } from "./TSPPD"

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