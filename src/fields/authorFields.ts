import type { Field, CollectionBeforeChangeHook } from 'payload';
import Users from '@/collections/Users/Users';

export const authorFields: Field[] = [
    {
        name: 'createdBy',
        type: 'relationship',
        relationTo: Users.slug,
        label: 'Erstellt von',
        admin: {
            readOnly: true,
            position: 'sidebar',
            description: 'Wird automatisch beim Erstellen gesetzt.',
        },
        access: {
            create: () => true,
            update: () => false,
        },
    },
    {
        name: 'updatedBy',
        type: 'relationship',
        relationTo: Users.slug,
        label: 'Aktualisiert von',
        admin: {
            readOnly: true,
            position: 'sidebar',
            description: 'Wird automatisch beim Speichern gesetzt.',
        },
        access: {
            create: () => true,
            update: () => false,
        },
    },
];

export const authorFieldsBeforeChangeHook: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
    const userId = req.user?.id;

    if (!userId) {
        return data;
    }

    if (operation === 'create') {
        return { ...data, createdBy: userId, updatedBy: userId };
    }

    return { ...data, updatedBy: userId };
};
