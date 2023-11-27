import { useState } from 'react';
import { Phase } from './data';
import Arbiter from './components/Arbiter';
import Settings from './components/Settings';
import Button from './components/Button';

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
            } transition h-screen duration-500 box-border p-4 gap-4 grid content-center`}>
            {playing ? (
                <>
                    <Arbiter
                        players={players}
                        phaseLengths={phaseLengths}
                        onChangeBg={setBgClassName}
                    />
                    <Button onClick={() => setPlaying(false)}>Stop Game</Button>
                </>
            ) : (
                <>
                    <Settings
                        players={players}
                        setPlayers={setPlayers}
                        lengths={phaseLengths}
                        setLengths={setPhaseLengths}
                    />
                    <Button onClick={() => setPlaying(true)}>Begin Game</Button>
                </>
            )}
        </main>
    );
}

export default App;
