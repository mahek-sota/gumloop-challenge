interface RunReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  newsData: { title: string; summary: string }[]; // Accepts news data
  selectedCategory: string; // Displays the category name
}

export function RunReportPanel({
  isOpen,
  onClose,
  newsData,
  selectedCategory,
}: RunReportPanelProps) {
  return (
    <div
      className={`fixed top-20 right-4 h-[90vh] w-96 bg-white border border-gray-200 rounded-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-40`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold capitalize">
          {selectedCategory || "News"} Summaries
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          ✕
        </button>
      </div>

      {/* News Content */}
      <div className="p-4 text-gray-600 overflow-y-auto max-h-[80%]">
        {newsData.length > 0 ? (
          <ul className="list-disc pl-5">
            {newsData.map((news, index) => (
              <li key={index} className="mb-4">
                <h4 className="font-bold text-black">{news.title}</h4>
                <p>{news.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news summaries to display.</p>
        )}
      </div>
    </div>
  );
}
