import { Integration } from '@sentry/types';
/** Sends minidumps via the Sentry uploader */
export declare class SentryMinidump implements Integration {
    /** @inheritDoc */
    static id: string;
    /** @inheritDoc */
    name: string;
    /** Store to persist context information beyond application crashes. */
    private _scopeStore?;
    /** Temp store for the scope of last run */
    private _scopeLastRun?;
    private _minidumpLoader?;
    /** @inheritDoc */
    setupOnce(): void;
    /** Starts the native crash reporter */
    private _startCrashReporter;
    /**
     * Helper function for sending renderer crashes
     */
    private _sendRendererCrash;
    /**
     * Helper function for sending child process crashes
     */
    private _sendChildProcessCrash;
    /**
     * Adds a scope listener to persist changes to disk.
     */
    private _setupScopeListener;
    /**
     * Loads new native crashes from disk and sends them to Sentry.
     *
     * Returns true if one or more minidumps were found
     */
    private _sendNativeCrashes;
}
//# sourceMappingURL=index.d.ts.map