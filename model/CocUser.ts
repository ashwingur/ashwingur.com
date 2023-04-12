import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Player } from "../shared/interfaces/coc.interface";

interface IData {
  time: number;
  player: Player;
}

interface ICocUser {
  id: string;
  data: IData[];
}
const userSchema = new Schema<ICocUser>({
  id: { type: String, required: true },
  data: [] as IData[],
});

const CocUser =
  mongoose.models.CocUser || mongoose.model("CocUser", userSchema);
export default CocUser;
