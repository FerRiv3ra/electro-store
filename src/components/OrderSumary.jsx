import useDashboard from '../hooks/useDashboard';

const OrderSumary = () => {
  const { checkoutPayment, shopping_cart, total } = useDashboard();
  return (
    <div id="summary" className="w-1/4 px-8 py-10">
      <h1 className="font-semibold text-2xl border-b pb-3">Order Summary</h1>
      <div className="py-10">
        <label
          htmlFor="promo"
          className="font-semibold inline-block mb-2 text-sm uppercase"
        >
          Promo Code
        </label>
        <input
          type="text"
          id="promo"
          placeholder="Enter your code"
          className="p-2 text-sm w-full"
        />
      </div>
      <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
        Apply
      </button>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>${total}</span>
        </div>
        <button
          onClick={checkoutPayment}
          disabled={!shopping_cart.length}
          className={`font-semibold ${
            !shopping_cart.length
              ? 'bg-gray-500'
              : 'bg-indigo-500 hover:bg-indigo-600'
          } py-3 text-sm text-white uppercase w-full`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSumary;
