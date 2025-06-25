import type { FieldHook } from 'payload';

const format = (val: string): string =>
    val
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .toLowerCase();

const formatSlug =
    (fallback: string): FieldHook =>
    ({ operation, value, originalDoc, data }) => {
        if (typeof value === 'string') {
            return format(value);
        }

        if (operation === 'create') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            const fallbackData = Boolean(data?.[fallback]) || originalDoc?.[fallback];

            if (Boolean(fallbackData) && typeof fallbackData === 'string') {
                return format(fallbackData);
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value;
    };

export default formatSlug;
