// ══════════════════════════════════════════════════════
// COMPONENT: TaskBoard
// PURPOSE: Main parent component for the task manager.
// It owns the task state, filter state, localStorage,
// and the functions that update the task list.
// TYPE: Client Component because it uses state,
// effects, localStorage, and user interaction.
// PROPS: None
// ══════════════════════════════════════════════════════

"use client";

import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";
import FilterBar from "./FilterBar";

export default function TaskBoard() {
  // tasks is state because the user can add, complete,
  // delete, and clear tasks while using the app.
  const [tasks, setTasks] = useState([]);

  // filter is state because the user can switch between
  // viewing all, active, or completed tasks.
  const [filter, setFilter] = useState("all");

  // This effect loads any saved tasks from localStorage.
  // The typeof window guard is needed because localStorage
  // only exists in the browser, not during server rendering.
  // Running this effect after the component mounts also
  // prevents hydration mismatches in Next.js.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // This effect keeps localStorage synchronized with the
  // current task list. The dependency array contains tasks
  // because saving only needs to happen when tasks change.
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // These values are taken from tasks, so they do not
  // need their own state. React recalculates them whenever
  // the task list changes.
  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const active = total - completed;

  // visibleTasks is also taken. It changes what the user
  // sees without changing the actual task list.
  const visibleTasks =
    filter === "done"
      ? tasks.filter((task) => task.done)
      : filter === "active"
      ? tasks.filter((task) => !task.done)
      : tasks;

  function handleAdd(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      done: false,
    };

    // The spread operator creates a new array instead of
    // changing the existing state directly.
    setTasks([...tasks, newTask]);
  }

  function handleToggle(id) {
    // map returns a new array. Only the matching task is
    // copied with its done value changed.
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(id) {
    // filter returns a new array without the selected task,
    // keeping the state update immutable.
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleClearCompleted() {
    // Keep only the tasks that are not completed.
    setTasks(tasks.filter((task) => !task.done));
  }

  return (
  <main className="min-h-screen bg-pink-50 px-6 py-10 text-stone-900">
    <section className="mx-auto max-w-5xl">
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg shadow-pink-200">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-pink-500">
          Module 10 Project
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight text-pink-900">
          Ellie’s Focus Board
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          A soft pink productivity board for organizing tasks, tracking progress,
          and staying focused.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <section className="rounded-3xl bg-white p-6 shadow-lg shadow-pink-100">
          <AddTaskForm onAdd={handleAdd} />

          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
          />

          <TaskList
            tasks={visibleTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>

        <aside className="rounded-3xl bg-pink-100 p-6 shadow-lg shadow-pink-200">
          <TaskStats
            total={total}
            active={active}
            completed={completed}
            onClearCompleted={handleClearCompleted}
          />
        </aside>
      </div>
    </section>
  </main>
);
}