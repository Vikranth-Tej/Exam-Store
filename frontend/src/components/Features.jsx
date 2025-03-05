import React from "react";

const Features = () => {
  return (
    <div>
      {/* Features Section */}
      <section className="py-20 bg-blue-100">
        <div className="container mx-auto text-center ">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-r from-white via-purple-200 to-blue-400 rounded-lg shadow-md hover:bg-gray-200 transition">
              <h4 className="text-xl font-semibold mb-2">
                Comprehensive Question Bank
              </h4>
              <p className="text-gray-600">
                Access question papers from various exams across multiple years,
                all in one place.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-r from-white via-purple-200 to-blue-400 rounded-lg shadow-md hover:bg-blue-500 transition">
              <h4 className="text-xl font-semibold mb-2">
                Curated Study Materials
              </h4>
              <p className="text-gray-600">
                Get handpicked study guides and notes to help you ace your exams
                with ease.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-r from-white via-purple-200 to-blue-400 rounded-lg shadow-md hover:bg-gray-200 transition">
              <h4 className="text-xl font-semibold mb-2">Expert Support</h4>
              <p className="text-gray-600">
                Reach out to our team of experts for guidance on your
                preparation journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-10">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <blockquote className="p-6 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 rounded-lg shadow-md">
              <p className="text-white">
                "The Exam Store has helped me excel in my exams. Highly
                recommended!"
              </p>
              <footer className="mt-4 text-white">
                - Anjali K., <cite>Student</cite>
              </footer>
            </blockquote>
            <blockquote className="p-6 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 rounded-lg shadow-md">
              <p className="text-white">
                "The resources are amazing, and the platform is super easy to
                use. Highly recommend!"
              </p>
              <footer className="mt-4 text-white">
                - Rahul S., <cite>Graduate</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-10 bg-gradient-to-r from-blue-300 to-blue-500 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold">Ready to Ace Your Exams?</h2>
          <p className="text-lg mt-4">
            Join The Exam Store today and access all the resources you need for
            success!
          </p>
          <a
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 font-semibold cursor-pointer"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default Features;
