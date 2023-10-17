import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";

const Container = styled.div`
  border: 1px solid pink;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ $isDragging }) =>
    $isDragging ? "lightgreen" : "white"};
`;

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}
