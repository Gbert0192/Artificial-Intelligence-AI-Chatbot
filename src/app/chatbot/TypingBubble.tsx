const TypingBubble = () => {
  return (
    <div className="flex justify-start mb-2">
      <div className="px-5 py-3 rounded-2xl bg-white text-gray-900 rounded-bl-none max-w-[90%] min-w-[100px]">
        <span className="flex gap-1 items-end">
          <span>Typing</span>
          <span className="animate-bounce [animation-delay:0ms]">.</span>
          <span className="animate-bounce [animation-delay:200ms]">.</span>
          <span className="animate-bounce [animation-delay:400ms]">.</span>
        </span>
      </div>
    </div>
  );
};

export default TypingBubble;
