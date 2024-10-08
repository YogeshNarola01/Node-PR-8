const mongoose = require("mongoose");
const exsubcategorySchema = mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategoryId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "subcategory",
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
});
module.exports = mongoose.model("exsubcategory", exsubcategorySchema);