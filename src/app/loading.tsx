export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-2 border-gray-700 rounded-full animate-spin"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
