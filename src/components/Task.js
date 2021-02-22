import { Fragment, useContext, useState } from "react";
import { Button, Card, Divider, Input, Space } from "antd";
import TodoContext from "../context/TodoContext";
import SubTask from "./SubTask";

const Task = ({ id }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [taskName, setTaskName] = useState("");

  if (!todos) return null;

  const handleDelete = () => {
    let newTodos = todos;
    newTodos.splice(id, 1);
    setTodos([...newTodos]);
  };

  const handleDuplicate = () => {
    let newTask = todos[id];
    setTodos([...todos, { ...newTask }]);
  };

  const handleAddSubTask = () => {
    let newTodos = todos;
    newTodos[id].task.push({
      name: taskName,
      isDone: false,
    });
    newTodos[id].isAllDone = false;

    setTodos([...newTodos]);
  };

  return (
    <Fragment>
      <Space direction="vertical" style={{ marginTop: 24 }}>
        <Card
          title={todos[id].name}
          style={{
            textDecoration: todos[id].isAllDone ? "line-through" : "",
            width: 600,
          }}
          extra={
            <Fragment>
              <Button type="primary" onClick={handleDuplicate}>
                Duplicate
              </Button>{" "}
              <Button type="primary" danger onClick={handleDelete}>
                Delete
              </Button>
            </Fragment>
          }
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter Subtask Name"
                style={{ width: 400 }}
              />
              <Button type="primary" onClick={handleAddSubTask}>
                Add Subtask
              </Button>
            </Space>
            <Divider />
            {todos[id]?.task?.map((subTask, index) => (
              <Fragment key={index}>
                <SubTask id={index} parent={id} />
              </Fragment>
            ))}
          </Space>
        </Card>
      </Space>
    </Fragment>
  );
};

export default Task;
