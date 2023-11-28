import { useState } from 'react';
import { Phase } from './lib/data';
import Arbiter from './components/Arbiter';
import Settings from './components/Settings';

function App() {
    const [players, setPlayers] = useState([
        'Player 1',
        'Player 2',
        'Player 3',
        'Player 4',
    ]);
    const [phaseLengths, setPhaseLengths] = useState<Record<Phase, number>>({
        resource: 20,
        robber1: 20,
        robber2: 20,
        build_trade: 60,
        cooldown: 20,
    });

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
                    onChangeBg={setBgClassName}
                    onStop={() => setPlaying(false)}
                />
            ) : (
                <Settings
                    players={players}
                    setPlayers={setPlayers}
                    lengths={phaseLengths}
                    setLengths={setPhaseLengths}
                    onStart={() => setPlaying(true)}
                />
            )}
        </main>
    );
}

export default App;
