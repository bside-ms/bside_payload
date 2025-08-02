'use client';

import React, { useCallback } from 'react';
import { Button } from '@payloadcms/ui';
import { oidcAuthClient } from '@/lib/auth';

export const AdminLogin = () => {
    const { oauth } = oidcAuthClient.signin();

    const handleKeycloakSignin = useCallback((): void => {
        // @ts-ignore | keycloak doesn't seem to be fully supported as of right now.
        oauth('keycloak');
    }, []);

    return (
        <div>
            <Button type="button" onClick={handleKeycloakSignin}>
                Einloggen
            </Button>
        </div>
    );
};
