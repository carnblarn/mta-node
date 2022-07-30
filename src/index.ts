import axios from 'axios';
import parseGtfs from './parseGtfs';
import { FeedMessage } from './protoTypes/gtfs-realtime_pb';
import { FeedId } from './types';

const realtimeUrl = 'http://datamine.mta.info/mta_esi.php';

export interface StationTime {
    tripId: string;
    routeId: string;
    delay?: number;
    arrivalTime: number;
}

export interface StationTimes {
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
        message.entity.forEach((feedEntity) => {
            if (feedEntity.tripUpdate) {
                const tripUpdate = feedEntity.tripUpdate;
                tripUpdate.stopTimeUpdate.forEach((stopTimeUpdate) => {
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
    betaKey?: string;
    constructor(key: string, betaKey?: string) {
        this.key = key;
        this.betaKey = betaKey;
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
            .then((response) => {
                return parseGtfs(response);
            })
            .then((data) => {
                const message = data as any as FeedMessage;
                return parseGtfsJson(message);
            });
    }

    getRealtimeArrivalsBeta(feedId: FeedId): Promise<StationTimes> {
        if (!feedId) {
            throw new Error('A Feed ID must be provided');
        }
        if (!this.key) {
            throw new Error('No API key present');
        }
        if (!this.betaKey) {
            throw new Error(' A beta key is required');
        }
        const parsedFeedId = parseInt(feedId as string);
        let routeKey: string = ''; // because this is better?
        if (feedId == 1) {
            routeKey = '';
        } else if (parsedFeedId === 26) {
            routeKey = '-ace';
        } else if (parsedFeedId === 16) {
            routeKey = '-nqrw';
        } else if (parsedFeedId === 21) {
            routeKey = '-bdfm';
        } else if (parsedFeedId === 2) {
            routeKey = '-l';
        } else if (parsedFeedId === 31) {
            routeKey = '-g';
        } else if (parsedFeedId === 36) {
            routeKey = '-jz';
        } else if (parsedFeedId === 11) {
            routeKey = '-si';
        }
        return axios({
            method: 'GET',
            url: `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs${routeKey}`,
            responseType: 'arraybuffer',
            headers: {
                'x-api-key': this.betaKey,
            },
        })
            .then((response) => {
                return parseGtfs(response);
            })
            .then((data) => {
                const message = data as any as FeedMessage;
                return parseGtfsJson(message);
            });
    }
}
