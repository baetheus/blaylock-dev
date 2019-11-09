import { Lens } from 'monocle-ts';

import { articlesL } from './devto';
import { gistsL, reposL } from './github';
import { RootStore } from './store';

const rootL = Lens.fromProp<RootStore>();

export const githubStoreL = rootL('github');
export const devtoStoreL = rootL('devto');

export const gistsDataL = githubStoreL.compose(gistsL);
export const reposDataL = githubStoreL.compose(reposL);
export const articlesDataL = devtoStoreL.compose(articlesL);
