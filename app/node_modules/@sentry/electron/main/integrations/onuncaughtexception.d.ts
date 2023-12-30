import { Integration } from '@sentry/types';
/** Capture unhandled errors. */
export declare class OnUncaughtException implements Integration {
    /** @inheritDoc */
    static id: string;
    /** @inheritDoc */
    name: string;
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}
//# sourceMappingURL=onuncaughtexception.d.ts.map