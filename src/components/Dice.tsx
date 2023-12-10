import FitText from '../lib/components/FitText';
import { dotLayout } from '../lib/dieFace';

function Die({ value }: { value: number }) {
    return (
        <div className='box-border grid aspect-square h-full rounded-[20%] bg-white'>
            <div className='m-[20%] grid grid-cols-3 grid-rows-3 gap-[10%]'>
                {dotLayout[value].map((e, i) => (
                    <div key={i} className={`${e} rounded-full bg-black`} />
                ))}
            </div>
        </div>
    );
}

function Dice({ roll: [d1, d2] }: { roll: [number, number] }) {
    const total = d1 + d2;

    return (
        <div className='flex max-h-full w-full flex-grow basis-0 flex-row items-center justify-center gap-2 text-3xl lg:gap-4 lg:text-5xl'>
            <Die value={d1} />
            <Die value={d2} />
            <FitText
                className={`font-bold ${total === 7 ? 'text-red-800' : ''}`}>
                = {total}
            </FitText>
        </div>
    );
}

export default Dice;
