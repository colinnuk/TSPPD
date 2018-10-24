"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var TSPPD_1 = require("./TSPPD");
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
exports.printWaypointOutputs = printWaypointOutputs;
//create an example set of trips
var ts = [
    new types_1.Trip("A", new types_1.Waypoint(1, new types_1.Location(2, 6)), new types_1.Waypoint(2, new types_1.Location(0, 1))),
    new types_1.Trip("B", new types_1.Waypoint(1, new types_1.Location(1, 0)), new types_1.Waypoint(2, new types_1.Location(2, 6))),
    new types_1.Trip("C", new types_1.Waypoint(1, new types_1.Location(2, 2)), new types_1.Waypoint(2, new types_1.Location(3, 6))),
    new types_1.Trip("D", new types_1.Waypoint(1, new types_1.Location(6, 3)), new types_1.Waypoint(2, new types_1.Location(3, 6))),
    new types_1.Trip("E", new types_1.Waypoint(1, new types_1.Location(3, 4)), new types_1.Waypoint(2, new types_1.Location(5, 8))),
];
//Call execute with our example set
var route = TSPPD_1.execute(ts);
printWaypointOutputs(route);
//# sourceMappingURL=Test.js.map