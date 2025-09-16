import { useId } from "react";

type Primitive = string | number;

type KeyOrFn<T, R> = keyof T | ((item: T) => R);

type BaseOption = { value: Primitive; label: string; disabled?: boolean };

function getValue<T>(item: T, valueField?: KeyOrFn<T, Primitive>): Primitive {
  if (!valueField) {
    // si l'objet ressemble déjà à { value }
    if ((item as Record<string, unknown>)?.value !== undefined)
      return (item as Record<string, unknown>).value as Primitive;
    throw new Error("valueField est requis si options n'ont pas de 'value'.");
  }
  return typeof valueField === "function" ? valueField(item) : ((item as T)[valueField as keyof T] as Primitive);
}

function getLabel<T>(item: T, labelField?: KeyOrFn<T, string>): string {
  if (!labelField) {
    // si l'objet ressemble déjà à { label }
    if ((item as unknown as { label?: unknown })?.label !== undefined)
      return String((item as { label: unknown }).label);
    // fallback: toString
    return String(item as unknown);
  }
  return typeof labelField === "function" ? labelField(item) : String((item as T)[labelField as keyof T]);
}

export type TailwindSelectProps<T> = {
  label?: string;
  options: T[];
  /** Valeur contrôlée (string|number). Peut être null/undefined pour “aucun choix”. */
  value?: Primitive | null | undefined;
  onChange?: (v: Primitive | null, rawOption?: T | null) => void;
  placeholder?: string;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  /** Clé OU fonction pour extraire la value */
  valueField?: KeyOrFn<T, Primitive>;
  /** Clé OU fonction pour extraire le label */
  labelField?: KeyOrFn<T, string>;
  /** Clé OU fonction pour disabled (optionnel) */
  disabledField?: KeyOrFn<T, boolean>;
};

export function CustomSelect<T>({
  label,
  options,
  value,
  onChange,
  placeholder = "Choisir…",
  error,
  disabled,
  className = "",
  name,
  valueField,
  labelField,
  disabledField,
}: TailwindSelectProps<T>) {
  const id = useId();

  // Normalisation => tableau d’options prêtes pour <select>
  const normalized: Array<BaseOption & { raw: T }> = options.map((item) => {
    const val = getValue(item, valueField);
    const lab = getLabel(item, labelField);
    const dis = disabledField
      ? typeof disabledField === "function"
        ? disabledField(item)
        : Boolean((item as Record<string, unknown>)[disabledField as string])
      : ((item as { disabled?: boolean })?.disabled ?? false);

    return { value: val, label: lab, disabled: dis, raw: item };
  });

  // classes Tailwind
  const base =
    "block w-full appearance-none rounded-lg border bg-white dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-500 pr-10 " +
    "text-sm leading-5 transition-colors focus:outline-none focus:ring-4";
  const ok = "border-zinc-300 text-zinc-900 placeholder-zinc-400 " + "focus:border-blue-500 focus:ring-blue-200";
  const ko = "border-red-500 text-zinc-900 placeholder-red-300 " + "focus:border-red-500 focus:ring-red-200";
  const disCls = "opacity-60 cursor-not-allowed";
  const pad = "px-3 py-2";

  // valeur contrôlée sous forme string (HTML select compare en string)
  const stringValue = value == null ? "" : String(value);

  return (
    <div className={`w-full max-w-sm ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-zinc-700 dark:text-neutral-200">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Chevron */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-zinc-500" aria-hidden>
            <path d="M6 8l4 4 4-4" fill="currentColor" />
          </svg>
        </div>

        <select
          id={id}
          name={name}
          value={stringValue}
          disabled={disabled}
          onChange={(e) => {
            const valStr = e.target.value;
            if (valStr === "") {
              onChange?.(null, null);
              return;
            }
            // retrouver l’option choisie
            const picked = normalized.find((o) => String(o.value) === valStr);
            onChange?.(picked ? picked.value : (valStr as Primitive), picked?.raw ?? null);
          }}
          className={[base, pad, disabled ? disCls : "", error ? ko : ok].join(" ")}
        >
          {/* Placeholder (si aucune value) */}
          <option value="0" hidden>
            {placeholder}
          </option>

          {normalized.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {typeof error === "string" && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
