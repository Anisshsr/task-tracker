import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./companents/Header";
import Tasks from "./companents/Tasks";
import Addtask from "./companents/Addtask";
import Footer from "./companents/Footer";
import About from "./companents/About";

function App() {
  const [showAddtask, setShowaddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      const taskfromserver = await fetchTasks();
      setTasks(taskfromserver);
    };
    getTasks();
  }, []);
  //fetchtasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  //fetchtask single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000 ) +1
    // // console.log(id)
    // const newTask = { id , ...task }
    // setTasks([...tasks, newTask])
  };
  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "delete" });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // toggle remainder
  const toggleRemainder = async (id) => {
    const tasktotoggle = await fetchTask(id);
    const updtask = { ...tasktotoggle, reminder: !tasktotoggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updtask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  function rend(props)  { return(
    <>
      {showAddtask && <Addtask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleRemainder}
        />
      ) : (
        "No Task To Show"
      )}
    </>
  )}
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowaddTask(!showAddtask)}
          showadd={showAddtask}
        />

        <Routes>
          <Route
            path="/"
            Component={rend}/>
          <Route path="/about" Component={About } />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
