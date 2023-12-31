import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminLogin.css'
import './AdminProfile.css'
import './feedindex.css'


const AdminProfile = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('Entering useEffect');
        const fetchData = async () => {
            try {
                console.log('Fetching data');
                const response = await axios.get('http://localhost:3000/admin/adminprofile/644528c526df9c16c244b1fd');
                setData(response.data);
                setLoading(false);
                console.log('Data received:', response.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
        console.log('Exiting useEffect');
    }, []);


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
                        <section id="first" className="flex justify-center items-center">
                            <div className="container py-5">
                                <div className="row flex justify-center items-center">
                                    <div className="col-lg-11 py-6 px-4">
                                        <div className="card mb-1 ">
                                            <div className="card-body bg-gray-100">
                                                <div className="row">
                                                    <div className="flex justify-center items-center mb-3 ">
                                                        <h2 className="text-4xl font-bold"><strong>Admin Profile</strong></h2>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Name</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{data.admini.name}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Email</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{data.admini.email}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>

                                            {/* Manage Products */}
                                            <div className="mb-4">
                                                <div className="mb-4">
                                                    <div className="ps-5">
                                                        <div className="flex justify-start items-center pt-3 mt-3">
                                                            <h3 className="text-right text-3xl font-bold">Manage Products</h3>
                                                        </div>
                                                        <div className="flex justify-left items-center px-5 mt-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => (window.location.href = '/adminside/products')}
                                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                                            >
                                                                Manage
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Manage Experts */}
                                                <div className="ps-5">
                                                    <div className="flex justify-start items-center pt-3 mt-3">
                                                        <h3 className="text-right">Manage Experts Requests</h3>
                                                    </div>
                                                    {data.docs.map((doctor) => (
                                                        <div key={doctor._id} className="container py-5 pt-3">
                                                            <div className="card shadow-0 border rounded-3 bg-gray-100">
                                                                <div className="card-body flex">
                                                                    <div className="w-1/4">
                                                                        <div className="bg-image hover-zoom ripple rounded-full overflow-hidden">
                                                                            <img src={doctor.pfp} className="w-32 h-32 object-cover object-center rounded-full" alt="Doctor Profile" />
                                                                            <a href="#!">
                                                                                <div className="hover-overlay">
                                                                                    <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-1/2 ml-4">
                                                                        <h5 className='font-bold'>{doctor.Name}</h5>
                                                                        <div className="d-flex flex-row">
                                                                            <a href={doctor.document}><button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Document</button></a>
                                                                        </div>
                                                                        {Object.values(doctor.ExpertsIn).map((tag, index) => (
                                                                            <div key={index} className="mt-1 mb-0 text-muted small">
                                                                                <span className="text-success"> • </span>
                                                                                <span>{tag}</span>
                                                                            </div>
                                                                        ))}
                                                                        <p className="text-truncate mb-4 mb-md-0">{doctor.Experience} yr of experience</p>
                                                                    </div>
                                                                    <div className="w-1/4">
                                                                        <h5 className="text">Charges</h5>
                                                                        <h6 className="text-primary">₹ {doctor.Charge}/Sessions</h6>
                                                                        <div className="d-flex flex-column mt-4">
                                                                            <h5 className="text">Choose Action</h5>
                                                                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800" onClick={() => window.location.href = `/admin/adminexpertaccept/${doctor._id}`} type="button">Accept</button>
                                                                            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800 ml-2" onClick={() => window.location.href = `/admin/adminexpertdelete/${doctor._id}`} type="button">Reject</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Manage Feed */}
                                                <div className="ps-5">
                                                    <div className="flex justify-start items-center pt-3 mt-3">
                                                        <h3 className="text-right">Manage Reported Posts</h3>
                                                    </div>
                                                    <ul>
                                                        {data.feeds.map((feed) => (
                                                            <div key={feed._id} className="carddiv container p-3">
                                                                <div className="card mb-2">
                                                                    <div className="carddiv container p-3 bg-gray-100">
                                                                        <div className="card mb-2">
                                                                            <div className="card-footer">
                                                                                <div className="profile">
                                                                                    <div>
                                                                                        <span className="round"><img src={feed.author.pfp} alt="user" width="40" /></span>&nbsp;{feed.author.username}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <a className="cardanchor" href={`/feed/${feed.id}`}>
                                                                                {feed.image && <img className="card-img-top p-3" src={feed.image} alt="Card image cap" />}
                                                                                <div style={{ fontSize: '1rem', marginBottom: '0rem !important' }} className="card-body">
                                                                                    <div className="card-data">
                                                                                        <h5 className="card-title">{feed.title}</h5>
                                                                                        <p className="card-subtitle">{feed.caption}</p>
                                                                                        <p style={{ fontSize: '1rem' }}>{feed.likes} Got Inspired</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-footer ">
                                                                                    <small className="text-muted">{feed.uploaddate}</small>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <hr />
                                                                        <div>
                                                                            <div className="d-flex m-4">
                                                                                <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800" type="button" onClick={() => window.location.href = `/admin/adminfeedok/${feed._id}`}>No Problem</button>
                                                                                <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800 ml-2" type="button" onClick={() => window.location.href = `/admin/adminfeeddelete/${feed._id}`}>Delete Post</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>                                                        </div>
                                                                <hr />
                                                                {/* Render action buttons */}
                                                            </div>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
            }
        </div>
    );
};

export default AdminProfile;
