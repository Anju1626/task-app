import "./App.css";
import "./assets/styles.css";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TaskEdit from "./components/TaskEdit";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const sampleTasks = {
  tasks: [
    {
      id: uuidv4(),
      desc: "Learn React",
      date: "2021-01-03",
      complete: false,
    },
    {
      id: uuidv4(),
      desc: "Profit",
      date: "2021-01-05",
      complete: false,
    }
  ]
};

function App() {

  const [state, setState] = useState(localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : sampleTasks);

      const onTglStatus = (task) => {
        console.log("completing task");
      
        if (state.tasks) {
          setState(prevState => ({
            tasks: prevState.tasks.map((chkTask) => {
              console.log("checking: " + chkTask.desc);
              return {
                ...chkTask,
                complete: task.id === chkTask.id ? !chkTask.complete : chkTask.complete
              };
            })
          }));
        } else {
          console.error("state.tasks is not defined");
        }
      };

  const [showTaskEdit, setShowTaskEdit] = useState(false);

  const onSaveTask = ({ desc, date }) => {
    console.log("saving tasks");
    const newTask = {
      id: uuidv4(),
      desc,
      date: date == null ? Date.now() : date,
      complete: false
    };
    setState({ tasks: [...state.tasks, newTask] });
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(state));
  });

  return (
    <div className="App">
      <Header></Header>

      <div className="container">
        <div className="col-12 text-right">
          <button
            className="button outline"
            onClick={() => setShowTaskEdit(!showTaskEdit)}>
            {!showTaskEdit && "New"}
            {showTaskEdit && "➖"}
          </button>
        </div>
        {showTaskEdit && <TaskEdit task={{}} onSaveTask={onSaveTask} />}
        <Tasks tasks={state.tasks} onTglStatus={onTglStatus}></Tasks>
      </div>
    </div>
  );
}

export default App;