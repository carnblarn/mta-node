# MTA Node

This is a wrapper for the [MTA Realtime Feeds](https://datamine.mta.info/) that runs on Node written in Typescript.

## Installation

Run `npm install mta-node` to install (it has not been registered yet, though).

An API key from the MTA is required to use their API. Get one here: https://datamine.mta.info/user/register

## Usage

First, instantiate the wrapper.

```javascript
import Mta from 'mta-node';
const MtaApi = new Mta(API_KEY);
```

### Methods

```javascript
MtaApi.getRealtimeArrivals(FEED_ID).then(result => console.log(result));
```

The `feedId` for a route can be found on this page: http://datamine.mta.info/list-of-feeds.

Example response:

```javascript
{
    '635': { // the stopId for Union Square, on the 4/5/6 lines
        'N': [...], // arrival times for northbound trains
        'S': [...], // arrival times for southbound trains
    },
    ...
}
```

## Notes

-   A stop is classified as being a set of subway tracks at a subway station. For some stops, there will only be one stop id because all trains that go through on the station are on the same tracks. For others, there are multiple pairs of tracks for different lines and each one of these will have a different stop id.
    -   For example, Union Square station consists of three different stop ids. One is for the 4/5/6 trains, one is for the N/Q/R/W trains, and one is for the L train.
    -   The 7 and L trains never share tracks with another line, so each of their stop ids will only ever serve times for the specific train.
-   An up to date file of all MTA data including stops and routes can be found here: http://web.mta.info/developers/data/nyct/subway/google_transit.zip. Alternatively, there is a JSON file of all the stops in this repo at [src/data/stops.ts](src/data/stops.ts)
-   The Northbound and Southbound designations are arbitrary and sometimes do not line up with the actual direction of the line. The L train, for example, has northbound as going into Manhattan, and southbound as going into Brooklyn.
