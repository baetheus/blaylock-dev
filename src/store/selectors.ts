import { Lens } from 'monocle-ts';

import { gistsL, reposL } from './github';
import { RootStore } from './store';

const rootL = Lens.fromProp<RootStore>();

export const githubStoreL = rootL('github');

export const gistsDataL = githubStoreL.compose(gistsL);
export const reposDataL = githubStoreL.compose(reposL);
