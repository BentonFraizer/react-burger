import { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import s from './nav-btn.module.css';

type NavBtnProps = {
  className: string;
  icon: JSX.Element;
  to: string;
  children: string;
}

function NavBtn(props: NavBtnProps) {
  const { className, icon, children, to } = props;

  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? `${s.active} ${s['nav-link']}` : s['nav-link'])}>
      <button className={className}>
        {icon}
        <p className='text text_type_main-default ml-2'>
          {children}
        </p>
      </button>
    </NavLink>
  );
}

export default NavBtn;
