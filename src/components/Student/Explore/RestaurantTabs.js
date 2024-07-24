import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useMediaQuery } from "@mui/material";
import { collection, doc, getDoc,  } from 'firebase/firestore';
import { firestore } from '../../../firebase';



const tabItems = [
    { name: "Deals", id: "deals" },
    { name: "Menu", id: "menu" },
    { name: "Timings", id: "timings" },
    { name: "Location", id: "location" },
];
const posts = [
    {
        img: "https://media.timeout.com/images/102945700/image.jpg",
    },
    {
        img: "https://tse2.mm.bing.net/th?id=OIP.cuJjavKtIjsu5ATwiD1sggHaE8&pid=Api&P=0&h=220",
    },
    {
        img: "https://pixfeeds.com/images/baby-care/baby-shower-food-recipes/1200-518706414-party-food.jpg",
    }
]
const Deals = ({restaurantData}) => (
    <div id="deals" className="py-8 w-full xs:bg-red-500">

        <h1 className="mb-2  font-bold text-3xl">Exclusive Worldlynk Deals</h1>
        <p className="mb-8 text-xl">Here you will find all the deals that the restaurant offers exclusively for Worldlynk users</p>
        {/* <h1>Deals</h1> */}
        <div className="grid lg:grid-cols-2 w-full gap-16 ">
            <div className="  bg-orange-500 rounded-3xl shadow-lg  p-4 sm:p-0 ">
                <div>
                    {/* <h1 className="font-bold">Deal 1</h1> */}
                    <p className="text-2xl font-bold">{restaurantData?.deal1.title}</p>
                    <div className="flex lg:gap-4 gap-2 text-lg " >
                        {restaurantData?.deal1Tags.map((tag)=>{
                            return  <p key={tag} className="border-1 rounded-full lg:px-6 lg:py-2 px-2 py-1"> {tag}</p>

                        })}
                       
                    </div>
                    <p className="text-lg">{restaurantData?.deal1.dealDescription}
                    </p>
                </div>
            </div>
            <div className="  bg-orange-500 rounded-3xl shadow-lg  p-4 ">
                <div>
                    {/* <h1 className="font-bold">Deal 2</h1> */}
                    <p className="text-2xl font-bold">{restaurantData?.deal2.title}</p>
                    <div className="flex lg:gap-4 gap-2 text-lg " >
                        {restaurantData?.deal2Tags.map((tag)=>{
                            return  <p key={tag} className="border-1 rounded-full lg:px-6 lg:py-2 px-2 py-1"> {tag}</p>

                        })}
                       
                    </div>
                    <p className="text-lg">{restaurantData?.deal2.dealDescription}
                    </p>
                </div>
            </div>
        </div>

    </div>
);

const Menu = ({restaurantData}) => (
    <div id="menu">
        <h1>Menu</h1>
        <div className="w-full bg-slate-700 rounded-2xl p-4 mb-4">
            {restaurantData?.menu.map((item)=>{
           return  <p key={item.name}>{`${item.type} - ${item.name} - ${item.price}`}</p>
            })}
        </div>
    </div>
);

const Timings = ({restaurantData}) => (
    <div>
        <h1>Timings</h1>
        <div id="timings" className="bg-slate-700 p-4 rounded-2xl">
            <p>Opening Time:</p>
            <p>{restaurantData?.openingTime}</p>
            <p>Closing Time:</p>
            <p>{restaurantData?.closingTime}</p>
        </div>

    </div>

);

const Location = ({restaurantData}) => (
    <div className="mt-4">
        <h1>Location</h1>
        <div id="location" className="bg-slate-700 p-4 rounded-2xl ">
           <p>{restaurantData?.location}</p>
        </div>

    </div>

);


const scrollToComponent = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
};



const Restaurant = () => {
    const [selected, setSelected] = useState(tabItems[0].name);
    const isTabScreen = useMediaQuery('(max-width: 768px)');
    const handleTabClick = (tab) => {
        setSelected(tab.name);
        scrollToComponent(tab.id);
    };
    const [restaurantData, setRestaurantData] = useState(null);
    const [restaurantImages, setRestaurantImages] = useState([]);
    const [error, setError] = useState(null);
    const { restaurantId } = useParams()
    console.log(restaurantId,"id");
   
    useEffect(() => {
      const fetchDocument = async () => {
        try {
          const docRef = doc(firestore, 'restaurants', restaurantId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRestaurantData(docSnap.data());
            console.log(docSnap.data())
          } else {
            setError('No such document!');
          }
          console.log(docSnap.data(),"restuarant data")
          let image2 = docSnap.data()?.image2
          console.log(docSnap.data()?.image2)
          let image3 = docSnap.data()?.image3
          let image4 = docSnap.data()?.image4
          let images = [image2,image3,image4]
          console.log(images,"images")
          setRestaurantImages(images)
          console.log(images,"after images")


        } catch (err) {
          setError('Error getting document: ' + err.message);
        }
      };
  
      fetchDocument();
    }, []);

    return (
        <div>
            {
                isTabScreen ? <></> : <section className="grid  gap-4 w-full mb-4 sm:grid-cols-2  lg:grid-cols-3">
                    {
                      restaurantImages.length>0 &&  restaurantImages?.map((item, index) => <img key={index} src={item} loading="lazy" alt={"restuarant"} className="w-full h-[330px]" />)
                    }
                </section>
            }

            <div className="lg:mx-56  mt-8">
                <div className="sticky z-20 -top-6 bg-slate-900">
                    <div className="flex  justify-between ">
                        <div>
                            <h1 className="font-extrabold">{restaurantData?.name}</h1>
                            <p>{restaurantData?.category}
                            </p>
                        </div>

                        <p className="lg:text-xl">{`Location : ${restaurantData?.location}`}
                        </p>
                    </div>
                    {/* flex items-center flex-wrap overflow-x-auto */}
                    <div className=" py-2 bg-slate-900 flex items-center flex-wrap sm:gap-8 ">
                        {tabItems.map((tab) => (
                            <Chip
                                text={tab.name}
                                selected={selected === tab.name}
                                setSelected={() => handleTabClick(tab)}
                                key={tab.name}
                            />
                        ))}
                    </div>
                </div>
                <div className="">

                    <Deals restaurantData={restaurantData} />
                    <Menu restaurantData={restaurantData}/>
                    <Timings restaurantData={restaurantData}/>
                    <Location restaurantData={restaurantData}/>
                </div>
            </div>
        </div>

    );
};

const Chip = ({
    text,
    selected,
    setSelected,
}) => {
    return (
        <button
            onClick={setSelected}
            className={`${selected
                ? "text-white"
                : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
                } text-xl transition-colors px-2.5 py-0.5 rounded-md relative md:mr-2`}
        >
            <span className="relative text-sm md:text-xl z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-blue-600 rounded-md"
                ></motion.span>
            )}
        </button>
    );
};

export default Restaurant;
