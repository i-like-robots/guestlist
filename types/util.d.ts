/// If the value is an array when it shouldn't be, take the last result
export declare const single: (value: any) => string

/// If the property is not an array when it should be, array-ify it
export declare const array: (value: any) => string[]

/// Checks if the given property is null or undefined
export declare const isDefined: (value: any) => Boolean

/// A much faster but much less safe Object.assign()
export declare const extend: <T>(target: T, ...items: Object[]) => T

/// Access deep object properties
export declare const get: (branch: Object, ...branches: Array<String|Number>) => any
