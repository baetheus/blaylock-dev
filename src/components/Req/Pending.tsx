import React from 'react';

export interface PendingProps {
  title?: string;
}

/**
 * @render react
 * @name Pending
 * @example
 * <Pending />
 */
export const Pending: React.FC<PendingProps> = ({ title = 'Loading' }) => {
  return (
    <section className="ct-light pa-4 fld-row flai-center fljc-center">
      <h3>{title}</h3>
    </section>
  );
};

export const PendingM = React.memo(() => <Pending />);
