import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import ProductState from '../models/productStateModel.js';

import User from '../models/userModel.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  const productsWidthState = await Promise.all(
    products.map(async product => {
      const productState = await ProductState.find({ productId: product._id });

      return { ...product._doc, productState };
    })
  );

  res.status(200).json(productsWidthState);
});

export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: 'user' }).select('-password');

  res.status(200).json(customers);
});

// export const getProductsWithState = asyncHandler(async (req, res) => {
//   try {
//     const productsWithState = await ProductState.find().populate('product');
//     res.status(200).json(productsWithState);
//   } catch (error) {
//     res.status(error.statusCode).json(error.message);
//   }
// });
