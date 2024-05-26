const mongoose = require('mongoose');
const Seller = require('./seller.model');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
  totalItem: {
    type: Number,
    default: 0
  },
  totalSold: {
    type: Number,
    default: 0
  },
  totalIncome: {
    type: Number,
    default: 0
  },
  remainingItem: {
    type: Number,
    default: function() {
      return this.totalItem - this.totalSold; // Calculate remaining item
    }
  },
  seller: {
    type: String,
    ref: 'Seller'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  averageRating: {
    type: Number,
    default: 0
  }
});

productSchema.post('findOneAndUpdate', async function(doc) {
  // Recalculate remainingItem after update
  const updatedProduct = await this.model.findOne({ _id: doc._id });
  
  // Recalculate remainingItem
  updatedProduct.remainingItem = updatedProduct.totalItem - updatedProduct.totalSold;

  // Calculate totalIncome
  updatedProduct.totalIncome = updatedProduct.totalSold * updatedProduct.price;

  await updatedProduct.save();
});

// Method to calculate and update average rating
productSchema.methods.updateAverageRating = async function() {
  const Review = require('./review.model'); // Import the Review model here to avoid circular dependency issues
  const reviews = await Review.find({ product: this._id });
  const totalReviews = reviews.length;
  const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averageRating = totalReviews > 0 ? (sumRatings / totalReviews) : 0;
  await this.save();
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
