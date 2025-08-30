import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const DetailsTasks = () => {
  const { taskId } = useParams();
  const [tasks, setTasks] = useState();

  useEffect(() => {
    async function getTask() {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });

      const data = await response.json();
      setTasks(data);
    }

    getTask();
  }, [taskId]);

  if (!tasks) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes da Tarefa: {taskId}</h1>
    </div>
  );
};

export default DetailsTasks;
