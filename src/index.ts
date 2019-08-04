import axios from 'axios';
import parseGtfs from './parseGtfs';
import { FeedMessage } from './protoTypes/gtfs-realtime_pb';
import { FeedId } from './types';

const realtimeUrl = 'http://datamine.mta.info/mta_esi.php';

interface StationTime {
    tripId: string;
    routeId: string;
    delay?: number;
    arrivalTime: number;
}

interface StationTimes {
    stations: {
        [stopId: string]: {
            N: StationTime[];
            S: StationTime[];
        };
    };
}

const parseGtfsJson = (message: FeedMessage): StationTimes => {
    const returnObj: StationTimes = {
        stations: {},
    };
    if (message.entity.length > 0) {
        message.entity.forEach(feedEntity => {
            if (feedEntity.tripUpdate) {
                const tripUpdate = feedEntity.tripUpdate;
                tripUpdate.stopTimeUpdate.forEach(stopTimeUpdate => {
                    const updateStopId = stopTimeUpdate.stopId.substring(
                        0,
                        stopTimeUpdate.stopId.length - 1
                    );
                    const direction = stopTimeUpdate.stopId.substring(
                        stopTimeUpdate.stopId.length - 1
                    );
                    if (!returnObj.stations[updateStopId]) {
                        returnObj.stations[updateStopId] = {
                            N: [],
                            S: [],
                        };
                    }
                    // if it's a final station departures should be used instead
                    if (stopTimeUpdate.arrival && !stopTimeUpdate.departure) {
                        return;
                    }
                    const times = stopTimeUpdate.arrival
                        ? stopTimeUpdate.arrival
                        : stopTimeUpdate.departure;
                    if (!times) {
                        return;
                    }
                    if (direction === 'N') {
                        returnObj.stations[updateStopId].N.push({
                            tripId: tripUpdate.trip.tripId,
                            routeId: tripUpdate.trip.routeId,
                            delay: times.delay,
                            arrivalTime: times.time.low,
                        });
                    } else if (direction === 'S') {
                        returnObj.stations[updateStopId].S.push({
                            tripId: tripUpdate.trip.tripId,
                            routeId: tripUpdate.trip.routeId,
                            delay: times.delay,
                            arrivalTime: times.time.low,
                        });
                    }
                });
            }
        });
    }
    return returnObj;
};

export default class MtaApi {
    key?: string;
    constructor(key: string) {
        this.key = key;
    }

    getRealtimeArrivals(feedId: FeedId): Promise<StationTimes> {
        if (!feedId) {
            throw new Error('A Feed ID must be provided');
        }
        if (!this.key) {
            throw new Error('No API key present');
        }
        return axios({
            method: 'GET',
            url: realtimeUrl,
            responseType: 'arraybuffer',
            params: {
                key: this.key,
                feed_id: feedId,
            },
        })
            .then(response => {
                return parseGtfs(response);
            })
            .then(data => {
                const message = (data as any) as FeedMessage;
                return parseGtfsJson(message);
            });
    }
}
