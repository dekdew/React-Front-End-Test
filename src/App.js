import { Button, Input, Space } from "antd";
import styled from "styled-components";
import { Fragment, useState } from "react";
import Task from "./components/Task";
import { TodoProvider } from "./context/TodoContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");

  const handleCreateTask = () => {
    let newTodos = todos;
    newTodos.push({
      name: taskName,
      isAllDone: false,
      task: [],
    });
    setTodos([...newTodos]);
  };

  return (
    <TodoProvider
      value={{
        todos: todos,
        setTodos: setTodos,
      }}
    >
      <Container>
        <Space>
          <Input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style={{ width: 400 }}
            placeholder="Enter Task Name"
          />
          <Button type="primary" onClick={handleCreateTask}>
            Create Task
          </Button>
        </Space>

        {todos?.map((task, index) => (
          <Fragment key={index}>
            <Task id={index} />
          </Fragment>
        ))}
      </Container>
    </TodoProvider>
  );
}

export default App;
