/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

interface Props {
  to: string;
  activeClassName?: string;
  className?: string;
}

const NavLink: React.FC<Props> = ({ to, activeClassName = 'active', className = '', children }) => {
  const router = useRouter();
  const appliedClassName = router.pathname === to ? activeClassName : className;
  return (
    <Link href={to}>
      <a className={appliedClassName}>{children}</a>
    </Link>
  );
};

export default NavLink;
