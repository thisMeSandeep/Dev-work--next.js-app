import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <section className="mt-10 border  p-6 bg-white ">
      <h3 className="text-xl font-semibold text-gray-900">Client Reviews</h3>

      <div className="mt-6 space-y-6">
        {[
          {
            title: "Convert text to HTML",
            review:
              "Anthony was amazing to work with and he provides great guidance.",
            freelancer: "Peter M.",
            freelancerReview:
              "Peter was concise and understanding. Very well natured and seasoned in web development.",
            date: "May 2024",
            type: "0 hrs @ $45/hr • Billed: $15.45",
          },
          {
            title: "Simple API work",
            review:
              "Absolutely great guy, was super fun diving in and debugging some React with him. Would love to work with him again.",
            freelancer: "Jon W.",
            freelancerReview:
              "After spending half a day beating my head against the wall trying to get a script to work, I hired Jon. It took him less than 10 minutes to solve it.",
            date: "Mar 2024",
            type: "Fixed-price • $5.00",
          },
          {
            title: "Refine a Figma design",
            review:
              "Such an understanding person, gave me full creativity rights to his own project. Unlocked a whole lot of potential.",
            freelancer: "Mohamed E.",
            freelancerReview:
              "Probably the best money I have ever spent. Mohamed went far beyond expectations and delivered excellent work.",
            date: "Mar 2024",
            type: "Fixed-price",
          },
          {
            title: "Landing page redesign",
            review:
              "Very professional client, clear instructions and smooth communication.",
            freelancer: "Sarah K.",
            freelancerReview:
              "Sarah was detail-oriented and delivered beautiful UI improvements. Highly recommend.",
            date: "Feb 2024",
            type: "Fixed-price • $120.00",
          },
          {
            title: "Bug fixing in backend",
            review:
              "Quick responses and very cooperative. Would definitely work again.",
            freelancer: "David L.",
            freelancerReview:
              "David solved complex API issues efficiently. Great to work with.",
            date: "Jan 2024",
            type: "Hourly • 5 hrs @ $20/hr • $100.00",
          },
        ].map((item, i) => (
          <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
            {/* Title */}
            <h4 className="text-lg font-medium text-green-700 hover:underline cursor-pointer">
              {item.title}
            </h4>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="size-5 text-yellow-500 fill-yellow-500"
                />
              ))}
              <span className="ml-2 font-medium text-gray-900">5.0</span>
            </div>

            {/* Review text */}
            <p className="mt-2 text-gray-700 text-base">{item.review}</p>

            {/* Freelancer feedback */}
            <p className="mt-1 text-sm text-gray-600">
              To freelancer{" "}
              <span className="text-green-700 font-medium cursor-pointer">
                {item.freelancer}
              </span>
              : {item.freelancerReview}
            </p>

            {/* Date + type */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>{item.date}</span>
              <span>•</span>
              <span>{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
