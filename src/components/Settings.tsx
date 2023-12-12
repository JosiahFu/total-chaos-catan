import { Phase, PHASE_NAMES, PhaseRecord, PHASES } from '../lib/data';
import Button from '../lib/components/Button';
import Input from '../lib/components/Input';
import NumberInput from '../lib/components/NumberInput';
import CircleButton from '../lib/components/CircleButton';

function Settings({
    players,
    setPlayers,
    lengths,
    setLengths,
    soundsEnabled,
    setSoundsEnabled,
    onStart,
}: {
    players: string[];
    setPlayers: (players: string[]) => void;
    lengths: PhaseRecord<number>;
    setLengths: (lengths: PhaseRecord<number>) => void;
    soundsEnabled: boolean;
    setSoundsEnabled: (soundsEnabled: boolean) => void;
    onStart: () => void;
}) {
    const setLength = (phase: Phase, length: number) => {
        setLengths({ ...lengths, [phase]: length });
    };

    const setPlayer = (index: number, player: string) => {
        setPlayers(players.map((e, i) => (i === index ? player : e)));
    };

    return (
        <div className='grid h-full grid-cols-[max-content] place-content-center gap-4 text-xl ar-ls:grid-cols-[max-content_max-content] md:gap-8 lg:text-2xl'>
            <h2 className='text-center text-3xl ar-ls:col-span-2 lg:text-4xl'>
                Settings
            </h2>
            <section className='flex flex-col items-center gap-2 md:gap-4'>
                <h3 className='text-center text-2xl lg:text-3xl'>Players</h3>
                {players.map((e, i) => (
                    <div key={i} className='flex flex-row items-center gap-2'>
                        <Input
                            className='text-center'
                            value={e}
                            onChange={value => setPlayer(i, value)}
                        />
                        <CircleButton
                            disabled={players.length <= 2}
                            onClick={() =>
                                players.length > 2 &&
                                setPlayers(players.filter((_, i2) => i !== i2))
                            }>
                            {'\u2715' /* x */}
                        </CircleButton>
                    </div>
                ))}
                {players.length < 4 && (
                    <CircleButton
                        onClick={() =>
                            players.length < 4 && setPlayers([...players, ''])
                        }>
                        +
                    </CircleButton>
                )}
            </section>
            <section className='flex flex-col gap-2 md:gap-4'>
                <h3 className='text-center text-2xl lg:text-3xl'>Durations</h3>
                {PHASES.map((e, i) => (
                    <label key={i} className='flex flex-row items-center gap-2'>
                        <NumberInput
                            value={lengths[e]}
                            onChange={value => setLength(e, value)}
                        />
                        {PHASE_NAMES[e]}
                    </label>
                ))}
            </section>
            <section className='justify-self-center ar-ls:col-span-2'>
                <label className='flex cursor-pointer select-none flex-row items-center gap-2'>
                    <input
                        type='checkbox'
                        checked={soundsEnabled}
                        onChange={event =>
                            setSoundsEnabled(event.target.checked)
                        }
                        className='lg:h-4 lg:w-4'
                    />
                    Enable Sounds
                </label>
            </section>
            <Button className='ar-ls:col-span-2' onClick={onStart}>
                Begin Game
            </Button>
        </div>
    );
}

export default Settings;
