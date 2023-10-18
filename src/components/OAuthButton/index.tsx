import type { ReactElement } from 'react';
import React, { useEffect } from 'react';

const OAuthButton = (): ReactElement => {
    useEffect(() => {
        setTimeout(() => {}, 2000);
    }, []);

    return (
        <div style={{ marginBottom: 40 }}>
            <a className="btn btn--style-secondary btn--size-medium" style={{ width: '100%' }} href="/oauth2/authorize">
                Einloggen
            </a>
        </div>
    );
};

export default OAuthButton;
