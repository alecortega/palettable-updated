// @flow
import { createSelector } from 'reselect';
import dislikedColorsSelector from '../selectors/dislikedColorsSelector';
import likedColorsSelector from '../selectors/likedColorsSelector';

const suggestedColorsSelector = (state: ReduxStoreType) =>
  state.suggestedColors;

const suggestedColorSelector = createSelector(
  suggestedColorsSelector,
  dislikedColorsSelector,
  likedColorsSelector,
  (
    suggestedColors: ColorType[],
    dislikedColors: ColorType[],
    likedColors: ColorType[]
  ): ColorType | void => {
    const flattenedDislikedColors = dislikedColors.map(color => color.hexCode);
    const flattenedLikedColors = likedColors.map(color => color.hexCode);
    const remainingColors = suggestedColors
      .filter(color => flattenedDislikedColors.indexOf(color.hexCode) === -1)
      .filter(color => flattenedLikedColors.indexOf(color.hexCode) === -1);

    return remainingColors[0];
  }
);

export default suggestedColorSelector;
