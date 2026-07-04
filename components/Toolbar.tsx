"use client";

import { addTodo, deleteTodos } from "@/actions";
import { useRef, useState } from "react";

export default function Toolbar() {
  const [text, setText] = useState("");

  const addInputEl = useRef<HTMLInputElement>(null);
  const addBtnEl = useRef<HTMLButtonElement>(null);

  function onAddTodo() {
    if (text.trim() === "" && addInputEl.current)
      return addInputEl.current.focus();
    addTodo(text);
    setText("");
  }

  const onReset = deleteTodos.bind(null);

  return (
    <form onSubmit={onAddTodo}>
      <div className="toolbar">
        <input
          type="text"
          id="addInput"
          className="box"
          placeholder="add new to do"
          spellCheck="false"
          onChange={(e) => setText(e.target.value)}
          value={text}
          ref={addInputEl}
        />
        <button
          id="addBtn"
          className="box toolBtn"
        //   onClick={onAddTodo}
          ref={addBtnEl}
          type="submit"
        >
          Add
        </button>
        <button
          id="reset"
          type="button"
          className="box toolBtn"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
