import React, { useState, useEffect } from "react";
import AddTodo from "../components/AddToDo";
import Listings from "../components/Listings";
import NewTodo from "../components/NewTodo";

interface IProps {
  userId: string;
}

export interface ITodo {
  _id: string;
  title: string;
  text: string;
}

const MainPage: React.FC<IProps> = ({ userId }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [addingTodo, setAddingTodo] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
    console.log("UseEffect Triggered");
  }, [rerender]);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:5000/api");
      const rawData = await res.json();
      setTodos(rawData);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const toggleAdding = (): void => {
    setAddingTodo(!addingTodo);
  };

  const renderAgain = (): void => {
    setRerender(!rerender);
  };

  return (
    <div className="allTodosCont mt-3">
      {addingTodo ? (
        <NewTodo
          toggleAdding={toggleAdding}
          renderAgain={renderAgain}
          userID={userId}
        />
      ) : (
        <AddTodo click={toggleAdding} />
      )}
      <Listings data={todos} renderAgain={renderAgain} />
    </div>
  );
};

export default MainPage;
