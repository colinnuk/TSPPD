"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
/**
*
* @param location1 Input location
* @param location2 Input location
* @returns Very simple crow distance between 2 points
*/
exports.distance = function (location1, location2) {
    var dlat = (location2.latitude - location1.latitude);
    var dlon = (location2.longitude - location1.longitude);
    return Math.sqrt(dlat * dlat + dlon * dlon);
};
/**
*
* @param trips List of rider trips
* @returns List of waypoints outputs in the most efficient
* order (minimizing distance between locations)
*/
exports.execute = function (trips) {
    var firstTrip = trips.pop();
    var route = [new types_1.WaypointOutput(firstTrip.id, types_1.WaypointType.Pickup)];
    //create a list of nodes we need to visit and add the dropoff waypoint for our starting waypoint
    var waypointsToVisit = {};
    waypointsToVisit[firstTrip.id] = firstTrip.dropoffWaypoint;
    //stores an assoc array we can quickly get the dropoffs out of per trip
    var dropoffWaypoints = {};
    //fill waypointsToVisit with other pickups and add all other dropoffs to our assoc array of dropoffs
    trips.forEach(function (element) {
        waypointsToVisit[element.id] = element.pickupWaypoint;
        dropoffWaypoints[element.id] = element.dropoffWaypoint;
    });
    var currentLocation = firstTrip.pickupWaypoint.location;
    while (Object.keys(waypointsToVisit).length > 0) {
        //While there are still nodes to visit
        // Get the nearest neighbouring leg of the trip & remove it from waypointsToVisit
        var nearestLeg = exports.findNearestLeg(waypointsToVisit, currentLocation);
        currentLocation = nearestLeg.waypoint.location;
        delete waypointsToVisit[nearestLeg.tripId];
        // add waypoint to output
        route.push(new types_1.WaypointOutput(nearestLeg.tripId, nearestLeg.waypoint.type));
        // If it’s a pickup, add the corresponding drop off to waypointsToVisit
        if (nearestLeg.waypoint.type == types_1.WaypointType.Pickup)
            waypointsToVisit[nearestLeg.tripId] = dropoffWaypoints[nearestLeg.tripId];
    }
    return route;
};
/**
*
* @param waypointList Associative array of waypoints we can go to next
* @param currentLocation Our current location
* @returns The next leg of the trip to take. This is the closest Waypoint to our current location.
*/
exports.findNearestLeg = function (waypointList, currentLocation) {
    //find the nearest neighbouring trip
    var nearestNeighbour;
    var nearestNeighbourDist = Infinity;
    Object.keys(waypointList).forEach(function (element) {
        var dist = exports.distance(waypointList[element].location, currentLocation);
        if (dist < nearestNeighbourDist) {
            nearestNeighbour = new types_1.Leg(element, waypointList[element], dist);
            nearestNeighbourDist = dist;
        }
    });
    return nearestNeighbour;
};
//# sourceMappingURL=TSPPD.js.map