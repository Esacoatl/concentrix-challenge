import { HistoryModel } from '../../models/history.model';
import { createAction } from '@reduxjs/toolkit';

export enum ActionTypes {
  /** compress */
  COMPRESS_ACTION = 'Compress string',
  /** uncompress */
  UNCOMPRESS_ACTION = 'Uncompress string',
  /** history */
  PUT_COMPRESSION_HISTORY = '[PUT] into compression history',
  PUT_UNCOMPRESSION_HISTORY = '[PUT] into uncompression history',
  GET_COMPRESSION_HISTORY = '[GET] compression history',
  GET_UNCOMPRESSION_HISTORY = '[GET] uncompression history',
}

/** Actions */
export const CompressAction = createAction(
  ActionTypes.COMPRESS_ACTION,
  function prepare(chars: string) {
    return {
      payload: chars,
    };
  }
);
export const UncompressAction = createAction(
  ActionTypes.UNCOMPRESS_ACTION,
  function prepare(chars: string) {
    return {
      payload: chars,
    };
  }
);
/** Gets actions*/
export const GetCompressionHistoryAction = createAction(
  ActionTypes.GET_COMPRESSION_HISTORY
);
export const GetUncompressionHistoryAction = createAction(
  ActionTypes.GET_UNCOMPRESSION_HISTORY
);
/** Put on history */
export const PutCompressionHistoryAction = createAction(
  ActionTypes.PUT_COMPRESSION_HISTORY,
  function prepare(lastCompressed: HistoryModel[]) {
    return {
      payload: lastCompressed,
    };
  }
);
export const PutUncompressionHistoryAction = createAction(
  ActionTypes.PUT_UNCOMPRESSION_HISTORY,
  function prepare(lastUncompressed: HistoryModel[]) {
    return {
      payload: lastUncompressed,
    };
  }
);
