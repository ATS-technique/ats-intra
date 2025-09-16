import { useEffect, useRef, useState } from "react";

type ProjectType = { id_project_type: number; name: string };

export default function ProjectTypeDropdown({
  projectTypes,
  label = "Types de projet",
}: {
  projectTypes: ProjectType[];
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // fermer au clic extérieur / Échap
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="types-dropdown"
        onClick={() => setOpen((o) => !o)}
        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 inline-flex items-center"
      >
        {label}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div id="types-dropdown" className="absolute mt-2 z-10 bg-white rounded-lg shadow-sm w-52 border" role="list">
          <ul className="py-2 text-sm text-gray-700">
            {projectTypes.length === 0 && <li className="px-4 py-2 text-gray-400">Aucun type</li>}
            {projectTypes.map((t) => (
              <li key={t.id_project_type} className="px-4 py-2">
                <span className="block">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
