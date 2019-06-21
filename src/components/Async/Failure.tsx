import { FunctionalComponent, h } from 'preact';

export interface FailureProps {
  error?: any;
  title?: string;
  showError?: boolean;
}

/**
 * @render react
 * @name Failure
 * @example
 * <Failure />
 */
export const Failure: FunctionalComponent<FailureProps> = ({
  error,
  title = 'Error',
  showError = false,
}) => {
  return (
    <section className="ct-i0 pwa-4 fld-row flai-center fljc-center">
      <h3>{title}</h3>
      {showError && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </section>
  );
};
