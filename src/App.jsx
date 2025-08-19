import SideBar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex w-full">
      <Toaster />
      <SideBar />

      <Tasks />
    </div>
  );
}

export default App;
