import clsx from 'clsx';

import { Link } from '$/components/link';

import styles from './mdx.module.scss';

export const MDXComponents = {
  a: MDXLink,
  pre: Pre,
};

type MDXLinkProps = {
  children?: React.ReactNode;
  href?: string;
};
function MDXLink(props: MDXLinkProps): JSX.Element {
  return (
    <Link href={props.href || ''} variant="solid">
      {props.children}
    </Link>
  );
}

interface PreProps {
  children: React.ReactNode;
  className?: string;
}

function Pre({ children, className, ...restProps }: PreProps): JSX.Element {
  return (
    // <div className="not-prose">
    <pre {...restProps} className={clsx(styles.blockPre, className)}>
      {children}
    </pre>
    // </div>
  );
}
