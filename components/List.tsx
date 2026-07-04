import { getTodos } from "@/actions";
import Item from "./Item";

async function List() {
const todos = await getTodos();

  return (
    <div className="columns">
      <section className="column tasks box">
        <header className="colHead">
          <h2 className="colTitle">Task list</h2>
          <div className="counter">
            <span className="counterLable">Item:</span>
            <span className="taskCounterValue">
              {todos ? todos?.length : ""}
            </span>
          </div>
        </header>
        <h1 id="noTodo" className={todos?.length === 0 ? "" : "hidden"}>
          no todo
        </h1>
        <h1 id="noTodo" className="hidden">
          no todo
        </h1>
        <ul className="list taskList">
          {todos?.map((todo) => (
            <Item todo={todo} key={todo.id} />
          ))}
        </ul>

        <p className="tip">Take the item and darw to the other column</p>
      </section>
    </div>
  );
}

export default List;
