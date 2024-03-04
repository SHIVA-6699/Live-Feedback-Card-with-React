import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface Todo {
  head: string;
  details: string;
  id: number;
}

function App() {
  const [data, setData] = useState<Todo[]>([{ head: '', details: '', id: 0 }]);
  const [newTodo, setNewTodo] = useState<Todo>({ head: "", details: "", id: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDataChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    
    setNewTodo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    const newId = Date.now(); // Generate a unique ID for the new todo item
    const newTodoItem: Todo = {
      head: newTodo.head,
      details: newTodo.details,
      id: newId
    };
    setData(prevData => [...prevData, newTodoItem]); // Update the data state with the new todo item
    setNewTodo({ head: "", details: "", id: 0 }); // Reset the newTodo state to prepare for the next todo item
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter(todo => todo.id !== id);
    setData(updatedData);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    const todoToEdit = data.find(todo =>todo.id === id);
    if (todoToEdit) {
      setNewTodo(todoToEdit);
    }
  };

  const handleSave = (id: number) => {
    const updatedData = data.map(todo =>
      todo.id === id ? { ...newTodo } : todo
    );
    setData(updatedData);
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1 className="mt-5">Todo List</h1>
      <div>
        {data.map((item: Todo) => (
          <div key={item.id} className="mb-3">
            <Form.Group controlId={`si${item.id}`}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="head"
                value={item.id === editingId ? newTodo.head : item.head}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDataChange(e, item.id)}
                disabled={item.id === editingId ? false : true}
              />
            </Form.Group>
            <Form.Group controlId={`details${item.id}`}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="details"
                value={item.id === editingId ? newTodo.details : item.details}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleDataChange(e, item.id)}
                disabled={item.id === editingId ? false : true}
              />
            </Form.Group>
            {item.id === editingId ? (
              <Button variant="success" onClick={() => handleSave(item.id)}>Save</Button>
            ) : (
              <>
                <Button className="mr-2" variant="primary" onClick={() => handleEdit(item.id)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
              </>
            )}
          </div>
        ))}
      </div>
      <h2 className="mt-5">Add New Todo</h2>
      <Form>
        <Form.Group controlId="newTodoTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="head"
            value={newTodo.head}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleDataChange(e, 0)}
          />
        </Form.Group>
        <Form.Group controlId="newTodoDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="details"
            value={newTodo.details}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleDataChange(e, 0)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>Add Todo</Button>
      </Form>
    </div>
  );
}

export default App;
