import type { ReactElement } from 'react';
import React from 'react';

const BeforeLogin = (): ReactElement => {
    return (
        <div>
            <h4>
                <center>Logge dich hier mit deinem B-Side Account ein!</center>
            </h4>
            <p>
                Falls dir beim Login eine Fehlermeldung angezeigt wird, fehlen dir die notwendigen Rechte für den Zugriff auf das Backend
                unserer Webseite. Wende dich in dem Fall bitte bei Mattermost an das IT-Team.
            </p>
        </div>
    );
};

export default BeforeLogin;
