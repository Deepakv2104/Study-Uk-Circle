import React, { useState, useEffect } from 'react';
import './Explore.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const sampleFoods = [
  {
    foodName: 'Pizza Margherita',
    foodPrice: 12.99,
    foodImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    foodCategory: 'Italian'
  },
  {
    foodName: 'Sushi Platter',
    foodPrice: 24.99,
    foodImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    foodCategory: 'Japanese'
  },
  {
    foodName: 'Burger Deluxe',
    foodPrice: 9.99,
    foodImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    foodCategory: 'American'
  },
  {
    foodName: 'Caesar Salad',
    foodPrice: 7.49,
    foodImage: 'https://imgmedia.lbb.in/media/2019/08/5d662c8ea84656a7661be92a_1566977166741.jpg',
    foodCategory: 'Salad'
  },
  {
    foodName: 'Spaghetti Carbonara',
    foodPrice: 14.99,
    foodImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    foodCategory: 'Italian'
  },
  {
    foodName: 'Chocolate Cake',
    foodPrice: 6.99,
    foodImage: 'https://tse4.mm.bing.net/th?id=OIP.zC35B2ne3dEGYXW4JKu9cgHaEK&pid=Api&P=0&h=220',
    foodCategory: 'Dessert'
  }
];


const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState(sampleFoods)
  const navigate = useNavigate()
  function handleClick(foodName){
    navigate(`/user-dashboard/explore/${foodName}`)
  }


  const handleSearchChange = (e) => {
    let query = e.target.value
    if (query.length === 0) {
      setRestaurants(sampleFoods)
      return;
    }

    const filteredRestaurants = restaurants.filter((ele) =>
      ele.foodName.toLowerCase().includes(query.toLowerCase())
    );
    setRestaurants(filteredRestaurants)

  };




  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </div>
      ) : (

        <section className="py-14">
          <div className="max-w-screen-xl ">
            <div className="max-w-xl mx-auto sm:text-center mx-auto px-2 md:px-6">
              <h3 className="text-gray-100 text-3xl font-semibold sm:text-4xl">
                Manchester
              </h3>
              <p className="text-gray-300 mt-3">
                "Embark on a Culinary Journey and Savor the Finest Flavors from Around your area!"

              </p>
              <div className='md:flex align-items'>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="w-full px-0  mt-12 mr-10 ">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      onChange={handleSearchChange}
                    />
                  </div>
                </form>
                <div className="relative w-full mx-auto mt-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <select className="w-full px-3 py-3 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
                    <option>Italian</option>
                    <option>Meat</option>
                    <option>Burgers</option>
                    <option>Indian</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mx-auto px-2 md:px-6">
                {
                  restaurants.map((item, idx) => (
                    // <a href={`/user-dashboard/explore/${item.foodName}`}>
                    <li key={item.foodName} onClick={()=>handleClick(item.foodName)} >
                      <div className="w-full h-60 sm:h-52 md:h-56 ">
                        <img
                          src={item.foodImage}
                          className="w-full h-full object-cover object-center shadow-md rounded-xl"
                          alt=""
                        />
                      </div>
                      <div className="mt-4">
                        <h4 className="text-lg text-gray-300 font-semibold">{item.foodName}</h4>
                        <p className="text-gray-100 bg-blue-600 inline-block rounded-full p-1 px-2 mr-3">${item.foodPrice}</p>
                        <p className="text-gray-100 bg-blue-600 inline-block rounded-full p-1 px-2">{item.foodCategory}</p>

                      </div>
                    </li>
                    // </a> 
                  ))
                }
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Explore;
