import { Fragment, useContext, useState, useEffect } from "react";
import { Button, Col, Row, Typography } from "antd";
import TodoContext from "../context/TodoContext";

const Task = ({ parent, id }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [task, setTask] = useState(todos[parent][id]);

  useEffect(() => {
    setTask(todos[parent].task[id]);
  }, [id, parent, todos]);

  if (!task) return null;

  const handleDone = () => {
    let newTodos = todos;
    newTodos[parent].task[id].isDone = !newTodos[parent].task[id].isDone;
    const isAllDone = newTodos[parent]?.task?.reduce(function (_, task) {
      return task.isDone === true;
    });
    newTodos[parent].isAllDone = isAllDone;
    setTodos([...newTodos]);
  };

  const handleDelete = () => {
    let newTodos = todos;
    newTodos[parent].task.splice(id, 1);
    setTodos([...newTodos]);
  };

  return (
    <Fragment>
      <Row>
        <Col span={16}>
          <Typography.Text
            style={{ textDecoration: task.isDone ? "line-through" : "" }}
          >
            {task.name}
          </Typography.Text>
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={handleDone}>
            {task.isDone ? "Undo" : "Done"}
          </Button>{" "}
          <Button type="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Task;
