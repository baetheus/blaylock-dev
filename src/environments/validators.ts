import * as t from 'io-ts';

export const Package = t.type({
    version: t.string,
})
export type Packate = t.TypeOf<typeof Package>;