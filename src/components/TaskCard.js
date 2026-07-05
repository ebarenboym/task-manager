// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: Displays a single task with buttons to
// toggle or delete it.
// TYPE: Client Component (uses button click events)
// PROPS:
// id - unique task id
// title - task title
// done - whether the task is complete
// onToggle - callback that changes the task status
// onDelete - callback that removes the task
// ══════════════════════════════════════════════════════

"use client";

export default function TaskCard({
  id,
  title,
  done,
  onToggle,
  onDelete,
}) {
  // The text style depends on whether the task is done.
  // I don't store this in state because it can be
  // calculated directly from the done prop every render.
  const textClass = done
    ? "text-slate-500 line-through"
    : "text-slate-100";

  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl bg-slate-800 p-4">
      <p className={textClass}>{title}</p>

      <div className="flex gap-2">
        <button
          // Send this task's id back to TaskBoard.
          // TaskBoard owns the state, so it updates
          // the task and React re-renders the list.
          onClick={() => onToggle(id)}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600"
        >
          Toggle
        </button>

        <button
          // Send this task's id back so TaskBoard
          // can remove it from the tasks array.
          onClick={() => onDelete(id)}
          className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-bold text-white hover:bg-rose-600"
        >
          Delete
        </button>
      </div>
    </article>
  );
}