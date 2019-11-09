import { Fragment, FunctionalComponent, h, VNode } from 'preact';

export interface ListProps {
  title: VNode<any> | null;
}

/**
 * @name List
 * @example
 * <List />
 */
export const List: FunctionalComponent<ListProps> = ({ children, title }) => {
  return (
    <Fragment>
      <section className="fld-col flg-4">
        {title}
        <ul class="fld-col flg-4">{children}</ul>
      </section>
    </Fragment>
  );
};
