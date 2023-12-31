import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  border: 1px solid black;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  width: 30vw;
  padding: 8px;
  transition: background-color 1s ease;
  background-color: ${({ $isDraggingOver }) =>
    $isDraggingOver ? "lightblue" : "white"};

  flex-grow: 1;
  min-heigh: 100px;
`;

export default function Column({ column, tasks }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => {
              return <Task key={task.id} task={task} index={index}></Task>;
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
