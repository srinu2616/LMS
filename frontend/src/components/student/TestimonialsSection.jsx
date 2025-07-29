import React from "react";
import { dummyTestimonial, assets } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="py-14 px-8 md:px-0 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
        Testimonials
      </h2>
      <p className="text-gray-600 text-center text-lg mb-12">
        Hear from our learners as they share their journeys of transformation,
        success and how our
        <br className="hidden md:inline" />
        platform has made a difference in their lives
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyTestimonial.map((testimonial, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-500 relative"
          >
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="font-semibold text-gray-800">{testimonial.name}</h1>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <img 
                  key={i}
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            </div>
            
            <p className="text-gray-600 italic mb-6">"{testimonial.feedback}"</p>
            
            <a 
              href="#" 
              className="absolute bottom-4 right-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;