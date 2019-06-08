# MTA Node

This is a wrapper for the [MTA API](https://datamine.mta.info/) that runs on Node written in Typescript.

## Installation

Run `npm install mta-node` to install (it has not been registered yet). An API key from the MTA is required to use their API. Get one here: https://datamine.mta.info/user/register

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

Response:

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

-   The Northbound and Southbound designations are arbitrary and sometimes do not line up with the actual direction of the line. The L train, for example, has northbound as going into Manhattan, and southbound as going into Brooklyn.
