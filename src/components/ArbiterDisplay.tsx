import { useEffect } from 'react';
import { DiceRoll, PHASE_NAMES, Phase, PhaseRecord } from '../lib/data';
import Button from '../lib/components/Button';
import Dice from './Dice';
import Timer from './Timer';

const bgClassNames = {
    resource: 'bg-green-500',
    robber1: 'bg-red-400',
    robber2: 'bg-red-400',
    build_trade: 'bg-blue-400',
    cooldown: 'bg-gray-400',
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
    phaseLengths: PhaseRecord<number>;
}) {
    useEffect(() => {
        onChangeBg?.(bgClassNames[phase]);
    }, [onChangeBg, phase]);

    const robberSteals = rolls.filter(([d1, d2]) => d1 + d2 === 7).length;

    const description = (
        {
            resource: 'Collect resources on any hexagons with these numbers!',
            robber1: 'All players with >8 resources discard half!',
            robber2: `${robberPlayer} steals ${
                robberSteals === 1 ? 'a resource' : `${robberSteals} resources`
            } from other players!`,
            build_trade:
                'Develop your colony, trade with other players, & play D-cards!',
            cooldown: 'Readjust the board from all that chaos!',
        } satisfies PhaseRecord
    )[phase];

    return (
        <div className='grid h-full grid-cols-1 grid-rows-[auto_1fr_auto_auto_auto_auto_auto] items-center gap-4 lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto_auto] lg:gap-8'>
            <div className='flex flex-col gap-2 lg:col-span-2'>
                <h2 className='text-center text-2xl lg:text-3xl'>
                    {PHASE_NAMES[phase]}
                </h2>
                <p className='text-center text-xl lg:text-2xl'>Phase</p>
            </div>
            <div className='relative h-full min-h-0 lg:col-start-1 lg:row-span-3 lg:row-start-2'>
                <Timer
                    phase={phase}
                    length={phaseLengths[phase]}
                    onEnd={onEnd}
                    className='relative left-1/2 top-1/2 aspect-square max-h-full max-w-full -translate-x-1/2 -translate-y-1/2'
                />
            </div>
            <div className='flex flex-col gap-4 justify-self-center lg:gap-8'>
                {rolls.map((e, i) => (
                    <Dice key={i} roll={e} />
                ))}
            </div>
            <p className='text-center md:text-xl xl:text-2xl'>{description}</p>
            <p className='text-center md:text-xl xl:text-2xl'>
                {robberPlayer !== undefined &&
                (phase === 'resource' || phase === 'robber1') ? (
                    <>{robberPlayer} will get robber control</>
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
