import { useState } from 'react';
import { PhaseRecord } from './lib/data';
import Arbiter from './components/Arbiter';
import Settings from './components/Settings';
import { useLocalStorage } from './lib/useLocalstorage';

function App() {
    const [players, setPlayers] = useLocalStorage(
        ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
        'players'
    );
    const [phaseLengths, setPhaseLengths] = useLocalStorage<
        PhaseRecord<number>
    >(
        {
            resource: 20,
            robber1: 20,
            robber2: 20,
            build_trade: 60,
            cooldown: 20,
        },
        'phaseLengths'
    );
    const [soundsEnabled, setSoundsEnabled] = useLocalStorage(
        false,
        'soundsEnabled'
    );

    const [playing, setPlaying] = useState(false);
    const [bgClassName, setBgClassName] = useState('');

    return (
        <main
            className={`${
                playing ? bgClassName : ''
            } relative box-border h-screen p-4 transition duration-500 lg:p-8`}>
            {playing ? (
                <Arbiter
                    players={players}
                    phaseLengths={phaseLengths}
                    soundsEnabled={soundsEnabled}
                    onChangeBg={setBgClassName}
                    onStop={() => setPlaying(false)}
                />
            ) : (
                <Settings
                    players={players}
                    setPlayers={setPlayers}
                    lengths={phaseLengths}
                    setLengths={setPhaseLengths}
                    soundsEnabled={soundsEnabled}
                    setSoundsEnabled={setSoundsEnabled}
                    onStart={() => setPlaying(true)}
                />
            )}
        </main>
    );
}

export default App;
