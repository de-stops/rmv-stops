'use strict'
const got = require('got');
const json2csv = require('json2csv');

const endpointBase = "https://www.rmv.de/auskunft/bin/jp/query.exe/3deuny?performLocating=2&tpl=stop2json&look_stopclass=2147483647";
const maxStops = 500;

const queryStops = function(minx, miny, maxx, maxy, callback) {
	const url = endpointBase + "&look_minx=" + minx + "&look_miny=" + miny + "&look_maxx=" + maxx + "&look_maxy=" + maxy;
	// console.log("Querying " + minx + ", " + miny + ", " + maxx + ", " + maxy + ".");
	got(url).then(response => {
		const result = JSON.parse(response.body);
		if (result.stops.length < maxStops) {
			// console.log("Got " + result.stops.length + " stops.");
			result.stops.forEach(callback);
		}
		else
		{
			// console.log("Got " + result.stops.length + ", more than " + maxStops +" stops, querying for sub-quadrants");
			const midx = Math.round((minx + maxx) / 2);
			const midy = Math.round((miny + maxy) / 2);
			queryStops(minx, miny, midx, midy, callback);
			queryStops(midx, miny, maxx, midy, callback);
			queryStops(minx, midy, midx, maxy, callback);
			queryStops(midx, midy, maxx, maxy, callback);
		}
	});
};

const exportStops = function(stops) {
	const result = json2csv({ data: stops, fields: ['extId', "planId", "puic", "prodclass", "name", "urlname", "x", "y"] });
	process.stdout.write(result);
}

const retrieveStops = function(minx, miny, maxx, maxy) {
	const stops = [];
	const stopsByExtId = {};
	const callback = stop => {
		stop.extId = Number(stop.extId);
		stop.planId = Number(stop.planId);
		stop.x = Number(stop.x)/1000000;
		stop.y = Number(stop.y)/1000000;
		stop.prodclass = Number(stop.prodclass);
		stop.puic = Number(stop.puic);

		const extId = stop.extId;
		const existingStop = stopsByExtId[extId]
		if (existingStop &&(
			stop.x !== existingStop.x ||
			stop.y !== existingStop.y ||
			stop.name !== existingStop.name ||
			stop.urlname !== existingStop.urlname ||
			stop.prodclass !== existingStop.prodclass ||
			stop.puic !== existingStop.puic ||
			stop.planId !== existingStop.planId)) {
			throw new Error("Found existing stop with extId " + extId);
		}
		else {
			// console.log("Got new stop with extId:" + extId);
			stopsByExtId[extId] = stop;
			stops.push(stop);
		}
	};
	queryStops(minx, miny, maxx, maxy, callback);
	setTimeout(function () { exportStops(stops); }, 10000);
};

retrieveStops(5000000, 47000000, 15000000, 56000000);