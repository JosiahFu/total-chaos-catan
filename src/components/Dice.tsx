import { PropsWithChildren } from 'react';

function Die({children}: PropsWithChildren) {
    return <div className='h-4 w-4 inline-grid place-items-center'>{children}</div>
}

function Dice({roll: [d1, d2]}: {
    roll: [number, number]
}) {
    const total = d1 + d2;
    
    return <div>
        <Die>{d1}</Die>
        <Die>{d2}</Die>
        = {total}
    </div>
}

export default Dice;
