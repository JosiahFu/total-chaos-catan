
type Phase = 'resource' | 'robber' | 'build_trade' | 'cooldown';

type Dice = [number, number]

const PHASES = ['resource', 'robber', 'build_trade', 'cooldown'] satisfies Phase[]

const PHASE_NAMES = {
    resource: 'Collect Resources',
    robber: 'Robber',
    build_trade: 'Build & Trade',
    cooldown: 'Cooldown',
} satisfies PhaseRecord;

type PhaseRecord = Record<Phase, string>;

export { PHASES, PHASE_NAMES }
export type { Phase, Dice, PhaseRecord };
