import mongoosePaginate from "mongoose-paginate-v2";
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: Number,
    },
  ],
});
CartSchema.plugin(mongoosePaginate);

export default mongoose.model("Carts", CartSchema);
