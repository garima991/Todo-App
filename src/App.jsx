import { useEffect, useState } from "react";
import addIcon from "./assets/add.svg";
import checkIcon from "./assets/checked.svg";
import unCheckIcon from "./assets/unchecked.svg";
import trashIcon from "./assets/trash.svg";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  function getTodos() {
    fetch("http://localhost:5055/api/todos", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        console.log("Data Fetched", data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  function addTodo(e) {
    e.preventDefault();
    if (title.trim() === "" || !title) return;
    fetch("http://localhost:5055/api/todos", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    }).then((data) => {
      getTodos();
    });
  
  }

  function checkTodo(id, completed) {
    fetch(`http://localhost:5055/api/todos`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        completed: !completed,
      }),
    })
      .then(() => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteTodo(id) {
    fetch(`http://localhost:5055/api/todos`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then(() => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center rounded-xl h-screen w-screen">
      <form
        onSubmit={addTodo}
        className="w-full justify-evenly rounded-lg flex items-center p-4 bg-slate-200 shadow-gray-400 shadow-lg max-w-md gap-5"
      >
        <div className="w-full rounded-lg flex flex-col overflow-hidden">
          <input
            className="px-4 outline-none p-2 text-lg"
            type="text"
            placeholder="Add new task"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <input
            className=" px-4 pb-2 text-xs outline-none focus:ring-1 focus:ring-slate-200"
            type="text"
            placeholder="Add description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-white p-2 hover:bg-lime-300 outline focus:ring-2 focus:ring-black rounded"
          aria-label="Add Task"
        >
          <img src={addIcon} alt="Add button" />
        </button>
      </form>

      <div className="mt-4 w-full max-w-md">
        <ul className="bg-white p-4 rounded-xl shadow-gray-400 shadow-lg">
          {todos.map(({id:_id, title, description, completed }) => (
            <li
              key={id}
              className="flex items-center justify-between mb-2 rounded-lg px-2 py-3 bg-slate-100"
            >
              <div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-gray-600 ">{description}</p>
              </div>
              <div className="flex">
                <button onClick={() => checkTodo(id, completed)}>
                  <img src={completed ? checkIcon : unCheckIcon} alt="" />
                </button>
                {/* <button onClick={() => updateTodo(id, title, description)}>
                    <img src={editIcon} alt="" />
                  </button> */}
                <button onClick={() => deleteTodo(id)}>
                  <img src={trashIcon} alt="" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
