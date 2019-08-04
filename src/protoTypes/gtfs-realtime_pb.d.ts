// package: transit_realtime
// file: gtfs-realtime.proto

import {
    NyctFeedHeader,
    NyctTripDescriptor,
    NyctStopTimeUpdate,
} from './nyct-subway_pb';

export interface FeedMessage {
    header: FeedHeader;
    entity: FeedEntity[];
}

export interface FeedHeader {
    gtfsRealtimeVersion: string;
    timestamp: {
        low: number;
        high: number;
        unsigned: boolean;
    };
    '.nyctFeedHeader': NyctFeedHeader;
}

export interface FeedEntity {
    id: string;
    tripUpdate?: TripUpdate;
    vehicle?: VehiclePosition;
}

export interface TripUpdate {
    trip: TripDescriptor;
    stopTimeUpdate: StopTimeUpdate[];
    delay?: number;
}

export interface VehiclePosition {
    trip?: TripDescriptor;
    position?: Position;
    currentStopSequence?: number;
    stopId?: string;
    currentStatus?: number;
    timestamp?: number;
}

export interface TripDescriptor {
    tripId: string;
    startDate: string;
    routeId: string;
    '.nyctTripDescriptor': NyctTripDescriptor;
}

export interface StopTimeUpdate {
    arrival?: StopTimeEvent;
    departure?: StopTimeEvent;
    scheduleRelationship: string;
    stopId: string;
    '.nyctStopTimeUpdate': NyctStopTimeUpdate;
}

interface StopTimeEvent {
    delay?: number;
    time: {
        low: number;
        high: number;
        unsigned: boolean;
    };
    uncertainty?: number;
}
