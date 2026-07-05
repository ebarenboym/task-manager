// ══════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE: Displays the current task counts and lets
// the user clear all completed tasks.
// TYPE: Client Component
// PROPS:
// total - total number of tasks
// active - number of active tasks
// completed - number of completed tasks
// onClearCompleted - callback that removes completed tasks
// ══════════════════════════════════════════════════════

"use client";

export default function TaskStats({
  total,
  active,
  completed,
  onClearCompleted,
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="grid gap-3 text-lg">
        <p>
          <span className="font-bold text-pink-700">Total:</span> {total}
        </p>

        <p>
          <span className="font-bold text-pink-600">Active:</span> {active}
        </p>

        <p>
          <span className="font-bold text-pink-500">Completed:</span>{" "}
          {completed}
        </p>
      </div>

      <button
        // This callback goes back to TaskBoard because
        // TaskBoard owns the task state. Clicking it
        // removes every completed task from the list.
        onClick={onClearCompleted}
        className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
      >
        Clear Completed
      </button>
    </section>
  );
}