import { FunctionalComponent, h } from 'preact';

export interface PendingProps {
  title?: string;
}

/**
 * @render react
 * @name Pending
 * @example
 * <Pending />
 */
export const Pending: FunctionalComponent<PendingProps> = ({
  title = 'Loading',
}) => {
  return (
    <section className="ct-b1 pwa-4 fld-row ai-ctr jc-ctr vh-4">
      <h3>{title}</h3>
    </section>
  );
};
