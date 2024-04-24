import { JSX } from 'react';
import s from './loader-layout.module.css';
import Loader from '../loader/loader';

function LoaderLayout(): JSX.Element {
  return (
    <div className={s['loader-layout']}>
      <div className={s['loader-wrapper']}>
        <Loader/>
      </div>
    </div>
  );
}

export default LoaderLayout;
