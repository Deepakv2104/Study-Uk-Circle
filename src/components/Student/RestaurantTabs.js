import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';


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
const Deals = () => (
    <div id="deals" className="">
        <h1>Deals</h1>
        <p>Pizza Margherita : 15$</p>
        <p>Sushi Platter : 25$</p>
        <p>Burger Deluxe : 19$</p>
        <p>Pizza Margherita : 15$</p>
        <p>Sushi Platter : 25$</p>
        <p>Burger Deluxe : 19$</p> <p>Pizza Margherita : 15$</p>
        <p>Sushi Platter : 25$</p>
        <p>Burger Deluxe : 19$</p> <p>Pizza Margherita : 15$</p>
        <p>Sushi Platter : 25$</p>
        <p>Burger Deluxe : 19$</p> <p>Pizza Margherita : 15$</p>
        <p>Sushi Platter : 25$</p>
        <p>Burger Deluxe : 19$</p> <p>Caesar Salad : 23$</p>
        <p>Spaghetti Carbonara : 76$</p>
        <p>Chocolate Cake : 12$</p> <p>Caesar Salad : 23$</p>
        <p>Spaghetti Carbonara : 76$</p>
        <p>Chocolate Cake : 12$</p> <p>Caesar Salad : 23$</p>
        <p>Spaghetti Carbonara : 76$</p>
        <p>Chocolate Cake : 12$</p>
    </div>
);

const Menu = () => (
    <div id="menu">
        <h1>Menu</h1>
        <p>Caesar Salad : 23$</p>
        <p>Spaghetti Carbonara : 76$</p>
        <p>Chocolate Cake : 12$</p> <p>Caesar Salad : 23$</p>
        <p>Spaghetti Carbonara : 76$</p>
        <p>Chocolate Cake : 12$</p> <p>Caesar Salad : 23$</p>
        <p>Spaghetti Carbonara : 76$</p>
        <p>Chocolate Cake : 12$</p> <p>Caesar Salad : 23$</p>
        <p>Spaghetti Carbonara : 76$</p>
        <p>Chocolate Cake : 12$</p>
    </div>
);

const Timings = () => (
    <div id="timings">
        <h1>Timings</h1>
        <p>Monday - Friday: 9am - 10pm</p>
        <p>Saturday - Sunday: 10am - 11pm</p>
        <p>Monday - Friday: 9am - 10pm</p>
        <p>Saturday - Sunday: 10am - 11pm</p>
    </div>
);

const Location = () => (
    <div id="location">
        <h1>Location</h1>
        <p>South Manchester</p>
        <p>Monday - Friday: 9am - 10pm</p>
        <p>Saturday - Sunday: 10am - 11pm</p>
    </div>
);


const scrollToComponent = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
};



const Restaurant = () => {
    const [selected, setSelected] = useState(tabItems[0].name);
    let { restaurantName } = useParams();

    const handleTabClick = (tab) => {
        setSelected(tab.name);
        scrollToComponent(tab.id);
    };

    return (
        <div>
            <section className="grid  gap-4 w-full mb-4 sm:grid-cols-2  lg:grid-cols-3">
                {
                    posts.map((item, index) => <img key={index} src={item.img} loading="lazy" alt={item.title} className="w-full h-[330px]" />)
                }
            </section>
            <div className="lg:mx-56  mt-8">
                <div className="sticky -top-5 bg-slate-900">
                    <div className="flex  justify-between ">
                        <div>
                            <h1 >{restaurantName}</h1>
                            <p>Meat, Bowls, Asian
                            </p>
                        </div>

                        <p>Location : South Manchester
                        </p>
                    </div>

                    <div className=" py-2 bg-slate-900 flex items-center flex-wrap gap-2 pl-0">
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




                <Deals />
                <Menu />
                <Timings />
                <Location />
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
            <span className="relative z-10">{text}</span>
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
