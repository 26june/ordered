import React from "react";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

export default function Column({ column, tasks }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <TaskList>
        {tasks.map((task) => {
          return <Task key={task.id} task={task}></Task>;
        })}
      </TaskList>
    </Container>
  );
}
