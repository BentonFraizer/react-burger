import { JSX } from 'react';
import s from './empty-filling.module.css';

function EmptyFilling(): JSX.Element {
  return <div className={`${s['constructor-element']} mb-2 mt-2`}>
    <span className={s['constructor-element__row']}>Выберите начинку</span>
  </div>;
}

export default EmptyFilling;
