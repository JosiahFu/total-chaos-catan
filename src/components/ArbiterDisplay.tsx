import { useEffect } from 'react';
import { DiceRoll, PHASE_NAMES, Phase, PhaseRecord } from '../data';
import Button from './Button';
import Dice from './Dice';
import Timer from './Timer';

const bgClassNames = {
    resource: 'bg-green-600',
    robber1: 'bg-red-600',
    robber2: 'bg-red-600',
    build_trade: 'bg-blue-500',
    cooldown: 'bg-gray-500',
} satisfies PhaseRecord;

function ArbiterDisplay({
    phase,
    rolls,
    robberPlayer,
    onEnd,
    onStop,
    onChangeBg,
    phaseLengths,
}: {
    phase: Phase;
    rolls: DiceRoll[];
    robberPlayer: string | undefined;
    onEnd: () => void;
    onChangeBg?: (className: string) => void;
    onStop?: () => void;
    phaseLengths: Record<Phase, number>;
}) {
    useEffect(() => {
        onChangeBg?.(bgClassNames[phase]);
    }, [onChangeBg, phase]);

    const description = (
        {
            resource: 'Collect resources on any hexagons with these numbers!',
            robber1: 'All players with >8 resources discard half!',
            robber2: `${robberPlayer} steals from other players!`,
            build_trade: 'Develop your colony and trade with other players!',
            cooldown: 'Readjust the board from all that chaos!',
        } satisfies PhaseRecord
    )[phase];

    return (
        <div className='h-full grid grid-cols-1 gap-4 lg:gap-8 items-center grid-rows-[auto_1fr_auto_auto_auto_auto_auto] lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto_auto]'>
            <div className='flex flex-col gap-2 lg:col-span-2'>
                <h2 className='text-center text-2xl lg:text-3xl'>
                    {PHASE_NAMES[phase]}
                </h2>
                <p className='text-center text-xl lg:text-2xl'>Phase</p>
            </div>
            <Timer
                phase={phase}
                length={phaseLengths[phase]}
                onEnd={onEnd}
                className='max-w-full max-h-full lg:col-start-1 lg:row-start-2 lg:row-span-3 aspect-square'
            />
            <div className='justify-self-center flex flex-col gap-4 lg:gap-8'>
                {rolls.map((e, i) => (
                    <Dice key={i} roll={e} />
                ))}
            </div>
            <p className='min-h-[3rem] text-center md:text-xl xl:text-2xl'>
                {description}
            </p>
            <p className='text-center md:text-xl xl:text-2xl'>
                {robberPlayer !== undefined &&
                (phase === 'resource' || phase === 'robber1') ? (
                    <>{robberPlayer} gets robber control</>
                ) : (
                    '\u00a0'
                )}
            </p>
            <Button onClick={onEnd}>Skip to next segment</Button>
            <Button onClick={onStop}>Stop Game</Button>
        </div>
    );
}

export default ArbiterDisplay;
