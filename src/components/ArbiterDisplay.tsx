import { useEffect } from 'react';
import { DiceRoll, Phase, PHASE_NAMES, PhaseRecord } from '../lib/data';
import Button from '../lib/components/Button';
import Dice from './Dice';
import Timer from './PieTimer';
import CircleButton from '../lib/components/CircleButton';
import CountdownTimer from './CountdownTimer';
import { buzzer } from '../lib/sounds';
import { useNonRepeatKey } from '../lib/useHotKey';

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
    players,
    robberPlayer,
    onEnd,
    onChangeBg,
    onKnight,
    onStop,
    phaseLengths,
    knightCounts,
    soundsEnabled,
}: {
    phase: Phase;
    rolls: DiceRoll[];
    players: string[];
    robberPlayer: number | undefined;
    onEnd: () => void;
    onChangeBg?: (className: string) => void;
    onKnight?: (playerIndex: number, change: number) => void;
    onStop?: () => void;
    phaseLengths: PhaseRecord<number>;
    knightCounts: number[];
    soundsEnabled: boolean;
}) {
    useEffect(() => {
        onChangeBg?.(bgClassNames[phase]);
    }, [onChangeBg, phase]);

    useNonRepeatKey(onEnd, ' ');

    const robberSteals = rolls.filter(([d1, d2]) => d1 + d2 === 7).length;

    const description = (
        {
            resource: 'Collect resources on any hexagons with these numbers!',
            robber1: 'All players with 8 or more resources discard half!',
            robber2: `${
                robberPlayer === undefined ? '' : players[robberPlayer]
            } steals ${
                robberSteals === 1 ? 'a resource' : `${robberSteals} resources`
            } from other players!`,
            build_trade:
                'Develop your colony, trade with other players, & play D-cards!',
            cooldown: 'Readjust the board from all that chaos!',
        } satisfies PhaseRecord
    )[phase];

    return (
        <div className='grid h-full grid-cols-1 grid-rows-[auto_1fr_auto_auto_auto_auto_auto] items-center gap-4 lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto_auto] lg:gap-8'>
            <h2 className='text-center text-2xl lg:col-span-2 lg:text-3xl'>
                {PHASE_NAMES[phase]} Phase
            </h2>
            <div className='relative h-full min-h-0 lg:col-start-1 lg:row-span-3 lg:row-start-2'>
                <Timer
                    phase={phase}
                    length={phaseLengths[phase]}
                    onEnd={onEnd}
                    endSound={soundsEnabled ? buzzer : undefined}
                    className='relative left-1/2 top-1/2 aspect-square max-h-full max-w-full -translate-x-1/2 -translate-y-1/2'
                />
                <CountdownTimer
                    phase={phase}
                    length={phaseLengths[phase]}
                    className='absolute top-1/2 w-full -translate-y-1/2 text-6xl lg:text-8xl'
                />
            </div>
            <div className='flex flex-col gap-4 justify-self-center lg:gap-8'>
                {phase === 'resource' ||
                phase === 'robber1' ||
                phase === 'robber2' ? (
                    rolls.map((e, i) => <Dice key={i} roll={e} />)
                ) : (
                    <>
                        <h3 className='text-center text-xl lg:text-2xl'>
                            Knights
                        </h3>
                        {players.map((e, i) => (
                            <div
                                key={i}
                                className='flex flex-row items-center gap-2'>
                                <Button
                                    onClick={() => onKnight?.(i, 1)}
                                    className='w-64 !p-4 lg:w-96'>
                                    {e} - {knightCounts[i]}{' '}
                                </Button>
                                <CircleButton
                                    className='!h-8 !w-8 lg:!h-10 lg:!w-10'
                                    onClick={event => {
                                        event.stopPropagation();
                                        onKnight?.(i, -1);
                                    }}>
                                    {'\u21b6'}
                                </CircleButton>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <p className='text-center md:text-xl xl:text-2xl'>{description}</p>
            <p className='text-center md:text-xl xl:text-2xl'>
                {robberPlayer !== undefined &&
                (phase === 'resource' || phase === 'robber1') ? (
                    <>{players[robberPlayer]} will get robber control</>
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
