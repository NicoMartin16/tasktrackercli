

export const ACTIONS = {
    ADD: 'add',
    UPDATE: 'update',
    DELETE: 'delete',
    LIST: 'list',
    MARK_IN_PROGRESS: 'mark-in-progress',
    MARK_DONE: 'mark-done'
} as const;

export type ActionType = typeof ACTIONS[keyof typeof ACTIONS];