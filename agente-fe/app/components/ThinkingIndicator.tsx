export default function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-gray-500 text-sm italic">pensando...</span>
    </div>
  );
}