import Task from "./Task";
function Tasks({ tasks, onTglStatus }) {
    if(tasks) {
    var taskList = tasks.map((task) => (
        <div className="col-12" key={task.id}>
          <Task task={task} onTglStatus={onTglStatus} />
        </div>
      ));
    }
  return (
    <div className="card">
      <div className="row">
        {taskList}
      </div>
    </div>
  );
}

export default Tasks;