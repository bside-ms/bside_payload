/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): boolean {
    return (Boolean(item)) && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export default function deepMerge<T extends Object, R>(target: T, source: R): T {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        // @ts-expect-error
        Object.keys(source).forEach(key => {
            // @ts-expect-error
            if (isObject(source[key])) {
                if (!(key in target)) {
                    // @ts-expect-error
                    Object.assign(output, { [key]: source[key] });
                } else {
                    // @ts-expect-error
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                // @ts-expect-error
                Object.assign(output, { [key]: source[key] });
            }
        });
    }

    return output;
}
