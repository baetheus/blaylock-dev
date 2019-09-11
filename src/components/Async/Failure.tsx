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
    <section className="fld-col flg-4 ai-ctr pwa-4 ct-i0">
      <h3>{title}</h3>
      {showError && <div class="ova-au">{JSON.stringify(error, null, 2)}</div>}
    </section>
  );
};
