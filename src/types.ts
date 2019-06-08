export interface Stop {
    feedId?: number; // used for overwriting the line's feed i
    id: string;
    lat: number;
    line: Array<Line>;
    lon: number;
    name: string;
    route: string; //color
}

export interface Route {
    lines: Array<Line>;
    feedId: number;
    name: string;
}

export type Line =
    | '7'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '5X'
    | '6'
    | '6X'
    | '7'
    | '7X'
    | 'A'
    | 'C'
    | 'E'
    | 'B'
    | 'D'
    | 'F'
    | 'M'
    | 'G'
    | 'J'
    | 'Z'
    | 'L'
    | 'M'
    | 'N'
    | 'Q'
    | 'R'
    | 'W'
    | 'S'
    | 'SIR'
    | 'GS'
    | 'FS'
    | 'H'
    | 'SS'
    | 'SI';

export type FeedId =
    | 1
    | 26
    | 16
    | 21
    | 2
    | 31
    | 36
    | 51
    | 11
    | '1'
    | '26'
    | '16'
    | '21'
    | '2'
    | '31'
    | '36'
    | '51'
    | '11';
