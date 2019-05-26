import React from 'react';

export interface FailureProps {
  error: any;
  showError?: boolean;
}

/**
 * @render react
 * @name Failure
 * @example
 * <Failure />
 */
export const Failure: React.FC<FailureProps> = ({
  error,
  showError = false,
}) => {
  return (
    <section className="ct-warning pa-4 fld-row flai-center fljc-center">
      <h3>Error</h3>
      {showError && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </section>
  );
};

export const FailureM = React.memo((error: any) => <Failure error={error} />);
