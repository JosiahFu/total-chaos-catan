import { useState } from 'react';
import { DiceRoll, Phase, PhaseRecord } from '../lib/data';
import { randomInt, rollDie } from '../lib/utils';
import ArbiterDisplay from './ArbiterDisplay';
import { useWatch } from '../lib/useWatch';

function robberNext(rolls: DiceRoll[]) {
    return rolls.some(([d1, d2]) => d1 + d2 == 7);
}

function Arbiter({
    players,
    phaseLengths,
    onChangeBg,
    onStop,
}: {
    players: string[];
    phaseLengths: PhaseRecord<number>;
    onChangeBg?: (className: string) => void;
    onStop?: () => void;
}) {
    const [phase, setPhase] = useState<Phase>('resource');
    const [rolls, setRolls] = useState<DiceRoll[]>([]);
    const [robberPlayer, setRobberPlayer] = useState<number | undefined>(
        undefined
    );
    const [knightCounts, setKnightCounts] = useState(players.map(() => 0));

    const handleEnd = () => {
        const nextPhase = (
            {
                cooldown: 'resource',
                resource: robberNext(rolls) ? 'robber1' : 'build_trade',
                robber1: 'robber2',
                robber2: 'build_trade',
                build_trade: 'cooldown',
            } satisfies PhaseRecord<Phase>
        )[phase];

        setPhase(nextPhase);
    };

    const handleKnight = (playerIndex: number, change: number) => {
        setKnightCounts(
            knightCounts.map((e, i) => (playerIndex === i ? e + change : e))
        );
    };

    useWatch(() => {
        if (phase === 'resource') {
            const newRolls = players.map<DiceRoll>(() => [
                rollDie(),
                rollDie(),
            ]);
            setRolls(newRolls);

            if (!robberNext(newRolls)) {
                setRobberPlayer(undefined);
                return;
            }

            const pool = knightCounts
                .map((playerIndex, count) =>
                    Array<number>(count + 1).fill(playerIndex)
                )
                .flat(1);
            setRobberPlayer(pool[randomInt(pool.length)]);
        }
    }, phase);

    return (
        <ArbiterDisplay
            {...{ phase, rolls, players, robberPlayer, phaseLengths }}
            onEnd={handleEnd}
            onChangeBg={onChangeBg}
            onKnight={handleKnight}
            onStop={onStop}
        />
    );
}

export default Arbiter;
