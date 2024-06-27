// import React from 'react'
// import { useParams } from 'react-router-dom'
// import * as Tabs from "@radix-ui/react-tabs";

// const tabItems = [
//   "Menu",
//   "Location",
//   "Billing",
// ];

// const Restaurant = () => {
//     let {restaurantName} = useParams()
//   return (
//     <div>
//         <h1>{restaurantName}</h1>
//         <Tabs.Root
//     className="max-w-screen-xl  px-0 md:px-8 bg-gray-900"
//     defaultValue="Overview"
//   >
//     <Tabs.List
//       className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-l"
//       aria-label="Manage your account"
//     >
//       {tabItems.map((item, idx) => (
//         <Tabs.Trigger
//           key={idx}
//           className="group outline-none py-1.5 border-b-2 border-white text-gray-200 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
//           value={item}
//         >
//           <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-blue-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
//             {item}
//           </div>
//         </Tabs.Trigger>
//       ))}
//     </Tabs.List>
//     {tabItems.map((item, idx) => (
//       <Tabs.Content key={idx} className="py-6" value={item}>
//         <p className="text-xs leading-normal">
//           This is <b>{item}</b> Tab
//         </p>
//       </Tabs.Content>
//     ))}
//   </Tabs.Root>
//     </div>
//   )
// }

// export default Restaurant

// import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";
// import { AnimatePresence, motion } from "framer-motion";
// import { useWindowSize } from "./useWindowSize";
// import { useState } from "react";

// const VerticalAccordion = () => {
//   const [open, setOpen] = useState(items[0].id);

//   return (
//     <section className="p-2 bg-blue-900">
//       <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-8xl mx-auto shadow overflow-hidden">
//         {items.map((item) => {
//           return (
//             <Panel
//               key={item.id}
//               open={open}
//               setOpen={setOpen}
//               id={item.id}
//               Icon={item.Icon}
//               title={item.title}
//               imgSrc={item.imgSrc}
//               description={item.description}
//             />
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// const Panel = ({ open, setOpen, id, Icon, title, imgSrc, description }) => {
//   const { width } = useWindowSize();
//   const isOpen = open === id;

//   return (
//     <>
//       <button
//         className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
//         onClick={() => setOpen(id)}
//       >
//         <span
//           style={{
//             writingMode: "vertical-lr",
//           }}
//           className="hidden lg:block text-xl font-light rotate-180"
//         >
//           {title}
//         </span>
//         <span className="block lg:hidden text-xl font-light">{title}</span>
//         <div className="w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center">
//           <Icon />
//         </div>
//         <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             key={`panel-${id}`}
//             variants={width && width > 1024 ? panelVariants : panelVariantsSm}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             style={{
//               backgroundImage: `url(${imgSrc})`,
//               backgroundPosition: "center",
//               backgroundSize: "cover",
//             }}
//             className="w-full h-full overflow-hidden relative bg-black flex items-end"
//           >
//             <motion.div
//               variants={descriptionVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//               className="px-2 py-2 bg-black/40 backdrop-blur-sm text-white"
//             >
//               <p>{description}</p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default VerticalAccordion;

// const panelVariants = {
//   open: {
//     width: "100%",
//     height: "100%",
//   },
//   closed: {
//     width: "0%",
//     height: "100%",
//   },
// };

// const panelVariantsSm = {
//   open: {
//     width: "100%",
//     height: "200px",
//   },
//   closed: {
//     width: "100%",
//     height: "0px",
//   },
// };

// const descriptionVariants = {
//   open: {
//     opacity: 1,
//     y: "0%",
//     transition: {
//       delay: 0.125,
//     },
//   },
//   closed: { opacity: 0, y: "100%" },
// };

// const items = [
//   {
//     id: 1,
//     title: "Earn more",
//     Icon: FiDollarSign,
//     imgSrc:
//       "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
//   },
//   {
//     id: 2,
//     title: "Play more",
//     Icon: FiPlay,
//     imgSrc:
//       "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
//   },
//   {
//     id: 3,
//     title: "Keep track",
//     Icon: FiBell,
//     imgSrc:
//       "https://images.unsplash.com/photo-1578450671530-5b6a7c9f32a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
//   },
//   {
//     id: 4,
//     title: "Grow faster",
//     Icon: FiBarChart,
//     imgSrc:
//       "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
//   },
// ];

import React from 'react';
import { useParams } from 'react-router-dom';

const tabItems = [
  { name: "Menu", id: "menu" },
  { name: "Location", id: "location" },
  { name: "Billing", id: "billing" },
];
const posts = [
    {
        title: "What is SaaS? Software as a Service Explained",
        desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people.",
        img: "https://media.timeout.com/images/102945700/image.jpg",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "A Quick Guide to WordPress Hosting",
        desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations.",
        img: "https://tse2.mm.bing.net/th?id=OIP.cuJjavKtIjsu5ATwiD1sggHaE8&pid=Api&P=0&h=220",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "7 Promising VS Code Extensions Introduced in 2022",
        desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks.",
        img: "https://pixfeeds.com/images/baby-care/baby-shower-food-recipes/1200-518706414-party-food.jpg",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
 
]

const Restaurant = () => {
  let { restaurantName } = useParams();
  return (
    <div className='p-6 pt-0 pl-0'>
                <section className="py-0">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <ul className="grid gap-x-0 gap-y-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        posts.map((items, key) => (
                            <li className="w-full mx-auto group sm:max-w-sm" key={key}>
                                <a href={items.href}>
                                    <img src={items.img} loading="lazy" alt={items.title} className="w-full" />
                                    <div className="mt-3 space-y-1">
                                        {/* <span className="block text-indigo-600 text-sm">{items.date}</span> */}
                                        {/* <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold">
                                            {items.title}
                                        </h3> */}
                                        {/* <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">{items.desc}</p> */}
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
        <div className='pl-10'>
      <h1 >{restaurantName}</h1>
      <p>Location : South Manchester
      </p>
      <p>Meat, Bowls, Asian
      </p>
      <div className="max-w-screen-xl px-0 md:px-8 bg-gray-900">
        <div className=" w-full border-b border-blue-600 flex items-center gap-x-3 overflow-x-auto text-l ">
          {tabItems.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.id}`}
              className="group   border-transparent group-hover:border-blue-600 hover:text-blue-600 no-underline"
            >
              <div className="py-1.5 px-3 border-b-2 border-transparent group-hover:border-blue-600 hover:text-blue-600  duration-150 group-hover:text-blue-600  group-active:bg-gray-100 font-medium">
                {item.name}
              </div>
            </a>
          ))}
        </div>
        {tabItems.map((item, idx) => (
          <div key={idx} id={item.id} className="py-6 ">
            {/* <p className="text-xs leading-normal mt-15">
              This is <b>{item.name}</b> Tab */}
             <p>Pizza Margherita : 15$
</p>
             <p>Sushi Platter : 25$</p>
             <p>Burger Deluxe : 19$</p>
             <p>Caesar Salad : 23$</p>
             <p>Spaghetti Carbonara : $76</p>
             <p>Chocolate Cake : 12$</p>
             <p>Grilled Cheese Sandwich: 15$</p>
             <p></p>
             <p></p>
            {/* </p> */}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Restaurant;