// src/components/Features.js
export default function Features() {
    const featureList = [
      {
        title: "Personalized Wellness Tracking",
        description: "Track your workouts, meals, and mental health with personalized insights to help you stay on top of your wellness goals.",
      },
      {
        title: "Community Support and Social Engagement",
        description: "Connect with a supportive community that shares your passion for wellness and personal growth. Share achievements and get inspired!",
      },
      {
        title: "AI-Powered Wellness Chatbot",
        description: "Get real-time advice and support from our AI-powered chatbot designed to help you navigate your wellness journey.",
      },
    ];
  
    return (
      <div className=" p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-teal-600">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
          {featureList.map((feature, index) => (
            <div key={index} className="p-4  rounded-lg text-center m-4 bg-gray-300">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  