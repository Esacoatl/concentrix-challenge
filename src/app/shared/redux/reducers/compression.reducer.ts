import { Action, createReducer, on } from '@ngrx/store';
import { CompressionState } from '../state/compression.state';
import {
  CompressAction,
  GetCompressionHistoryAction,
  PutCompressionHistoryAction,
  UncompressAction,
  GetUncompressionHistoryAction,
  PutUncompressionHistoryAction,
} from '../actions/compression.actions';

export const initialCompressionAppState: CompressionState = {
  CompressionRecord: [],
  UncompressionRecord: [],
};

const reducer = createReducer(
  initialCompressionAppState,
  /** compress */
  on(CompressAction, (state) => state),
  on(GetCompressionHistoryAction, (state) => state),
  on(PutCompressionHistoryAction, (state, action) => ({
    ...state,
    CompressionRecord: action.payload,
  })),
  /** uncompress */
  on(UncompressAction, (state) => state),
  on(GetUncompressionHistoryAction, (state) => state),
  on(PutUncompressionHistoryAction, (state, action) => ({
    ...state,
    UncompressionRecord: action.payload,
  }))
);

export function CompressionReducer(
  state: CompressionState | undefined,
  action: Action
) {
  return reducer(state, action);
}
