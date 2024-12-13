import { useCallback, useState } from "react";
import axios from "axios";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, createDynamicEdge } from "./edges";
import { RunButton } from "./components/RunButton";
import { Logo } from "./components/Logo";
import { RunReportPanel } from "./components/RunReportPanel";

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Start fetching news and create edge
  const startFetchingNews = () => {
    setEdges((eds) => [
      ...eds,
      createDynamicEdge("edge-a-c", "a", "c", "blue"), // Select -> Fetching
    ]);
  };

  // Fetch news and connect edges dynamically
  const fetchNews = async (category: string) => {
    setLoading(true);
    setNewsData([]);

    try {
      const response = await axios.get(
        `http://localhost:8080/fetch-news?category=${category}`
      );
      setNewsData(response.data.summarized_news);

      setEdges((eds) => [
        ...eds,
        createDynamicEdge("edge-c-d", "c", "d", "green"), // Fetching -> Displayed
      ]);

      setIsPanelOpen(true);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category submission
  const handleSubmit = () => {
    if (selectedCategory) {
      startFetchingNews(); // Create 'a -> c' edge after submission
      fetchNews(selectedCategory); // Fetch news
      setOpenModal(false);
      setSelectedCategory(""); // Reset category selection
    }
  };

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Logo />
      <RunButton onRun={() => setOpenModal(true)} />

      {/* Welcome Modal */}
      {isWelcomeModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
            <p className="text-gray-700 mb-6">
              This is a news summarization application developed by <b>Mahek Sota</b>. Select a category to
              get started and see the latest news summaries!
            </p>
            <button
              onClick={() => setIsWelcomeModalVisible(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Category Selection Modal */}
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Select News Category</h2>
            <select
              className="p-2 border rounded w-full mb-4"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option value="technology">Technology</option>
              <option value="sports">Sports</option>
              <option value="health">Health</option>
            </select>
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed top-20 right-4 w-96 p-4 bg-gray-100 rounded-lg shadow-lg z-50">
          <h3 className="text-xl font-semibold text-gray-700">
            Fetching and Summarizing News...
          </h3>
        </div>
      )}

      {/* News Display */}
      <RunReportPanel
        isOpen={isPanelOpen}
        onClose={() => {
          setIsPanelOpen(false);
          setEdges([]); // Clear edges on close
        }}
        newsData={newsData}
        selectedCategory={selectedCategory}
      />
    </ReactFlow>
  );
}
