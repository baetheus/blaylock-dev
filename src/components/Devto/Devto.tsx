import './Devto.css';

import { Pending } from 'components/Req';
import { formatValidationError } from 'io-ts-reporters';
import { getArticles, GetArticlesT } from 'libraries/devto';
import { pending } from 'libraries/req';
import React, { useState } from 'react';

import { Articles } from './Articles';

export interface DevtoProps {}

/**
 * @render react
 * @name Devto
 * @example
 * <Devto />
 */
export const Devto: React.FC<DevtoProps> = () => {
  const [res, setRes] = useState<GetArticlesT>(pending());

  if (res.type === 'Pending') {
    getArticles('baetheus')
      .run()
      .then(setRes);
  }

  return (
    <section className="fld-column flg-4">
      <h2>
        dev.to/
        <a
          href="https://dev.to/baetheus"
          target="_blank"
          rel="noopener noreferrer"
        >
          baetheus
        </a>
      </h2>
      {res.fold(
        <Pending />,
        err => (
          <pre>{err.map(formatValidationError).join('\n\n')}</pre>
        ),
        data => (
          <Articles articles={data} />
        ),
        data => (
          <Articles articles={data} />
        )
      )}
    </section>
  );
};
