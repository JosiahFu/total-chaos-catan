import { dotLayout } from '../lib/dieFace';

function Die({ value }: { value: number }) {
    return (
        <div className='relative inline-grid h-12 w-12 grid-cols-3 grid-rows-3 gap-[10%] rounded border border-gray-400 bg-white p-[5%] lg:h-20 lg:w-20'>
            {dotLayout[value - 1].map(e => (
                <div className={`${e} rounded-full bg-black`} />
            ))}
        </div>
    );
}

function Dice({ roll: [d1, d2] }: { roll: [number, number] }) {
    const total = d1 + d2;

    return (
        <div className='flex flex-row items-center gap-2 text-3xl lg:gap-4 lg:text-5xl'>
            <Die value={d1} />
            <Die value={d2} />
            <span className={`font-bold ${total === 7 ? 'text-red-800' : ''}`}>
                = {total}
            </span>
        </div>
    );
}

export default Dice;
