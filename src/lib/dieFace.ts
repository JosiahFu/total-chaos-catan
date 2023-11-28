// import { collectToObject, filterMap } from './utils';

// type Mk = ' ' | 'o';

// type Three<T> = [T, T, T];

// const gridPos = ['row-start-1', 'row-start-2', 'row-start-3']
//     .map(row =>
//         ['col-start-1', 'col-start-2', 'col-start-3'].map(
//             col => `${col} ${row}`
//         )
//     )
//     .flat(1);

// const dotStrings = [
//     ['   ', ' o ', '   '],
//     ['o  ', '   ', '  o'],
//     ['o  ', ' o ', '  o'],
//     ['o o', '   ', 'o o'],
//     ['o o', ' o ', 'o o'],
//     ['o o', 'o o', 'o o'],
// ] satisfies readonly Three<`${Mk}${Mk}${Mk}`>[];

// const dotLayout = dotStrings.map(face =>
//     face
//         .map(row => row.split(''))
//         .flat(1)
//         .reduce(...filterMap((e, i) => (e === 'o' ? gridPos[i] : undefined)))
// ).reduce(...collectToObject<string[], number, string[]>((e, i) => [i + 1, e]));

const dotLayout: Record<number, string[]> = {
    1: ['col-start-2 row-start-2'],
    2: ['col-start-1 row-start-1', 'col-start-3 row-start-3'],
    3: [
        'col-start-1 row-start-1',
        'col-start-2 row-start-2',
        'col-start-3 row-start-3',
    ],
    4: [
        'col-start-1 row-start-1',
        'col-start-3 row-start-1',
        'col-start-1 row-start-3',
        'col-start-3 row-start-3',
    ],
    5: [
        'col-start-1 row-start-1',
        'col-start-3 row-start-1',
        'col-start-2 row-start-2',
        'col-start-1 row-start-3',
        'col-start-3 row-start-3',
    ],
    6: [
        'col-start-1 row-start-1',
        'col-start-3 row-start-1',
        'col-start-1 row-start-2',
        'col-start-3 row-start-2',
        'col-start-1 row-start-3',
        'col-start-3 row-start-3',
    ],
};

export { dotLayout };
