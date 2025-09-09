import SideBar from "../components/Sidebar";
import Tasks from "../components/Tasks";

function TasksPage() {
  return (
    <div className="flex w-full">
      <div className="hidden min-h-screen lg:flex">
        <SideBar />
      </div>
      <Tasks />
    </div>
  );
}

export default TasksPage;
