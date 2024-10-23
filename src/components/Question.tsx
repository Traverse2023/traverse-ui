import React, { useState } from "react";

// Define the types for the props
interface FAQItemProps {
  question: string;
  answer: string;
}

// FAQItem component
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="text-lg mb-4 border-2 border-black rounded-lg">
      <button
        className={`w-full h-20 flex justify-around items-center text-left px-4 py-2 rounded-lg focus:outline-none ${
            isOpen ? "bg-honey duration-200" : "bg-white"
          }`}
        onClick={toggleFAQ}
      >
        <span className="w-3/4">{question}</span>
        <img
          className={`w-1/8 h-full scale-[0.45] transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
          src="/public/imgs/arrow.svg"
          alt="arrow icon"
        />
      </button>
      <div
        className={` overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-20 border-t-2 border-black" : "max-h-0"
        }`}
      >
        <p className="px-4 py-2  text-gray-700 text-base rounded-xl">{answer}</p>
      </div>
    </div>
  );
};

// Main FAQ component
const FAQ: React.FC = () => {
  const faqData: FAQItemProps[] = [
    {
      question: "What is CodeHive?",
      answer:
        "Code Hive is an online platform where you can practice DSA problems with or against friends!",
    },
    {
      question: "How can I code with friends?",
      answer:
        "Create a 'hive' when after you add a friend and code together!",
    },
    {
        question: "Question 3",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula eros at felis auctor, sit amet viverra nisl facilisis.",
      },
      {
        question: "Question 4",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula eros at felis auctor, sit amet viverra nisl facilisis.",
      },
      {
        question: "Question 5",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula eros at felis auctor, sit amet viverra nisl facilisis.",
      },
      {
        question: "Question 6",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula eros at felis auctor, sit amet viverra nisl facilisis.",
      },
  ];

  return (
    <div className="faq max-w-2xl mx-auto">
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;
