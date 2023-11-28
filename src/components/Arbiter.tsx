import { useEffect, useState } from 'react';
import { DiceRoll, Phase } from '../data';
import { randomInt, rollDie } from '../Utils';
import ArbiterDisplay from './ArbiterDisplay';

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
    phaseLengths: Record<Phase, number>;
    onChangeBg?: (className: string) => void;
    onStop?: () => void;
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

    return (
        <ArbiterDisplay
            {...{ phase, rolls, robberPlayer, phaseLengths }}
            onEnd={handleEnd}
            onChangeBg={onChangeBg}
            onStop={onStop}
        />
    );
}

export default Arbiter;
