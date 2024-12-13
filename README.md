## Gumloop Challenge

### Simulated a Three-Step Process
- Inspired by work from **Gumloop**.
- Implemented a three-step workflow:
  1. **User Input**: Selecting a news category via a modal.
  2. **Processing**: Fetching and summarising news using an LLM model.
  3. **Output**: Displaying summarized news on the front end.

### Features Implemented
- **News Summarization**:
  - Fetched news articles (using newsapi) dynamically based on user-selected categories.
  - Summarized news using a pretrained **LLM model** (`facebook/bart-large-cnn`).

- **UI Improvements**:
  - Added modals for user interactions:
    - Welcome modal for initial information.
    - Category selection modal.
  - Improved workflow visualization with **dynamically generated edges** between nodes.

### Workflow Visualization
- **Dynamic Edges**:
  - Nodes and edges are generated dynamically based on user actions:
    - `a → c`: Created after category submission (Select News → Fetching News).
    - `c → d`: Created after successful data fetch and display (Fetching News → News Displayed).
  - Edges reset automatically when the display panel is closed for a clean interface.
  
## **Instructions to Run the Project**

### **1. Clone the Repository**
Run the following command to clone the repository locally:
```
git clone https://github.com/mahek-sota/gumloop-challenge.git
```

### **2. Navigate to the Project Folder**
Navigate to the project folder:
``` 
cd gumloop-challenge
```
### **3. Navigate to the Project Folder**
Run the Backend Server:
```
python app.py
```
### **4. Navigate to the Project Folder**
Run the Frontend App
```
npm install
npm run dev
```

### Summary
This update combines backend processing (news extraction and summarization) with an enhanced front-end user experience using dynamic edges and interactive modals.

---

## Developer Information
- **Name:** Mahek Sota  
- **Email:** sotamahek@gmail.com  
