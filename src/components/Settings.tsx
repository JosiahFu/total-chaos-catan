import { PHASES, PHASE_NAMES, Phase } from '../lib/data';
import Button from '../lib/components/Button';
import Input from '../lib/components/Input';
import NumberInput from '../lib/components/NumberInput';

function Settings({
    players,
    setPlayers,
    lengths,
    setLengths,
    onStart,
}: {
    players: string[];
    setPlayers: (players: string[]) => void;
    lengths: Record<Phase, number>;
    setLengths: (lengths: Record<Phase, number>) => void;
    onStart: () => void;
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
                    <div key={i}>
                        <Input
                            value={e}
                            onChange={value => setPlayer(i, value)}
                        />
                        {players.length > 2 && (
                            <button
                                onClick={() =>
                                    players.length > 2 &&
                                    setPlayers(
                                        players.filter((_, i2) => i !== i2)
                                    )
                                }>
                                X
                            </button>
                        )}
                    </div>
                ))}
                {players.length < 4 && (
                    <button
                        onClick={() =>
                            players.length < 4 && setPlayers([...players, ''])
                        }>
                        +
                    </button>
                )}
            </section>
            <section>
                <h3>Durations</h3>
                {PHASES.map((e, i) => (
                    <div key={i}>
                        <label>
                            <NumberInput
                                value={lengths[e]}
                                onChange={value => setLength(e, value)}
                            />
                            {PHASE_NAMES[e]}
                        </label>
                    </div>
                ))}
            </section>
            <Button onClick={onStart}>Begin Game</Button>
        </>
    );
}

export default Settings;
