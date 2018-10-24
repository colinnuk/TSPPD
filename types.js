"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WaypointType;
(function (WaypointType) {
    WaypointType[WaypointType["Pickup"] = 1] = "Pickup";
    WaypointType[WaypointType["Dropoff"] = 2] = "Dropoff";
})(WaypointType = exports.WaypointType || (exports.WaypointType = {}));
var Location = /** @class */ (function () {
    function Location(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    return Location;
}());
exports.Location = Location;
var Waypoint = /** @class */ (function () {
    function Waypoint(type, location) {
        this.type = type;
        this.location = location;
    }
    return Waypoint;
}());
exports.Waypoint = Waypoint;
var Trip = /** @class */ (function () {
    function Trip(id, pickupWaypoint, dropoffWaypoint) {
        this.id = id;
        this.pickupWaypoint = pickupWaypoint;
        this.dropoffWaypoint = dropoffWaypoint;
    }
    return Trip;
}());
exports.Trip = Trip;
var WaypointOutput = /** @class */ (function () {
    function WaypointOutput(tripId, type) {
        this.tripId = tripId;
        this.type = type;
    }
    return WaypointOutput;
}());
exports.WaypointOutput = WaypointOutput;
var Leg = /** @class */ (function () {
    function Leg(tripId, waypoint, distance) {
        this.tripId = tripId;
        this.waypoint = waypoint;
        this.distance = distance;
    }
    return Leg;
}());
exports.Leg = Leg;
//# sourceMappingURL=types.js.map