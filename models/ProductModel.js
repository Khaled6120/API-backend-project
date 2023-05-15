const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Too short product title"],
        maxlength: [100, "Too long product title"]
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [20, "Too short product description"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        trim: true,
        max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    imageCover: {
        type: String,
        required: [true, "Product image cover is required"],
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, "Product category is required"]
    },
    subcategories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
    }],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
    },
    ratingsAverage: {
        type: Number,
        min: [1, "Rating must be greater than 1"],
        max: [5, "Rating must be less than 5"]
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

//mongoose query middleware
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "category",
        select: 'name -_id'
    })
    next()
})

const setImageURL = (doc) => {
    if (doc.imageCover) {
        const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`
        doc.imageCover = imageUrl
    }
    if (doc.images) {
        let imagesList = []
        doc.images.forEach(image => {
            const imageUrl = `${process.env.BASE_URL}/products/${image}`
            imagesList.push(imageUrl)
        });
        doc.images = imagesList
    }
}

// find all, find id, update by id handlers
productSchema.post('init', (doc) => {
    setImageURL(doc)
})
// create handler
productSchema.post('save', (doc) => {
    setImageURL(doc)
})

module.exports = mongoose.model('Product', productSchema);