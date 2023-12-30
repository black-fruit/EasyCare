import { Integration } from '@sentry/types';
/**
 * Injects the preload script into the provided sessions.
 *
 * Defaults to injecting into the defaultSession
 */
export declare class PreloadInjection implements Integration {
    /** @inheritDoc */
    static id: string;
    /** @inheritDoc */
    name: string;
    /** @inheritDoc */
    setupOnce(): void;
    /**
     * Attempts to add the preload script the the provided sessions
     */
    private _addPreloadToSessions;
}
//# sourceMappingURL=preload-injection.d.ts.map