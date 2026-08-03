import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebook } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error } = useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Simuler une base de données d'utilisateurs
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { email: 'admin@flavorhouse.dz', password: 'admin123', name: 'Admin' },
      { email: 'driver@flavorhouse.dz', password: 'driver123', name: 'Driver' }
    ];
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si c'est admin (pour la redirection)
    if (formData.email === 'admin@flavorhouse.dz' && formData.password === 'admin123') {
      login(formData.email, formData.password);
      localStorage.setItem('adminAuth', 'true');
      success('🔐 Admin login successful!');
      navigate('/admin');
      return;
    }

    // Vérifier si c'est driver (pour la redirection)
    if (formData.email === 'driver@flavorhouse.dz' && formData.password === 'driver123') {
      login(formData.email, formData.password);
      localStorage.setItem('driverAuth', 'true');
      localStorage.setItem('driverName', 'Karim 🛵');
      success('🔐 Driver login successful!');
      navigate('/driver');
      return;
    }

    if (isLogin) {
      // === LOGIN ===
      const userExists = users.find(u => u.email === formData.email);
      
      if (!userExists) {
        error('❌ Account not found! Please sign up first.');
        return;
      }

      if (userExists.password !== formData.password) {
        error('❌ Incorrect password!');
        return;
      }

      login(formData.email, formData.password);
      success('✅ Login successful! Welcome back!');
      navigate('/');
      
    } else {
      // === SIGN UP ===
      if (formData.password !== formData.confirmPassword) {
        error('❌ Passwords do not match!');
        return;
      }

      if (formData.password.length < 6) {
        error('❌ Password must be at least 6 characters!');
        return;
      }

      const userExists = users.find(u => u.email === formData.email);
      
      if (userExists) {
        error('❌ Account already exists! Please login.');
        return;
      }

      // Ajouter le nouveau compte
      const newUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name || formData.email.split('@')[0]
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      login(formData.email, formData.password);
      success('🎉 Account created successfully! Welcome to Flavor House!');
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-800">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h1>
            <p className="text-gray-500 mt-2">
              {isLogin ? 'Login to your account' : 'Join Flavor House today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="text-right mb-4">
                <a href="#" className="text-sm text-red-600 hover:text-red-800">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-3 rounded-lg font-bold hover:bg-red-900 transition"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
              <FaGoogle className="text-red-500" />
              <span>Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
              <FaFacebook className="text-blue-600" />
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Toggle */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-red-800 font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-xs text-gray-500">
              Demo: admin@flavorhouse.dz / admin123
            </p>
            <p className="text-xs text-gray-500">
              Driver: driver@flavorhouse.dz / driver123
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
