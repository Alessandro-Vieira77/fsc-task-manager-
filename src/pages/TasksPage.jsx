import SideBar from "../components/Sidebar";
import Tasks from "../components/Tasks";

function TasksPage() {
  return (
    <div className="flex w-full">
      <SideBar />
      <Tasks />
    </div>
  );
}

export default TasksPage;
