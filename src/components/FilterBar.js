// ══════════════════════════════════════════════════════
// COMPONENT: FilterBar
// PURPOSE: Displays the filter buttons so the user can
// choose which tasks to see.
// TYPE: Client Component (uses button click events)
// PROPS:
// filter - the filter that is currently selected
// onFilterChange - callback that updates the selected filter
// ══════════════════════════════════════════════════════

"use client";

export default function FilterBar({ filter, onFilterChange }) {
  // This array is used to create the three filter buttons
  // instead of writing the same button three different times.
  const filters = ["all", "active", "done"];

  return (
    <section className="mt-6 flex gap-3">
      {/* map creates one button for each filter option. */}
      {filters.map((item) => (
        <button
          key={item}
          // Send the selected filter back to TaskBoard.
          // TaskBoard owns the filter state and decides
          // which tasks should be displayed.
          onClick={() => onFilterChange(item)}
          className={
            // Change the button style so the user can
            // easily see which filter is currently active.
            filter === item
              ? "rounded-xl bg-pink-600 px-5 py-2 font-bold capitalize text-white"
              : "rounded-xl bg-slate-800 px-5 py-2 font-bold capitalize text-slate-300 hover:bg-slate-700"
          }
        >
          {item}
        </button>
      ))}
    </section>
  );
}