import { useEffect, useState } from 'react';
import { PHASE_NAMES, Phase, PhaseRecord } from '../data';
import { randomInt, rollDie } from '../Utils';
import Timer from './Timer';
import Dice from './Dice';

function Arbiter({players, phaseLengths, onChangeBg}: {
    players: string[],
    phaseLengths: Record<Phase, number>,
    onChangeBg?: (className: string) => void;
}) {
    const [phase, setPhase] = useState<Phase>('resource');
    const [rolls, setRolls] = useState<[number, number][]>([]);
    const [robberPlayer, setRobberPlayer] = useState<string | undefined>(undefined);
    
    const handleEnd = () => {
        switch(phase) {
            case 'cooldown': setPhase('resource'); break;
            case 'resource': setPhase(rolls.some(([d1, d2]) => d1 + d2 == 7) ? 'robber' : 'build_trade'); break;
            case 'robber': setPhase('build_trade'); break;
            case 'build_trade': setPhase('cooldown'); break;
        }
    }
    
    useEffect(() => {
        onChangeBg?.(({
            resource: 'bg-green-600',
            robber: 'bg-red-600',
            build_trade: 'bg-blue-600',
            cooldown: 'bg-white-600',
        } satisfies PhaseRecord)[phase]);

        switch(phase) {
            case 'resource':
                setRolls(players.map(() => [rollDie(), rollDie()]));
                return;
            case 'robber':
                setRobberPlayer(players[randomInt(players.length)]);
                return () => setRobberPlayer(undefined);
        }
    }, [onChangeBg, phase, players])
    
    const description = ({
        resource: 'Collect resources on any hexagons with these numbers!',
        robber: `${robberPlayer} steals from other players!`,
        build_trade: 'Develop your colony and trade with other players!',
        cooldown: 'Readjust the board from all that chaos!',
    } satisfies PhaseRecord)[phase];
    
    return <div>
        <div>
            {PHASE_NAMES[phase]}
        </div>
        <div>Phase</div>
        <Timer
            phase={phase} 
            length={phaseLengths[phase]} 
            onEnd={handleEnd}
        />
        {rolls.map((e, i) => <Dice key={i} roll={e} />)}
        <p>{description}</p>
        <button onClick={handleEnd}>Skip to next segment</button>
    </div>
}

export default Arbiter;
