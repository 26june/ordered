import React, { useState } from "react";
import Column from "./Column";
import initialData from "./inital-data";

export default function Home() {
  const [initState, setInitState] = useState(initialData);

  return (
    <div>
      {initState.columnOrder.map((columnId) => {
        const column = initState.columns[columnId];
        const tasks = column.taskIds.map((taskId) => initState.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks}></Column>;
      })}
    </div>
  );
}
