// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE: Displays the form where the user can add
// new tasks to the task list.
// TYPE: Client Component because it uses state and
// handles user input.
// PROPS:
// onAdd - callback from TaskBoard that adds a new task
// ══════════════════════════════════════════════════════

"use client";

import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  // title is state because it stores the current text
  // the user is typing into the input box.
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    // Prevent the page from refreshing when the form submits.
    e.preventDefault();

    // Ignore empty or whitespace-only tasks.
    if (!title.trim()) return;

    // Send the new task to TaskBoard using the callback prop.
    onAdd(title.trim());

    // Clear the input after the task is added.
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 rounded-xl bg-slate-800 p-3 text-white outline-none"
      />

      <button
        type="submit"
        className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
      >
        Add
      </button>
    </form>
  );
}