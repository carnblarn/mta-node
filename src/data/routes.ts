import { Route } from '../types';
const routes: { [name: string]: Route } = {
    red: {
        lines: ['1', '2', '3'],
        feedId: 1,
        color: '#D24D57',
        name: 'red',
    },
    green: {
        feedId: 1,
        lines: ['4', '5', '6', '6X', '5X'],
        color: '#1E824C',
        name: 'green',
    },
    blue: {
        feedId: 26,
        lines: ['A', 'C', 'E'],
        color: '#446CB3',
        name: 'blue',
    },
    yellow: {
        feedId: 16,
        lines: ['N', 'Q', 'R', 'W'],
        color: 'rgba(249, 180, 45,1)',
        name: 'yellow',
    },
    orange: {
        feedId: 21,
        lines: ['B', 'D', 'F', 'M'],
        color: '#F2784B',
        name: 'orange',
    },
    grey: {
        feedId: 2,
        lines: ['L'],
        color: 'rgba(161, 173, 173, 1)',
        name: 'grey',
        northbound: 'Manhattan Bound',
        southbound: 'Brooklyn Bound',
    },
    lightGreen: {
        feedId: 31,
        lines: ['G'],
        color: 'rgba(46, 204, 113, 1)',
        name: 'lightGreen',
    },
    brown: {
        feedId: 36,
        lines: ['J', 'Z'],
        color: '#996633',
        name: 'brown',
        // god damn wrong way concurrencies
        northbound: 'Brooklyn Bound',
        southbound: 'Manhattan Bound',
    },
    purple: {
        feedId: 51,
        lines: ['7', '7X'],
        color: '#8E44AD',
        name: 'purple',
    },
    darkGrey: {
        feedId: 1,
        lines: ['S', 'GS', 'FS', 'H'],
        color: '#6C7A89',
        name: 'darkGrey',
    },
    darkBlue: {
        feedId: 11,
        lines: ['SIR', 'SS', 'SI'],
        color: '#1F3A93',
        name: 'darkBlue',
    },
};

export default routes;
