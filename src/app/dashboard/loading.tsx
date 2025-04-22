export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">

      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex-grow p-4 overflow-y-auto space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-3 border border-gray-100 dark:border-gray-700 rounded-md">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Main content skeleton */}
      <div className="flex-grow flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        
        <div className="h-72 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse mb-6"></div>
        
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
      </div>
    </div>
  );
}