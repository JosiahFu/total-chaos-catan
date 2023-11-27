import { useEffect, useState } from 'react';
import { DiceRoll, PHASE_NAMES, Phase, PhaseRecord } from '../data';
import { randomInt, rollDie } from '../Utils';
import Timer from './Timer';
import Dice from './Dice';

function robberNext(rolls: DiceRoll[]) {
    return rolls.some(([d1, d2]) => d1 + d2 == 7);
}

function Arbiter({
    players,
    phaseLengths,
    onChangeBg,
}: {
    players: string[];
    phaseLengths: Record<Phase, number>;
    onChangeBg?: (className: string) => void;
}) {
    const [phase, setPhase] = useState<Phase>('resource');
    const [rolls, setRolls] = useState<DiceRoll[]>([]);
    const [robberPlayer, setRobberPlayer] = useState<string | undefined>(
        undefined
    );

    const handleEnd = () => {
        switch (phase) {
            case 'cooldown':
                setPhase('resource');
                break;
            case 'resource':
                setPhase(robberNext(rolls) ? 'robber1' : 'build_trade');
                break;
            case 'robber1':
                setPhase('robber2');
                break;
            case 'robber2':
                setPhase('build_trade');
                break;
            case 'build_trade':
                setPhase('cooldown');
                break;
        }
    };

    useEffect(() => {
        onChangeBg?.(
            (
                {
                    resource: 'bg-green-600',
                    robber1: 'bg-red-600',
                    robber2: 'bg-red-600',
                    build_trade: 'bg-blue-600',
                    cooldown: 'bg-white-600',
                } satisfies PhaseRecord
            )[phase]
        );

        if (phase === 'resource') {
            const newRolls = players.map<DiceRoll>(() => [
                rollDie(),
                rollDie(),
            ]);
            setRolls(newRolls);
            setRobberPlayer(
                robberNext(newRolls)
                    ? players[randomInt(players.length)]
                    : undefined
            );
        }
    }, [onChangeBg, phase, players]);

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
        <div>
            <div>{PHASE_NAMES[phase]}</div>
            <div>Phase</div>
            <Timer
                phase={phase}
                length={phaseLengths[phase]}
                onEnd={handleEnd}
            />
            {rolls.map((e, i) => (
                <Dice key={i} roll={e} />
            ))}
            <p>{description}</p>
            {robberPlayer !== undefined && phase === 'resource' && (
                <p>Robber: {robberPlayer}</p>
            )}
            <button onClick={handleEnd}>Skip to next segment</button>
        </div>
    );
}

export default Arbiter;
