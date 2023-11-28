import { dotLayout } from '../dieFace';

function Die({ value }: { value: number }) {
    return (
        <div className='h-12 w-12 lg:h-20 lg:w-20 inline-grid grid-cols-3 grid-rows-3 bg-white border-gray-400 border rounded p-[5%] gap-[10%] relative'>
            {dotLayout[value - 1].map(e => (
                <div className={`bg-black rounded-full ${e}`} />
            ))}
        </div>
    );
}

function Dice({ roll: [d1, d2] }: { roll: [number, number] }) {
    const total = d1 + d2;

    return (
        <div className='text-3xl lg:text-5xl flex flex-row gap-2 lg:gap-4 items-center'>
            <Die value={d1} />
            <Die value={d2} />
            <span className={`font-bold ${total === 7 ? 'text-red-800' : ''}`}>
                = {total}
            </span>
        </div>
    );
}

export default Dice;
