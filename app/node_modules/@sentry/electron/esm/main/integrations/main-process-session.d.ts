import { Integration } from '@sentry/types';
/** Tracks sessions as the main process lifetime. */
export declare class MainProcessSession implements Integration {
    /** @inheritDoc */
    static id: string;
    /** @inheritDoc */
    name: string;
    /** @inheritDoc */
    setupOnce(): void;
    /**
     * Hooks 'will-quit' and ensures the handler is always last
     */
    private _ensureExitHandlerLast;
    /** Handles the exit */
    private _exitHandler;
}
//# sourceMappingURL=main-process-session.d.ts.map