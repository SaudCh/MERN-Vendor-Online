import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../../components/cart/card";
import { CartContext } from "../../context/cartContext";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";
import axios from "axios";
import { LoadingContext } from "../../context/loadingContext";

export default function Cart() {
  const navigate = useNavigate();

  const { cart, total } = useContext(CartContext);
  const [tot, setTot] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [coupon, setCoupon] = useState('')
  const [error, setError] = useState('')

  const { setIsLoading } = useContext(LoadingContext)

  const handleCoupon = async (e) => {
    e.preventDefault()

    setError('')

    if (!cart.length === 0) return

    if (!coupon) {
      setError({ coupon: 'Please enter a coupon code' })
      return
    }



    setIsLoading(true)
    await axios.post(`coupon/code`, {
      code: coupon
    }).then
      ((res) => {
        // setDiscount(res.data.discount)
        const coupon = res?.data?.coupon

        setDiscount(coupon?.discount)

      })
      .catch(err => {
        setError({ coupon: err?.response?.data?.message || err.message })
        setDiscount(0)
      }).finally(() => setIsLoading(false))
  }

  const handleCheckout = () => {

    if (cart.length === 0) return

    navigate('/checkout', {
      state: {
        coupon: coupon
      }
    })
  }


  useEffect(() => {
    let subTotal = total
    let delivery = 0

    let tot = subTotal + delivery

    setTot(tot - (tot * discount) / 100);

  }, [total, discount]);

  return (
    <div className="bg-slate-50 min-h-screen w-full py-5">
      <h1 className="text-center pb-5 font-semibold tracking-wider text-3xl">
        My Cart
      </h1>


      {
        cart.map((item, index) => {
          return (
            <CartCard
              key={index}
              product={item}
            />
          )
        })
      }

      {
        cart.length === 0 ? (
          // beautifull No items in cart text
          <div className="flex justify-center">
            <div className="w-11/12 bg-white shadow py-5 w-100 items-center ml-[-10px] text-center">
              <p>
                No items in cart
              </p>
            </div>
          </div>

        ) : null
      }
      {
        cart.length !== 0 && (
          <div className="flex justify-center">
            <div className="w-11/12 bg-white shadow py-5 w-100 items-center ml-[-10px]">
              <div className="flex justify-between px-5">
                <p className="text-lg font-semibold">Subtotal</p>
                <p className="text-lg font-semibold">{formatCurrencyPKR(total)}</p>
              </div>
              <div className="flex justify-between px-5">
                <button
                  onClick={() => navigate('/')}
                  className="bg-primary-700 text-white px-5 py-2 rounded-md hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-primary-700 text-white px-5 py-2 rounded-md hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
