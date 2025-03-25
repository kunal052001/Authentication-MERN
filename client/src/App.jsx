import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Product from './components/Product';
import Store from './components/Store';

function App() {
    return (
        <Router>
            <Sidebar/>
            <Routes>
                <Route path='/product' element={<Product/>}></Route>
                <Route path="/" element={<Home />} />
                <Route path='/store' element={<Store/>}></Route>
                {/* <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> */}
            </Routes>
        </Router>
    );
}

export default App;