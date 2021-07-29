import * as mongoose from 'mongoose';

const akaTSchema = new mongoose.Schema(
  {
    MISPAR_ISHI: { type: String, unique: true },
    MISPAR_MOFE: String,
    T_RISHUM_TCHILA: String,
    KIDOMET: String,
    EZUR_HIUG: String,
    MIS_TELEPHON: String,
    SUG_TELEPHONE: String,
    SUG_KTOVET: String,
  },
  { versionKey: false }
);

export default akaTSchema;
