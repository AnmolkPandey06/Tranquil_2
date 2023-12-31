import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../redux-store/products/cartSlice";

const Cart = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

return (
  <div className="h-screen bg-gray-100 pt-20 mt-20">
    <h1 className="mb-14 text-center text-3xl font-bold">My Cart Items ({cart.length})</h1>
    <div className="mx-auto max-w-5xl h-[80%] justify-center px-6 md:flex md:space-x-6 xl:px-0">
      {/* Cart Items */}      
      <div className="md:w-2/3 mb-6 overflow-y-scroll">
        {cart?.map((product) => (
          <div key={product.id} className="rounded-lg">
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img
                src={product.image}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-lg text-gray-700">{product.by}</p>
                  <p className="text-md mt-2">Price - ₹{product.cutprice}</p>
                  <p className="text-md">Quantity - {product.quantity}</p>
                </div>
                
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center">
                    <button
                      onClick={() => dispatch(decreaseItemQuantity(product.id))}
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    >    
                      -
                    </button>
                    <input
                      min="0"
                      name="quantity"
                      className="h-8 w-8 bg-white text-center text-xs"
                      value={product.quantity}
                      onChange={() => null}
                    />
                    <button
                      onClick={() => dispatch(increaseItemQuantity(product.id))}
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-end items-center space-x-4">
                    <button
                      type="button"
                      className="mt-3 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => dispatch(removeItem(product.id))}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="md:w-1/3">
        <div className="rounded-lg border bg-white p-6 shadow-md mb-6">
          <div className="mb-4">
            <p className="text-center text-gray-900 text-2xl font-bold">Summary</p>
          </div>
          <hr className="my-4" />
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Total Quantity</p>
            <span>{totalQuantity}</span>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700 font-bold text-md">Total Amount</p>
            <span className="text-gray-700 font-bold text-md">₹{totalPrice}</span>
          </div>
          <hr className="my-4" />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 w-full rounded-full hover:bg-blue-600"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default Cart;