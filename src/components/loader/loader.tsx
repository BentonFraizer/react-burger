import { JSX } from 'react';
import s from './loader.module.css';

type LoaderProps = {
  small?: boolean;
}

function Loader({ small }:LoaderProps):JSX.Element {
  const smallSize = { width: 10 };
  return (
    <div className={s.loader} style={small ? smallSize : {}}/>
  );
}

export default Loader;
