import { JSX } from 'react';
import s from './ingredient-preview.module.css';

type IngredientPreviewProps = {
  imageSrc: string;
  extraIngredientsCount?: number;
};

export function IngredientPreview({ imageSrc, extraIngredientsCount }: IngredientPreviewProps): JSX.Element {
  const fadeClass = extraIngredientsCount ? s.fade : '';
  return (
    <div className={s.preview__wrapper}>
      <div className={`${s.ingredient__preview}`}>
        <img src={imageSrc} className={fadeClass} alt='small ingredient' />
      </div>
      <p className={`text text_type_main-default ${s['extra__ingredients-count']}`}>
        {extraIngredientsCount && `+${extraIngredientsCount}`}
      </p>
    </div>

  );
}
