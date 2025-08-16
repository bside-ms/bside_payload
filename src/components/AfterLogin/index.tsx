'use client';

import React from 'react';
import { Button } from '@payloadcms/ui';
import Link from 'next/link';

export const AdminLogin = () => {
    return (
        <Link href="/api/users/oauth/authorize">
            <Button>Einloggen</Button>
        </Link>
    );
};
