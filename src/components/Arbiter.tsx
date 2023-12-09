import { useCallback, useState } from 'react';
import { DiceRoll, Phase, PhaseRecord } from '../lib/data';
import { randomInt, rollDie } from '../lib/utils';
import { buzzer } from '../lib/sounds';
import ArbiterDisplay from './ArbiterDisplay';
import { useWatch } from '../lib/useWatch';

function robberNext(rolls: DiceRoll[]) {
    return rolls.some(([d1, d2]) => d1 + d2 == 7);
}

function Arbiter({
    players,
    phaseLengths,
    soundsEnabled,
    onChangeBg,
    onStop,
}: {
    players: string[];
    phaseLengths: PhaseRecord<number>;
    soundsEnabled: boolean;
    onChangeBg?: (className: string) => void;
    onStop?: () => void;
}) {
    const [phase, setPhase] = useState<Phase>('resource');
    const [rolls, setRolls] = useState<DiceRoll[]>([]);
    const [robberPlayer, setRobberPlayer] = useState<number | undefined>(
        undefined
    );
    const [knightCounts, setKnightCounts] = useState(players.map(() => 0));

    const handleEnd = useCallback(() => {
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
    }, [phase, rolls]);

    const handleKnight = (playerIndex: number, change: number) => {
        if (knightCounts[playerIndex] + change < 0) return;
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

            if (robberNext(newRolls)) {
                const pool = knightCounts
                    .map((count, playerIndex) =>
                        Array<number>(count + 1).fill(playerIndex)
                    )
                    .flat(1);
                setRobberPlayer(pool[randomInt(pool.length)]);
            } else {
                setRobberPlayer(undefined);
            }
        }
    }, phase);

    useWatch(() => {
        const timeout = setTimeout(() => {
            if (soundsEnabled) buzzer.play();
            handleEnd();
        }, phaseLengths[phase] * 1000);

        return () => clearTimeout(timeout);
    }, handleEnd); // Timer should not be set until handleEnd updates with new rolls

    return (
        <ArbiterDisplay
            {...{
                phase,
                rolls,
                players,
                robberPlayer,
                phaseLengths,
                knightCounts,
                soundsEnabled,
            }}
            onEnd={handleEnd}
            onChangeBg={onChangeBg}
            onKnight={handleKnight}
            onStop={onStop}
        />
    );
}

export default Arbiter;
