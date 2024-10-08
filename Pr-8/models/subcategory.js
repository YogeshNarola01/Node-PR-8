const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }
})
module.exports  = mongoose.model('subcategory', subcategorySchema);
