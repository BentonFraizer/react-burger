import { JSX } from 'react'

type NavBtnProps = {
  className: string;
  icon: JSX.Element;
  children: string;
}

function NavBtn(props: NavBtnProps) {
  const { className, icon, children } = props;

  return (
    <button className={className}>
      {icon}
      <p className="text text_type_main-default ml-2">
        {children}
      </p>
    </button>
  );
}

export default NavBtn;