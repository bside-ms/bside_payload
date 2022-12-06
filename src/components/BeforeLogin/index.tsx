import type { ReactElement } from 'react';
import React from 'react';

const BeforeLogin = (): ReactElement => {

    return (
        <div>
            <p>
                The CMS is currently not connected to our user management.<br />
                Please contact the IT team for access.
            </p>
        </div>
    );
};

export default BeforeLogin;
