import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import {motion } from "framer-motion"
const Testimonials = () => {
  return (
    <motion.div 
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className="flex flex-col items-center justify-center my-16 py-8 md:px-16">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 mb-6">What Our Users Are Saying</p>

      <div className="flex flex-wrap gap-4 justify-center">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-white shadow-sm rounded-md w-64 text-center border"
          >
            <img
              src={testimonial.image}
              alt=""
              className="rounded-full w-12 h-12 mb-3"
            />
            <h2 className="text-base font-medium">{testimonial.name}</h2>
            <p className="text-xs text-gray-500">{testimonial.role}</p>
            <div className="flex justify-center mb-3">
              {Array(testimonial.stars)
                .fill()
                .map((_, starIndex) => (
                  <img
                    key={starIndex}
                    src={assets.rating_star}
                    alt="Rating Star"
                    className="w-4 h-4"
                  />
                ))}
            </div>
            <p className="text-sm text-gray-600 italic">
              {`${testimonial.text}`}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
