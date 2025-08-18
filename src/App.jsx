import SideBar from "./components/Sidebar";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="flex w-full">
      <SideBar />
      <Tasks />
    </div>
  );
}

export default App;
