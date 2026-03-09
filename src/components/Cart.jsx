import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';

// ─── Zustand Store ────────────────────────────────────────────────────────────
export const useCartStore = create((set) => ({
    items: [],
    addToCart: (product) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === product.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
    removeCart: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    updateQuantity: (id, quantity) =>
        set((state) => ({
            items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
    clearCart: () => set({ items: [] }),
}));

// ─── Step Indicator ───────────────────────────────────────────────────────────
const steps = [
    { num: '01', label: 'SHOPPING BAG', sub: 'Manage Your Items List', path: '/cart' },
    { num: '02', label: 'SHIPPING AND CHECKOUT', sub: 'Checkout Your Items List', path: '/checkout' },
    { num: '03', label: 'CONFIRMATION', sub: 'Review And Submit Your Order', path: '/confirmation' },
];

const StepIndicator = ({ currentStep = 0 }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-start gap-0 mb-10 border-b border-gray-200">
            {steps.map((step, idx) => {
                const isActive = idx === currentStep;
                const isClickable = idx > currentStep;

                return (
                    <div
                        key={step.num}
                        onClick={() => isClickable && navigate(step.path)}
                        className={`flex-1 pb-4 border-b-2 transition-all duration-200 ${
                            isActive
                                ? 'border-[#222222]'
                                : 'border-transparent'
                        } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                        <div
                            className={`flex items-baseline gap-2 ${
                                isClickable ? 'hover:opacity-70' : ''
                            }`}
                        >
                            <span className="text-xs text-gray-400 font-medium">{step.num}</span>
                            <span
                                className={`text-[13px] font-semibold tracking-wide ${
                                    isActive ? 'text-[#222222]' : 'text-gray-400'
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5 ml-6">{step.sub}</p>
                    </div>
                );
            })}
        </div>
    );
};

// ─── Cart Component ───────────────────────────────────────────────────────────
const Cart = () => {
    const { items: cartItems, removeCart, updateQuantity, clearCart } = useCartStore();

    const incrementQuantity = (item) => {
        updateQuantity(item.id, item.quantity + 1);
    };

    const decrementQuantity = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const vat = +(subtotal * 0.015).toFixed(2);
    const total = +(subtotal + vat).toFixed(2);

    return (
        <section className="pt-10 md:pt-16 pb-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 tracking-tight">CART</h1>

                {/* Step Indicator */}
                <StepIndicator currentStep={0} />

                {cartItems.length > 0 ? (
                    <>
                        {/* Two-column layout: items left, totals right */}
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* ── Left: Cart Items ── */}
                            <div className="flex-1 min-w-0">
                                {/* Header Row */}
                                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-2 py-3 border-b border-gray-200 mb-4">
                                    {['PRODUCT', 'PRICE', 'QUANTITY', 'SUBTOTAL', ''].map((h) => (
                                        <span key={h} className="text-[11px] font-semibold text-gray-500 tracking-widest">
                                            {h}
                                        </span>
                                    ))}
                                </div>

                                {/* Items */}
                                <AnimatePresence mode="popLayout">
                                    {cartItems.map((cart, index) => (
                                        <motion.div
                                            key={cart.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-2 py-5 border-b border-gray-100"
                                        >
                                            {/* Product Info */}
                                            <div className="flex gap-4 items-center">
                                                <div className="relative group shrink-0">
                                                    <img
                                                        className="w-16 h-16 object-cover border border-gray-100 rounded-sm bg-gray-50"
                                                        src={cart.thumbnail}
                                                        alt={cart.title}
                                                    />
                                                    <div
                                                        onClick={() => removeCart(cart.id)}
                                                        className="absolute -top-2 -right-2 bg-[#DB4444] text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <IoCloseOutline className="text-[14px]" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-[14px] font-medium leading-snug">{cart.title}</h3>
                                                    {cart.color && (
                                                        <p className="text-[12px] text-gray-400">Color: {cart.color}</p>
                                                    )}
                                                    {cart.size && (
                                                        <p className="text-[12px] text-gray-400">Size: {cart.size}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="flex md:block items-center justify-between">
                                                <span className="md:hidden text-[11px] text-gray-400 uppercase tracking-wider">Price</span>
                                                <span className="text-[14px]">${cart.price}</span>
                                            </div>

                                            {/* Quantity */}
                                            <div className="flex md:block items-center justify-between">
                                                <span className="md:hidden text-[11px] text-gray-400 uppercase tracking-wider">Quantity</span>
                                                <div className="flex items-center justify-between w-24 h-10 border border-gray-300 rounded-sm px-2">
                                                    <span className="text-[14px] w-5 text-center">{cart.quantity}</span>
                                                    <div className="flex flex-col">
                                                        <MdKeyboardArrowUp
                                                            onClick={() => incrementQuantity(cart)}
                                                            className="cursor-pointer hover:text-[#DB4444] select-none text-lg"
                                                        />
                                                        <MdKeyboardArrowDown
                                                            onClick={() => decrementQuantity(cart)}
                                                            className="cursor-pointer hover:text-[#DB4444] select-none text-lg"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="flex md:block items-center justify-between">
                                                <span className="md:hidden text-[11px] text-gray-400 uppercase tracking-wider">Subtotal</span>
                                                <span className="text-[14px] font-medium">${(cart.price * cart.quantity).toFixed(2)}</span>
                                            </div>

                                            {/* Remove (desktop) */}
                                            <button
                                                onClick={() => removeCart(cart.id)}
                                                className="hidden md:flex text-gray-300 hover:text-[#DB4444] transition-colors"
                                            >
                                                <IoCloseOutline className="text-xl" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                                    <div className="flex gap-3">
                                        <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                                            <input
                                                type="text"
                                                placeholder="Coupon Code"
                                                className="px-4 py-2.5 text-[13px] outline-none w-36"
                                            />
                                            <button className="px-4 py-2.5 text-[13px] bg-gray-100 hover:bg-gray-200 border-l border-gray-300 transition-colors font-medium tracking-wide">
                                                APPLY COUPON
                                            </button>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={clearCart}
                                        className="border border-gray-300 rounded-sm py-2.5 px-10 text-[13px] hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-all select-none font-medium tracking-wide"
                                    >
                                        UPDATE CART
                                    </motion.button>
                                </div>
                            </div>

                            {/* ── Right: Cart Totals ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ width: '470px', minWidth: '470px' }}
                                className="border-2 border-[#222222] rounded-sm px-6 pt-6 pb-8 flex-shrink-0"
                            >
                                <h3 className="text-[13px] font-bold tracking-widest mb-5 uppercase">Cart Totals</h3>

                                <div className="flex justify-between py-4 border-b border-gray-200 text-[14px]">
                                    <span className="text-gray-500">SUBTOTAL</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="py-4 border-b border-gray-200">
                                    <div className="flex justify-between text-[14px] mb-3">
                                        <span className="text-gray-500">SHIPPING</span>
                                        <div className="text-right space-y-2">
                                            {[
                                                { id: 'free', label: 'Free shipping' },
                                                { id: 'flat', label: 'Flat rate: $49' },
                                                { id: 'local', label: 'Local pickup: $8' },
                                            ].map((opt) => (
                                                <label key={opt.id} className="flex items-center gap-2 justify-end cursor-pointer">
                                                    <span className="text-[13px] text-gray-600">{opt.label}</span>
                                                    <input
                                                        type="checkbox"
                                                        name="shipping"
                                                        value={opt.id}
                                                        className="accent-[#222222]"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-[13px] text-gray-400">Shipping to AL.</span>
                                        <button className="text-[12px] font-bold underline underline-offset-2 tracking-wide hover:text-[#DB4444] transition-colors">
                                            CHANGE ADDRESS
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between py-4 border-b border-gray-200 text-[14px]">
                                    <span className="text-gray-500">VAT</span>
                                    <span className="font-medium">${vat.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between py-4 text-[14px]">
                                    <span className="font-bold tracking-wide">TOTAL</span>
                                    <span className="font-bold">${total.toFixed(2)}</span>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="block text-center mt-4 py-4 bg-[#222222] text-white text-[13px] font-bold tracking-widest rounded-sm hover:bg-[#DB4444] transition-all"
                                >
                                    PROCEED TO CHECKOUT
                                </Link>
                            </motion.div>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 px-6 bg-[#f9f9f9] rounded-lg border-2 border-dashed border-gray-300"
                    >
                        <div className="mb-6 bg-white p-5 rounded-full shadow-md">
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-[22px] font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                        <p className="text-gray-500 mb-8 text-center">Add some products to your cart to see them here.</p>
                        <Link to="/" className="bg-[#DB4444] text-white px-10 py-3 rounded-sm hover:bg-black transition-all">
                            Go Shopping
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Cart;
