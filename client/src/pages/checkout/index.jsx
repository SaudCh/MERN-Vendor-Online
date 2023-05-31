import React, { useContext } from 'react'
import './index.css'
import { CartContext } from '../../context/cartContext'

export default function Checkout() {

    const { cart, total } = useContext(CartContext)

    return (
        <div>
            <div class="py-4 container flex gap-3 items-center">
                <a href="index.html" class="text-primary text-base">
                    <i class="fas fa-home"></i>
                </a>
                <span class="text-sm text-gray-400"><i class="fas fa-chevron-right"></i></span>
                <p class="text-gray-600 font-medium uppercase">checkout</p>
            </div>

            <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
                <div class="lg:col-span-1" />
                <div class="lg:col-span-6 bg-white border border-gray-200 px-4 py-4 rounded">
                    <form action="">
                        <h3 class="text-lg font-medium capitalize mb-4">
                            checkout
                        </h3>

                        <div class="space-y-4">
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-gray-600 mb-2 block">
                                        First Name <span class="text-primary">*</span>
                                    </label>
                                    <input type="text" class="input-box" />
                                </div>
                                <div>
                                    <label class="text-gray-600 mb-2 block">
                                        Last Name <span class="text-primary">*</span>
                                    </label>
                                    <input type="text" class="input-box" />
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 mb-2 block">
                                    Company Name
                                </label>
                                <input type="text" class="input-box" />
                            </div>
                            <div>
                                <label class="text-gray-600 mb-2 block">
                                    County/Region <span class="text-primary">*</span>
                                </label>
                                <input type="text" class="input-box" />
                            </div>
                            <div>
                                <label class="text-gray-600 mb-2 block">
                                    Street Address <span class="text-primary">*</span>
                                </label>
                                <input type="text" class="input-box" />
                            </div>
                            <div>
                                <label class="text-gray-600 mb-2 block">
                                    Town/City <span class="text-primary">*</span>
                                </label>
                                <input type="text" class="input-box" />
                            </div>
                            <div>
                                <label class="text-gray-600 mb-2 block">
                                    Zip Code <span class="text-primary">*</span>
                                </label>
                                <input type="text" class="input-box" />
                            </div>
                            <div>
                                <label class="text-gray-600 mb-2 block">
                                    Phone Number <span class="text-primary">*</span>
                                </label>
                                <input type="text" class="input-box" />
                            </div>
                            <div>
                                <label class="text-gray-600 mb-2 block">
                                    Email Address <span class="text-primary">*</span>
                                </label>
                                <input type="text" class="input-box" />
                            </div>
                        </div>
                    </form>
                </div>

                <div class="lg:col-span-4 bg-white border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
                    <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">ORDER SUMMARY</h4>
                    <div class="space-y-2">
                        {
                            cart.map((item, index) => (
                                <div class="flex justify-between" v-for="n in 3" key="n">
                                    <div>
                                        <h5 class="text-gray-800 font-medium">{item?.title}</h5>
                                        {/* <p class="text-sm text-gray-600">Size: M</p> */}
                                    </div>
                                    <p class="text-gray-600">x{item?.quantity}</p>
                                    <p class="text-gray-800 font-medium">{item?.quantity * item?.price}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div class="flex justify-between border-b border-gray-200 mt-1">
                        <h4 class="text-gray-800 font-medium my-3 uppercase">Subtotal</h4>
                        <h4 class="text-gray-800 font-medium my-3 uppercase">PKR {total}</h4>
                    </div>
                    <div class="flex justify-between border-b border-gray-200">
                        <h4 class="text-gray-800 font-medium my-3 uppercase">Shipping</h4>
                        <h4 class="text-gray-800 font-medium my-3 uppercase">Free</h4>
                    </div>
                    <div class="flex justify-between">
                        <h4 class="text-gray-800 font-semibold my-3 uppercase">Total</h4>
                        <h4 class="text-gray-800 font-semibold my-3 uppercase">PKR {total}</h4>
                    </div>

                    <div class="flex items-center mb-4 mt-2">
                        <input type="checkbox" id="agreement"
                            class="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3" />
                        <label for="agreement" class="text-gray-600 ml-3 cursor-pointer text-sm">
                            Agree to our
                            <a href="#" class="text-primary">terms & conditions</a>
                        </label>
                    </div>

                    <a class="bg-primary border border-secondary-900 text-secondary-900  px-4 py-3 font-medium rounded-md uppercase hover:bg-secondary-800 hover:text-white
         hover:text-primary transition text-sm w-full block text-center">
                        Place order
                    </a>
                </div>
            </div>

        </div >
    )
}
