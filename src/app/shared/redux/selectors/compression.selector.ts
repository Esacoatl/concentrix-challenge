import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CompressionState,
  CompressionFeatureName,
} from '../state/compression.state';

export const selectAppState = (state: any) => state.App;
export const compressionSelector = createSelector(
  selectAppState,
  (state) => state.CompressionRecord
);
export const uncompressionSelector = createSelector(
  selectAppState,
  (state) => state.UncompressionRecord
);
