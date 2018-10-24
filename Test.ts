import { Trip, Waypoint, TSLocation } from "./types";
import { execute, printWaypointOutputs } from "./TSPPD"

//create an example set of trips
let ts = [
    new Trip("A", new Waypoint(1, new TSLocation(2, 6)), new Waypoint(2, new TSLocation(0, 1))),
    new Trip("B", new Waypoint(1, new TSLocation(1, 0)), new Waypoint(2, new TSLocation(2, 6))),
    new Trip("C", new Waypoint(1, new TSLocation(2, 2)), new Waypoint(2, new TSLocation(3, 6))),
    new Trip("D", new Waypoint(1, new TSLocation(6, 3)), new Waypoint(2, new TSLocation(3, 6))),
    new Trip("E", new Waypoint(1, new TSLocation(3, 4)), new Waypoint(2, new TSLocation(5, 8))),
];

//Call execute with our example set
let route = execute(ts);
printWaypointOutputs(route);