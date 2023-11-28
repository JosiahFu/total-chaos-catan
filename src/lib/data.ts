type DiceRoll = [number, number];

const PHASES = [
    'resource',
    'robber1',
    'robber2',
    'build_trade',
    'cooldown',
] as const;

type Phase = (typeof PHASES)[number];

const PHASE_NAMES = {
    resource: 'Collect Resources',
    robber1: 'Robber 1',
    robber2: 'Robber 2',
    build_trade: 'Build & Trade',
    cooldown: 'Cooldown',
} satisfies PhaseRecord;

type PhaseRecord = Record<Phase, string>;

export { PHASES, PHASE_NAMES };
export type { Phase, DiceRoll, PhaseRecord };
