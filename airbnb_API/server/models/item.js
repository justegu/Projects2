import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert apartment name"],
    },
    description: {
      type: String,
      required: [true, "Please insert apartment description"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Please insert bedrooms number"],
    },
    beds: {
      type: Number,
      required: [true, "Please insert beds number"],
    },
    price: {
      type: Number,
      required: [true, "Please insert price"],
    },
    address: {
      type: String,
      required: [true, "Please insert apartment address"],
    },
    image: {
      type: String,
      required: [true, "Please insert picture url"],
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;
