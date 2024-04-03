import { JSX } from 'react';
import s from './empty-bun.module.css';

type EmptyBunProps = {
  type: 'top' | 'bottom';
}

function EmptyBun({ type }: EmptyBunProps): JSX.Element {
  const cn = type === 'top' ? s['constructor-element_pos_top'] : s['constructor-element_pos_bottom'];
  return <div className={`${s['constructor-element']}  ${cn}`}>
    <span className={s['constructor-element__row']}>Выберите булки</span>
  </div>;
}

export default EmptyBun;
