import React from 'react';
import { Banner } from 'payload/components';

import './index.scss';

const baseClass = 'before-dashboard';

const BeforeDashboard: React.FC = () => {
    return (
        <div className={baseClass}>
            <Banner type="success">
                <strong>
                    B-Side Website 2023
                </strong>
            </Banner>
        </div>
    );
};

export default BeforeDashboard;
