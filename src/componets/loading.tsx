
const Loading = () => {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex space-x-2">
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

export default Loading;