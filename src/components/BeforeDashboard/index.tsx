import './index.scss';

import type { ReactElement } from 'react';
import React from 'react';
import { Banner, Check } from 'payload/components';

const baseClass = 'before-dashboard';

const BeforeDashboard = (): ReactElement => {
    return (
        <div className={baseClass}>
            <Banner type="success">
                <Check />

                <strong>
                    B-Side Website 2023
                </strong>
            </Banner>
        </div>
    );
};

export default BeforeDashboard;
