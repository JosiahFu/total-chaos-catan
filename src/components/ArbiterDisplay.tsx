import { DiceRoll, PHASE_NAMES, Phase, PhaseRecord } from '../data';
import Button from './Button';
import Dice from './Dice';
import Timer from './Timer';

function ArbiterDisplay({
    phase,
    rolls,
    robberPlayer,
    onEnd,
    phaseLengths,
}: {
    phase: Phase;
    rolls: DiceRoll[];
    robberPlayer: string | undefined;
    onEnd: () => void;
    phaseLengths: Record<Phase, number>;
}) {
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
        <div className='grid grid-cols-1 gap-4 items-center'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-center text-xl'>{PHASE_NAMES[phase]}</h2>
                <div className='text-center text-lg'>Phase</div>
            </div>
            <Timer phase={phase} length={phaseLengths[phase]} onEnd={onEnd} />
            <div className='justify-self-center'>
                {rolls.map((e, i) => (
                    <Dice key={i} roll={e} />
                ))}
            </div>
            <p className='min-h-[3rem]'>{description}</p>
            <p>
                {robberPlayer !== undefined &&
                (phase === 'resource' || phase === 'robber1') ? (
                    <>Robber: {robberPlayer}</>
                ) : (
                    '\u00a0'
                )}
            </p>
            <Button onClick={onEnd}>Skip to next segment</Button>
        </div>
    );
}

export default ArbiterDisplay;
