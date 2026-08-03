import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();
  const { success, error } = useNotification();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getTotal();

  const handleCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s/g, '').replace(/\D/g, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 16) {
        error('❌ Please enter a valid card number');
        return;
      }
      if (!cardData.cardName) {
        error('❌ Please enter card holder name');
        return;
      }
      if (!cardData.expiry || cardData.expiry.length < 5) {
        error('❌ Please enter valid expiry date (MM/YY)');
        return;
      }
      if (!cardData.cvc || cardData.cvc.length < 3) {
        error('❌ Please enter valid CVC');
        return;
      }
    }

    setIsProcessing(true);

    // Simuler le paiement
    setTimeout(() => {
      setIsProcessing(false);
      success('✅ Payment successful! Your order is confirmed! 🎉');
      clearCart();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          💳 Payment
        </h1>

        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Order Summary */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
            <div className="mt-2 space-y-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">{item.price * item.quantity} DA</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-red-800">{total} DA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block font-bold text-gray-700 mb-3">Payment Method</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 border-2 rounded-lg text-center transition ${
                  paymentMethod === 'card' ? 'border-red-800 bg-red-50' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <FaCreditCard className="text-2xl mx-auto mb-1" />
                <span className="text-sm">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 border-2 rounded-lg text-center transition ${
                  paymentMethod === 'paypal' ? 'border-red-800 bg-red-50' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <FaPaypal className="text-2xl mx-auto mb-1 text-blue-600" />
                <span className="text-sm">PayPal</span>
              </button>
              <button
                onClick={() => setPaymentMethod('apple')}
                className={`p-3 border-2 rounded-lg text-center transition ${
                  paymentMethod === 'apple' ? 'border-red-800 bg-red-50' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <FaApplePay className="text-2xl mx-auto mb-1" />
                <span className="text-sm">Apple Pay</span>
              </button>
              <button
                onClick={() => setPaymentMethod('google')}
                className={`p-3 border-2 rounded-lg text-center transition ${
                  paymentMethod === 'google' ? 'border-red-800 bg-red-50' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <FaGooglePay className="text-2xl mx-auto mb-1" />
                <span className="text-sm">Google Pay</span>
              </button>
            </div>
          </div>

          {/* Card Form */}
          {paymentMethod === 'card' && (
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formatCardNumber(cardData.cardNumber)}
                  onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                  maxLength="19"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Card Holder Name</label>
                <input
                  type="text"
                  name="cardName"
                  placeholder="John Doe"
                  value={cardData.cardName}
                  onChange={handleCardChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                    maxLength="5"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={handleCardChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                    maxLength="4"
                  />
                </div>
              </div>
            </form>
          )}

          {/* Other payment methods message */}
          {paymentMethod !== 'card' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-700">
                🔗 You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your payment.
              </p>
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full mt-6 py-4 rounded-full font-bold text-lg text-white transition ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-800 hover:bg-red-900'
            }`}
          >
            {isProcessing ? '⏳ Processing...' : `Pay ${total} DA`}
          </button>

          <p className="text-center text-xs text-gray-400 mt-3">
            🔒 Your payment is secure. We do not store card details.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
