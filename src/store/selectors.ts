import { Lens } from 'monocle-ts';

import { articlesL } from './devto';
import { githubL } from './github';
import { RootStore } from './store';

const rootL = Lens.fromProp<RootStore>();

export const githubStoreL = rootL('github');
export const devtoStoreL = rootL('devto');

export const githubDataL = githubStoreL.compose(githubL);
export const articlesDataL = devtoStoreL.compose(articlesL);
