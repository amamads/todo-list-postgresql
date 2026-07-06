"use client";

import { deleteTodo, editTodo } from "@/actions";
import { Todo } from "@/generated/prisma/client";
import { useRef, useState } from "react";

// async function deleteTodo(id: number | string) {
//     try {
//         const res = await axios.delete<Todo>(
//             `http://localhost:3500/todos/${id}`
//         );
//         return res.data
//     } catch (err) {
//         console.error(err)
//     }
//     finally { window.location.reload() }
// }
// async function editTodo(id: number | string, data: Todo) {
//     try {
//         const res = await axios.put<Todo>(
//             `http://localhost:3500/todos/${id}`,
//             data
//         );
//         return res.data
//     } catch (err) {
//         console.error(err)
//     }
//     finally { window.location.reload() }
// }

function Item({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);

  const editInputEl = useRef<HTMLInputElement | null>(null);
  const todoTextEl = useRef<HTMLParagraphElement | null>(null);

  const originText = useRef<string | null | undefined>(null);

  // function onDelete() {
  //     deleteTodo(todo.id)
  // }
  const onDelete = deleteTodo.bind(null, Number(todo.id));

  function onEdit() {
    if (isEditing) {
      const editedText = editInputEl.current?.value;
      if (!editedText) return;

      editTodo(Number(todo.id), { text: editedText });
      setIsEditing(false);
    } else {
      originText.current = todoTextEl.current?.textContent;
      setIsEditing(true);

      setTimeout(() => {
        if (!editInputEl.current) return;
        editInputEl.current.value = originText.current ?? "";
        editInputEl.current.focus();
      }, 100);
    }
  }

  function cancelEdit() {
    setIsEditing(false);

    if (todoTextEl.current)
      todoTextEl.current.textContent = originText.current ?? "";
  }

  return (
    <li className="item" id={String(todo.id)}>
      <label htmlFor={`todo-${todo.id}`} className="item-info">
        <input
          id={`todo-${todo.id}`}
          className="checkbox"
          type="checkbox"
          onChange={() => editTodo(todo.id, { ...todo, isDone: !todo.isDone })}
          checked={todo.isDone}
        />

        {isEditing ? (
          <input className="editInput" ref={editInputEl} />
        ) : (
          <p className="itemText" ref={todoTextEl}>
            {todo.text}
          </p>
        )}
      </label>
      <div className="btns">
        <button
          className="removeBtn"
          onClick={isEditing ? cancelEdit : onDelete}
        >
          {isEditing ? "📥" : "❌"}
        </button>
        <button className="editBtn" onClick={onEdit}>
          {isEditing ? "✅" : "✏️"}
        </button>
      </div>
    </li>
  );
}

export default Item;
