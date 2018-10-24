"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var TSPPD_1 = require("./TSPPD");
var chai_1 = require("chai");
var convertWaypointType = function (pickupType) {
    switch (pickupType) {
        case types_1.WaypointType.Pickup: return "Pickup";
        case types_1.WaypointType.Dropoff: return "Dropoff";
    }
};
function printWaypointOutputs(waypoints) {
    waypoints.forEach(function (element) {
        console.log("Trip " + element.tripId + " " + convertWaypointType(element.type));
    });
}
describe('execute', function () {
    //create an example set of trips
    var testTrips = [
        new types_1.Trip("A", new types_1.Waypoint(1, new types_1.Location(2, 6)), new types_1.Waypoint(2, new types_1.Location(0, 1))),
        new types_1.Trip("B", new types_1.Waypoint(1, new types_1.Location(1, 0)), new types_1.Waypoint(2, new types_1.Location(2, 6))),
        new types_1.Trip("C", new types_1.Waypoint(1, new types_1.Location(2, 2)), new types_1.Waypoint(2, new types_1.Location(3, 6))),
        new types_1.Trip("D", new types_1.Waypoint(1, new types_1.Location(6, 3)), new types_1.Waypoint(2, new types_1.Location(3, 6))),
        new types_1.Trip("E", new types_1.Waypoint(1, new types_1.Location(3, 4)), new types_1.Waypoint(2, new types_1.Location(5, 8))),
    ];
    var expectedWaypoints = [
        new types_1.WaypointOutput("E", types_1.WaypointType.Pickup),
        new types_1.WaypointOutput("A", types_1.WaypointType.Pickup),
        new types_1.WaypointOutput("E", types_1.WaypointType.Dropoff),
        new types_1.WaypointOutput("D", types_1.WaypointType.Pickup),
        new types_1.WaypointOutput("C", types_1.WaypointType.Pickup),
        new types_1.WaypointOutput("B", types_1.WaypointType.Pickup),
        new types_1.WaypointOutput("A", types_1.WaypointType.Dropoff),
        new types_1.WaypointOutput("B", types_1.WaypointType.Dropoff),
        new types_1.WaypointOutput("D", types_1.WaypointType.Dropoff),
        new types_1.WaypointOutput("C", types_1.WaypointType.Dropoff),
    ];
    it('should return correct list of IWaypointOutput', function () {
        var result = TSPPD_1.execute(testTrips);
        chai_1.expect(result).to.deep.equal(expectedWaypoints);
    });
});
describe('distance', function () {
    var loc1 = new types_1.Location(0, 0);
    var loc2 = new types_1.Location(2, 2);
    it('calculate distance correctly', function () {
        var result = TSPPD_1.distance(loc1, loc2);
        chai_1.expect(result).to.approximately(2.828, 0.001);
    });
});
describe('findNearestLeg', function () {
    var loc = new types_1.Location(0, 0);
    var waypointList = {};
    waypointList["A"] = new types_1.Waypoint(types_1.WaypointType.Pickup, new types_1.Location(2, 0));
    waypointList["B"] = new types_1.Waypoint(types_1.WaypointType.Pickup, new types_1.Location(12, 2));
    it('get the nearest leg', function () {
        var result = TSPPD_1.findNearestLeg(waypointList, loc);
        chai_1.expect(result).to.deep.equal(new types_1.Leg("A", new types_1.Waypoint(types_1.WaypointType.Pickup, new types_1.Location(2, 0)), 2));
    });
});
//# sourceMappingURL=Test.js.map