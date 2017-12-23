// @flow
export type ColorType = {
  +id: string,
  +hexCode: string,
};

export type ReduxStoreType = {|
  +likedColors: ColorType[],
  +suggestedColors: ColorType[],
  +dislikedColors: ColorType[],
  +dataStatus: {
    +isFetching: boolean,
    +isStale: boolean,
    +hasFetchFailed: boolean,
  },
|};
