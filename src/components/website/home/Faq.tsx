"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { ChevronDown } from "lucide-react";
import { useGetFaqQuery } from "@/redux/apiSlice/faqSlice";


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
  const { data } = useGetFaqQuery(undefined);
  const items = (data?.data || []) as Array<{ _id?: string; question: string; answer: string }>;
  const [openItem, setOpenItem] = useState<string | number | null>(null);

  const toggleItem = (id: string | number) => {
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
          {items.map((item, idx) => (
            <FaqItem
              key={item._id || idx}
              question={item.question}
              answer={item.answer}
              isOpen={openItem === (item._id || idx)}
              onClick={() => toggleItem(item._id || idx)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Faq;
