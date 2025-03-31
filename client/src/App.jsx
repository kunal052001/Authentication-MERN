import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Product from './components/Product';
import Store from './components/Store';
import Login from './components/Login';
import Register from './components/Register';
import AuthContext from './context/AuthContext';

function App() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check if user is authenticated on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/current', {
                    withCredentials: true
                });
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Fetch products when user changes
    const Fetchproduct = useCallback(async () => {
        if (!user) return;
        
        setProductsLoading(true);
        setError(null);
        try {
            const res = await axios.get("http://localhost:5000/api/products/displayproduct", {
                withCredentials: true
            });
            setProducts(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch products');
            console.error(err);
        } finally {
            setProductsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        Fetchproduct();
    }, [Fetchproduct]);

    const Addproduct = async (name, price, quantity) => {
        try {
            await axios.post(
                "http://localhost:5000/api/products/createproduct", 
                { name, price, quantity },
                { withCredentials: true }
            );
            await Fetchproduct();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product');
            console.error(err);
        }
    };

    const loginUser = async (email, password) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/login', 
                { email, password },
                { withCredentials: true }
            );
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || 'Login failed' 
            };
        }
    };

    const registerUser = async (name, email, password) => {
        try {
            await axios.post(
                'http://localhost:5000/api/auth/register', 
                { name, email, password }
            );
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logoutUser = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/auth/logout', 
                {}, 
                { withCredentials: true }
            );
            setUser(null);
            setProducts([]);
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || 'Logout failed' 
            };
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            loginUser, 
            registerUser, 
            logoutUser,
            error: error,
            clearError: () => setError(null)
        }}>
            <Router>
                {user && <Sidebar />}
                {error && (
                    <div className="global-error">
                        {error}
                        <button onClick={() => setError(null)}>×</button>
                    </div>
                )}
                <Routes>
                    <Route 
                        path="/login" 
                        element={!user ? <Login /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/register" 
                        element={!user ? <Register /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/" 
                        element={user ? <Home /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/product" 
                        element={
                            user ? (
                                <Product 
                                    Addproduct={Addproduct} 
                                    loading={productsLoading} 
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        } 
                    />
                    <Route 
                        path="/store" 
                        element={
                            user ? (
                                <Store 
                                    products={products} 
                                    loading={productsLoading} 
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        } 
                    />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;