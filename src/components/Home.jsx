import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { styled } from "styled-components";
import Column from "./Column";
import initialData from "./inital-data";

const Container = styled.div`
  display: flex;
`;

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

    const dragEndColumnStart = initState.columns[source.droppableId];
    const dragEndColumnEnd = initState.columns[destination.droppableId];

    if (dragEndColumnStart === dragEndColumnEnd) {
      const newTaskIds = Array.from(dragEndColumnStart.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newDragEndColumn = {
        ...dragEndColumnStart,
        taskIds: newTaskIds,
      };

      const newState = {
        ...initState,
        columns: {
          ...initState.columns,
          [newDragEndColumn.id]: newDragEndColumn,
        },
      };

      setInitState(newState);
      return;
    }

    const startTaskIdsArray = Array.from(dragEndColumnStart.taskIds);
    startTaskIdsArray.splice(source.index, 1);

    const newStartColumn = {
      ...dragEndColumnStart,
      taskIds: startTaskIdsArray,
    };

    const finishTaskIdsArray = Array.from(dragEndColumnEnd.taskIds);
    finishTaskIdsArray.splice(destination.index, 0, draggableId);

    const newFinishColumn = {
      ...dragEndColumnEnd,
      taskIds: finishTaskIdsArray,
    };

    const newState = {
      ...initState,
      columns: {
        ...initState.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    setInitState(newState);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Container>
        {initState.columnOrder.map((columnId) => {
          const column = initState.columns[columnId];
          const tasks = column.taskIds.map((taskId) => initState.tasks[taskId]);

          return (
            <Column key={column.id} column={column} tasks={tasks}></Column>
          );
        })}
      </Container>
    </DragDropContext>
  );
}
