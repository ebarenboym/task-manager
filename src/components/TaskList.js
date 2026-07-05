// ══════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE: Displays the current list of tasks by
// rendering one TaskCard for each task.
// TYPE: Client Component because it passes callback
// functions to each TaskCard.
// PROPS:
// tasks - array of tasks that should be displayed
// onToggle - function that marks a task complete/incomplete
// onDelete - function that removes a task
// ══════════════════════════════════════════════════════

"use client";

import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="mt-8 space-y-3">
      {tasks.length === 0 ? (
        // Display a message when there are no tasks to show.
        <p className="rounded-2xl border border-dashed border-slate-700 p-6 text-center text-slate-400">
          No tasks to show.
        </p>
      ) : (
        // map loops through the array and creates one
        // TaskCard component for every task object.
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}