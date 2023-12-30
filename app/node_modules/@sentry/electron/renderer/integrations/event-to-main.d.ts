import { EventProcessor, Integration } from '@sentry/types';
/**
 * Passes events to the main process.
 */
export declare class EventToMain implements Integration {
    /** @inheritDoc */
    static id: string;
    /** @inheritDoc */
    name: string;
    /** @inheritDoc */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void): void;
}
//# sourceMappingURL=event-to-main.d.ts.map