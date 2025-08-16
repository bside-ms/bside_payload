'use client';

import React from 'react';
import { Button } from '@payloadcms/ui';
import Link from 'next/link';

export const AdminLogin = () => {
    return (
        <div>
            <div>
                <h4 style={{ fontSize: '20px', lineHeight: '1', marginBottom: 'calc(var(--base) * 1.2)' }}>
                    <center>Logge dich hier mit deinem B-Side Account ein!</center>
                </h4>

                <p>
                    Falls dir beim Login eine Fehlermeldung angezeigt wird, fehlen dir die notwendigen Rechte für den Zugriff auf das
                    Backend unserer Webseite. Wende dich in dem Fall bitte bei Mattermost an das IT-Team.
                </p>

                <center style={{ transform: 'scale(1.2)' }}>
                    <Link href="/api/users/oauth/authorize">
                        <Button>Einloggen</Button>
                    </Link>
                </center>
            </div>
        </div>
    );
};
