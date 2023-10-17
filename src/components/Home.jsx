import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import initialData from "./inital-data";

export default function Home() {
  const [initState, setInitState] = useState(initialData);

  function handleOnDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const dragEndCol = initState.columns[source.droppableId];
    console.log(dragEndCol);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        {initState.columnOrder.map((columnId) => {
          const column = initState.columns[columnId];
          const tasks = column.taskIds.map((taskId) => initState.tasks[taskId]);

          return (
            <Column key={column.id} column={column} tasks={tasks}></Column>
          );
        })}
      </div>
    </DragDropContext>
  );
}
