import { useState } from 'react';
import { Phase } from './data';
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
        robber: 20,
        build_trade: 60,
        cooldown: 20,
    });

    const [playing, setPlaying] = useState(false);
    const [bgClassName, setBgClassName] = useState('');

    return (
        <main
            className={`${
                playing ? bgClassName : ''
            } transition h-screen duration-500`}>
            {playing ? (
                <>
                    <Arbiter
                        players={players}
                        phaseLengths={phaseLengths}
                        onChangeBg={setBgClassName}
                    />
                    <button onClick={() => setPlaying(false)}>Stop Game</button>
                </>
            ) : (
                <>
                    <Settings
                        players={players}
                        setPlayers={setPlayers}
                        lengths={phaseLengths}
                        setLengths={setPhaseLengths}
                    />
                    <button onClick={() => setPlaying(true)}>Begin Game</button>
                </>
            )}
        </main>
    );
}

export default App;
