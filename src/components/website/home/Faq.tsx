"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { ChevronDown } from "lucide-react";

// FAQ data
const faqItems = [
  {
    id: 1,
    question: "How does the car listing process work?",
    answer:
      "Listing your car is simple. Create an account, click 'Sell Your Car', fill in your vehicle details (make, model, year, condition, etc.), upload high-quality photos, set your price, and publish. Our platform handles the rest by connecting you with potential buyers in your area.",
  },
  {
    id: 2,
    question: "What documents do I need to sell my car?",
    answer:
      "You'll need your vehicle's title (free of liens), service records, vehicle history report, bill of sale, release of liability form, and warranty documents if applicable. Having these ready speeds up the selling process and builds buyer confidence.",
  },
  {
    id: 3,
    question: "How long does it typically take to sell a car?",
    answer:
      "Most vehicles sell within 2-3 weeks, though this varies based on pricing, vehicle condition, demand, and location. Competitively priced cars in good condition with complete documentation typically sell faster. Our premium listing options can also help your car sell up to 70% faster.",
  },
  {
    id: 4,
    question: "Is there a fee for listing my car on your platform?",
    answer:
      "Basic listings are free for 30 days. We also offer premium listing packages starting at $29.99 that include featured placement, highlighted listings, and promotional boosts to help your car sell faster. You only pay when you choose to upgrade your listing.",
  },
  {
    id: 5,
    question: "How do I know what price to set for my car?",
    answer:
      "Our platform provides a free valuation tool that analyzes recent sales of similar vehicles in your area. We consider make, model, year, mileage, condition, and local market trends to suggest a competitive price range. You can also view similar listings to gauge the market.",
  },
  {
    id: 6,
    question: "Are there any guarantees when buying a used car?",
    answer:
      "While we don't directly provide guarantees, we verify seller information and encourage buyers to request vehicle history reports. Many listings include inspection reports, and we recommend independent inspections before purchase. We also offer a secure payment system to protect both parties.",
  },
  {
    id: 7,
    question: "How can I arrange a test drive safely?",
    answer:
      "We recommend meeting in public places like shopping centers or police station parking lots. Bring a friend, verify the seller's identity, and check that the car's documentation matches what was advertised. Our in-app messaging system lets you coordinate details without sharing personal contact information.",
  },
];

// FAQ Item Component
const FaqItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <button
        className="flex justify-between bg-gray-100 cursor-pointer items-center w-full py-5 px-4 text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="text-gray-700 font-medium">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 py-5 bg-white text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl text-black font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Amet morbi sit suspendisse
            dui ut donec vel id. Viverra urna cras nulla elementum. Risus orci
            dolor euismod in fringilla adipiscing eu condimentum.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <FaqItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openItem === item.id}
              onClick={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Faq;
