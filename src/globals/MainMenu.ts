import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import type { GlobalConfig } from 'payload/types';
import link from '../fields/link';

export const MainMenu: GlobalConfig = {
    slug: 'main-menu',
    access: {
        read: () => true,
    },

    admin: {
        group: 'Administration',
        description: 'Dieses Menü steuert die Desktop-Navigation.',
    },

    fields: [
        {
            name: 'navItems',
            type: 'array',
            maxRows: 6,
            fields: [
                link({
                    appearances: false,
                }),
            ],
            admin: {
                components: {
                    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
                    RowLabel: (data: RowLabelArgs) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/strict-boolean-expressions
                        return data.data.link?.label || `Link ${String(data.index).padStart(2, '0')}`;
                    },
                },
            },
        },
    ],
};
