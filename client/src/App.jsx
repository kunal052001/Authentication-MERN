import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Product from './components/Product';
import Store from './components/Store';

function App() {
    const [products, setProducts] = useState([]);

    function Addproduct(name, price, quantity) {
        axios.post("http://localhost:5000/createproduct", { name, price, quantity })
            .then(() => Fetchproduct())
            .catch((err) => console.error(err));
    }

    function Fetchproduct() {
        axios.get("http://localhost:5000/displayproduct")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        Fetchproduct();
    }, []);

    return (
        <Router>
            <Sidebar />
            <Routes>
                <Route path='/product' element={<Product Addproduct={Addproduct} />} />
                <Route path="/" element={<Home />} />
                <Route path='/store' element={<Store products={products} />} />
            </Routes>
        </Router>
    );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// // import Login from './components/Login';
// // import Register from './components/Register';
// import Sidebar from './components/Sidebar';
// import Product from './components/Product';
// import Store from './components/Store';
// import axios from 'axios'

// import { useEffect,useState } from 'react';
// function App() {

//     const [product,setProduct]=useState([])
//          function Addproduct(name,price,quantity){
//              axios.post("http://localhost:5000/createproduct",{name:name,price:price,quantity:quantity})
//              .then((val)=>console.log(val))
//              .catch((err)=>console.error(err))
//              Fetchproduct()
//          }
//          function Fetchproduct(){
//             axios.get("http://localhost:5000/displayproduct")
//             .then((val)=>{console.log(val)
//                 ;setProduct(val.data)
//             })
//             .catch((err)=>console.error(err))
//          }
//          useEffect(()=>{
//              Fetchproduct()
//          },[])
//     return (
//         <Router>
//             <Sidebar/>
//             <Routes>
//                 <Route path='/product' element={<Product Addproduct={Addproduct} />}></Route>
//                 <Route path="/" element={<Home />} />
//                 <Route path='/store' element={<Store products={product} />} />


//                 {/* <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} /> */}
//             </Routes>
//         </Router>
        
//     );
// }

// export default App;