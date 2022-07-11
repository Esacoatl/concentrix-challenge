import { HistoryModel } from '../../models/history.model';

export const CompressionFeatureName = 'COMPRESSSIONS_STATE';

export interface CompressionState {
  CompressionRecord: HistoryModel[];
  UncompressionRecord: HistoryModel[];
}
