import { Trip, Waypoint, Location, WaypointType, IWaypointOutput, WaypointOutput, IWaypoint, Leg } from "./types";
import { execute, distance, findNearestLeg } from "./TSPPD"
import { expect } from 'chai';
import 'mocha';

const convertWaypointType = (pickupType: WaypointType): string =>
{
    switch(pickupType)
    {
        case WaypointType.Pickup:  return "Pickup";
        case WaypointType.Dropoff:  return "Dropoff";
    }
}

function printWaypointOutputs(waypoints: IWaypointOutput[])
{
    waypoints.forEach(element => {
        console.log(`Trip ${element.tripId} ${convertWaypointType(element.type)}`);
    });
}

describe('execute', () => {
    //create an example set of trips
    const testTrips = [
        new Trip("A", new Waypoint(1, new Location(2, 6)), new Waypoint(2, new Location(0, 1))),
        new Trip("B", new Waypoint(1, new Location(1, 0)), new Waypoint(2, new Location(2, 6))),
        new Trip("C", new Waypoint(1, new Location(2, 2)), new Waypoint(2, new Location(3, 6))),
        new Trip("D", new Waypoint(1, new Location(6, 3)), new Waypoint(2, new Location(3, 6))),
        new Trip("E", new Waypoint(1, new Location(3, 4)), new Waypoint(2, new Location(5, 8))),
    ];

    const expectedWaypoints = [
        new WaypointOutput("E", WaypointType.Pickup),
        new WaypointOutput("A", WaypointType.Pickup),
        new WaypointOutput("E", WaypointType.Dropoff),
        new WaypointOutput("D", WaypointType.Pickup),
        new WaypointOutput("C", WaypointType.Pickup),
        new WaypointOutput("B", WaypointType.Pickup),
        new WaypointOutput("A", WaypointType.Dropoff),
        new WaypointOutput("B", WaypointType.Dropoff),
        new WaypointOutput("D", WaypointType.Dropoff),
        new WaypointOutput("C", WaypointType.Dropoff),
    ]

    it('should return correct list of IWaypointOutput', () => {  
        const result = execute(testTrips);  
        expect(result).to.deep.equal(expectedWaypoints);
    });
});

describe('distance', () => {
    const loc1 = new Location(0, 0);
    const loc2 = new Location(2, 2);

    it('calculate distance correctly', () => {
        const result = distance(loc1, loc2);
        expect(result).to.approximately(2.828, 0.001);
    });
});

describe('findNearestLeg', () => {
    const loc = new Location(0, 0);
    let waypointList: {[key: string]: IWaypoint} = {};
    waypointList["A"] = new Waypoint(WaypointType.Pickup, new Location(2, 0));
    waypointList["B"] = new Waypoint(WaypointType.Pickup, new Location(12, 2));

    it('get the nearest leg', () => {
        const result = findNearestLeg(waypointList, loc);
        expect(result).to.deep.equal(new Leg("A", new Waypoint(WaypointType.Pickup, new Location(2, 0)), 2));
    });
});