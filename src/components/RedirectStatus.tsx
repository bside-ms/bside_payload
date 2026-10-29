'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, useDocumentInfo } from '@payloadcms/ui';

interface CheckResult {
    state: 'active' | 'pending' | 'draft' | 'error';
    message: string;
    expected?: string;
    actual?: string | null;
}

const POLL_INTERVAL_MS = 5000;
const POLL_DURATION_MS = 90 * 1000;

const colors: Record<CheckResult['state'], string> = {
    active: 'var(--theme-success-500)',
    pending: 'var(--theme-warning-500)',
    draft: 'var(--theme-elevation-500)',
    error: 'var(--theme-error-500)',
};

/** Shows whether the saved redirect is already live on the website. Polls for 90s after every save. */
const RedirectStatus = (): React.ReactElement | null => {
    const { id, lastUpdateTime } = useDocumentInfo();
    const [result, setResult] = useState<CheckResult>();
    const [loading, setLoading] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const startedAt = useRef(0);

    const check = useCallback(async (): Promise<CheckResult | undefined> => {
        if (id === undefined) {
            return undefined;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/redirects/${id}/check`, { credentials: 'include' });
            const data = (await response.json()) as CheckResult;
            setResult(data);

            return data;
        } catch {
            const data: CheckResult = { state: 'error', message: 'Der Status konnte nicht geprüft werden.' };
            setResult(data);

            return data;
        } finally {
            setLoading(false);
        }
    }, [id]);

    const poll = useCallback(async (): Promise<void> => {
        clearTimeout(timer.current);
        const data = await check();

        if (data?.state === 'pending' && Date.now() - startedAt.current < POLL_DURATION_MS) {
            timer.current = setTimeout(() => void poll(), POLL_INTERVAL_MS);
        }
    }, [check]);

    // Check when the form opens and again after each save.
    useEffect(() => {
        startedAt.current = Date.now();
        void poll();

        return () => clearTimeout(timer.current);
    }, [poll, lastUpdateTime]);

    if (id === undefined) {
        return (
            <p style={{ color: 'var(--theme-elevation-500)' }}>
                Nach dem Veröffentlichen kann es bis zu 60 Sekunden dauern, bis die Weiterleitung aktiv ist. Der Status wird hier angezeigt.
            </p>
        );
    }

    return (
        <div style={{ marginBottom: 'var(--base)' }}>
            <strong>Status auf der Live-Seite</strong>
            <p style={{ color: result ? colors[result.state] : undefined, margin: '4px 0' }}>{result ? result.message : 'Prüfe…'}</p>
            {result?.state === 'pending' && result.actual !== undefined && (
                <small style={{ display: 'block', color: 'var(--theme-elevation-500)' }}>
                    Erwartet: {result.expected}. Aktuell: {result.actual ?? 'keine Weiterleitung'}.
                </small>
            )}
            <Button buttonStyle="secondary" size="small" disabled={loading} onClick={() => void poll()}>
                Jetzt prüfen
            </Button>
        </div>
    );
};

export default RedirectStatus;
