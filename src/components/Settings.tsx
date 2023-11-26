import { PHASES, PHASE_NAMES, Phase } from '../data';

function Settings({
    players,
    setPlayers,
    lengths,
    setLengths,
}: {
    players: string[];
    setPlayers: (players: string[]) => void;
    lengths: Record<Phase, number>;
    setLengths: (lengths: Record<Phase, number>) => void;
}) {
    const setLength = (phase: Phase, length: number) => {
        setLengths({ ...lengths, [phase]: length });
    };

    const setPlayer = (index: number, player: string) => {
        setPlayers(players.map((e, i) => (i === index ? player : e)));
    };

    return (
        <>
            <h2>Configuration</h2>
            <section>
                <h3>Players</h3>
                {players.map((e, i) => (
                    <div>
                        <input
                            value={e}
                            onChange={event => setPlayer(i, event.target.value)}
                        />
                        <button>X</button>
                    </div>
                ))}
                <button onClick={() => setPlayers([...players, ''])}>+</button>
            </section>
            <section>
                <h3>Durations</h3>
                {PHASES.map(e => (
                    <div>
                    <label>
                        <input type="number" value={lengths[e]} onChange={event => setLength(e, parseInt(event.target.value))} />
                        {PHASE_NAMES[e]}
                    </label>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Settings;
