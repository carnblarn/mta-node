// package:
// file: nyct-subway.proto

import * as gtfs_realtime_pb from './gtfs-realtime_pb';

export interface TripReplacementPeriod {
    routeId: number;
    replacementPeriod: {
        end: any;
    };
}

export interface NyctFeedHeader {
    tripReplacementPeriod: TripReplacementPeriod[];
    nyctSubwayVersion: string;
}

export type NyctTripDescriptor = {
    trainId?: string;
    isAssigned?: boolean;
    direction?: DirectionMap[keyof DirectionMap];
};

// I'm like fairly sure this is always 1 or 3
export interface DirectionMap {
    NORTH: 1;
    EAST: 2;
    SOUTH: 3;
    WEST: 4;
}

export const Direction: DirectionMap;

export interface NyctStopTimeUpdate {
    scheduledTrack?: string;
    actualTrack?: string;
}
