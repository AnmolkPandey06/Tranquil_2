import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import './AdminLogin.css';
import './Adminprofile.css'

const AdminProductsManage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Entering useEffect');
    const fetchData = async () => {
      try {
        console.log('Fetching data');
        const response = await axios.get('http://localhost:3000/admin/adminproductsmanage/644528c526df9c16c244b1fd');
        setData(response.data.prod);
        setLoading(false);
        console.log('Data received:', response.data.prod);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
    console.log('Exiting useEffect');
  }, []); // Empty dependency array to fetch data only once on component mount

  const ProductCategorySection = ({ category, prod }) => {
    return (
      <section className={`${category.toLowerCase()} section-p1`}>
        <div className="text-center container py-5">
          <h1 className="mb-5 green2 product-type">
            <strong style={{ fontFamily: 'Roboto, sans-serif' }}>{category}</strong>
          </h1>
        </div>
        <div className="flex flex-wrap justify-around mb-12">
          {prod.map((product) => (
            product.Type === category ? (


              <div className="card">
                <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                  <img src={product.image} className="w-100" alt={`Product: ${product.Name}`} />
                  <a href="#!">
                    <div className="hover-overlay">
                      <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </div>
                  </a>
                </div>
                <div className="card-body">
                  <a href="#" className="text-reset">
                    <h5 className="card-title mb-3">{product.Name}</h5>
                  </a>
                  <a href="#" className="text-reset">
                    <p>{product.author}</p>
                  </a>
                  <h6 className="mb-3">MRP: ₹{product.Price}</h6>
                  <form action={`/admin/adminproductdelete/${product._id}?_method=DELETE`} method="post" id={`${product._id}_deleter`}></form>
                  <form action={`/admin/adminproductupdate/${product._id}?_method=PUT`} method="post" id={`${product._id}_updater`}></form>
                  <label htmlFor="price">Discounted Price</label><br />
                  <input
                    type="Number"
                    id="price"
                    min="1"
                    max={product.Price}
                    form={`${product._id}_updater`}
                    name="productcutprice"
                    placeholder={` ${product.Cutprice}`}
                  /><br />
                  <label htmlFor="price">Stock</label><br />
                  <input
                    type="Number"
                    id="price"
                    min="0"
                    name="productstock"
                    form={`${product._id}_updater`}
                    placeholder={` ${product.Stock}`}
                  /><br />
                  <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800" type="submit" form={`${product._id}_updater`}>
                    Submit
                  </button>
                  <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800 ml-2" type="submit" form={`${product._id}_deleter`}>
                    Delete
                  </button>
                </div>
              </div>

            ) : null
          ))}
        </div>


      </section>
    );
  };

  const ProductModal = ({ newProduct, handleInputChange, handleSubmit }) => {
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Product
              </h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Modal Content Starts here */}
              <form noValidate className="validated-form" onSubmit={handleSubmit}>
                {/* Add form inputs for newProduct */}
              </form>
            </div>
            <div className="modal-footer" style={{ marginRight: '25%' }}>
              <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                Close
              </button>
              <button type="submit" form="create" className="btn btn-primary ms-6">
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sabkuch">
      <div className="expert-div flex justify-center">
        <img src="https://i.imgur.com/ujX2KRl.png" className="expert-banner" alt="expert" />
      </div>
      {
        loading ?
          (
            <div className="flex justify-center items-center h-32">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          )
          :
          (
            <div>
              {/* Add the layout and stylesheet links if necessary */}
              {/* <div className="flex justify-content-center">
                <img
                  src="https://i.imgur.com/uc9EeQL.png"
                  style={{
                    width: '65%',
                    borderRadius: '4rem',
                    marginTop: '1rem',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                  alt="wellness"
                />
              </div> */}

              <ProductCategorySection category="Mindfulness Books" prod={data} />

              <ProductCategorySection category="Stress Busters" prod={data} />

              <ProductCategorySection category="Herbals" prod={data} />

              <ProductCategorySection category="Sleepwell" prod={data} />

              {/* <ProductModal
                newProduct={newProduct}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              /> */}

              <div className="flex justify-content-center align-items-center px-5 mt-6">
                {/* <div className="mt-4 text-center mb-4">
                  <button
                    className="btn btn-primary btn-lg profile-button"
                    type="button"
                    data-mdb-toggle="modal"
                    data-mdb-target="#exampleModal"
                  >
                    New Product
                  </button>
                </div> */}
                <button
                  type="button"
                  onClick={() => window.location.href = '/adminside'}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  Back
                </button>
              </div>
            </div>
          )
      }
    </div>
  );
};




export default AdminProductsManage;
