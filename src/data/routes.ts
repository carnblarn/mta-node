import { Route } from '../types';
const routes: { [name: string]: Route } = {
    red: {
        lines: ['1', '2', '3'],
        feedId: 1,
        name: 'red',
    },
    green: {
        feedId: 1,
        lines: ['4', '5', '6', '6X', '5X'],
        name: 'green',
    },
    blue: {
        feedId: 26,
        lines: ['A', 'C', 'E'],
        name: 'blue',
    },
    yellow: {
        feedId: 16,
        lines: ['N', 'Q', 'R', 'W'],
        name: 'yellow',
    },
    orange: {
        feedId: 21,
        lines: ['B', 'D', 'F', 'M'],
        name: 'orange',
    },
    grey: {
        feedId: 2,
        lines: ['L'],
        name: 'grey',
    },
    lightGreen: {
        feedId: 31,
        lines: ['G'],
        name: 'lightGreen',
    },
    brown: {
        feedId: 36,
        lines: ['J', 'Z'],
        name: 'brown',
    },
    purple: {
        feedId: 51,
        lines: ['7', '7X'],
        name: 'purple',
    },
    darkGrey: {
        feedId: 1,
        lines: ['S', 'GS', 'FS', 'H'],
        name: 'darkGrey',
    },
    darkBlue: {
        feedId: 11,
        lines: ['SIR', 'SS', 'SI'],
        name: 'darkBlue',
    },
};

export default routes;
