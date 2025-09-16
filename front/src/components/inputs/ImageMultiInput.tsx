import React, { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * ImageMultiInput — Sélection multiple d'images (React + Tailwind)
 * - <input type="file" multiple accept="image/*">
 * - Drag & Drop
 * - Aperçus + suppression individuelle
 * - Validation type/poids + limite de fichiers
 * - 100% Tailwind, sans dépendances
 *
 * Props clés:
 *  - maxFiles: nombre max d'images (par défaut 12)
 *  - maxSizeMB: taille max par fichier (par défaut 10 Mo)
 *  - onChange(files: File[]): callback quand la sélection change
 *  - name: nom de champ (optionnel, utile pour FormData côté parent)
 */

export type ImageMultiInputProps = {
  maxFiles?: number;
  maxSizeMB?: number;
  onChange?: (files: File[]) => void;
  name?: string;
  className?: string;
};

export default function ImageMultiInput({
  maxFiles = 12,
  maxSizeMB = 10,
  onChange,
  name = "images",
  className,
}: ImageMultiInputProps) {
  const inputId = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Prévenir les fuites d'URL (si jamais on en créait ailleurs)
  useEffect(() => {
    return () => {
      // Rien à révoquer ici car on crée les URL à la volée dans <img> puis on revoke onLoad
    };
  }, []);

  const notify = useCallback(
    (next: File[]) => {
      onChange?.(next);
    },
    [onChange],
  );

  const mergeFiles = useCallback(
    (incoming: File[]) => {
      const nextErrors: string[] = [];

      const isImage = (f: File) => f.type.startsWith("image/");
      const sizeOk = (f: File) => f.size <= maxSizeMB * 1024 * 1024;

      const key = (f: File) => `${f.name}__${f.size}__${f.lastModified}`;
      const existing = new Set(files.map(key));

      const filtered = incoming.filter((f) => {
        if (!isImage(f)) {
          nextErrors.push(`❌ "${f.name}" n'est pas une image.`);
          return false;
        }
        if (!sizeOk(f)) {
          nextErrors.push(`❌ "${f.name}" dépasse ${maxSizeMB} Mo.`);
          return false;
        }
        if (existing.has(key(f))) {
          nextErrors.push(`⚠️ "${f.name}" est déjà sélectionné.`);
          return false;
        }
        return true;
      });

      const room = Math.max(0, maxFiles - files.length);
      const allowed = filtered.slice(0, room);
      if (filtered.length > room) {
        nextErrors.push(`⚠️ Limite: ${maxFiles} images maximum. Les extra ont été ignorées.`);
      }

      const next = [...files, ...allowed];
      setFiles(next);
      setErrors(nextErrors);
      notify(next);
    },
    [files, maxFiles, maxSizeMB, notify],
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files;
      if (!list) return;
      mergeFiles(Array.from(list));
      // reset pour pouvoir re-sélectionner les mêmes fichiers
      if (inputRef.current) inputRef.current.value = "";
    },
    [mergeFiles],
  );

  const onDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer;
    if (dt?.files?.length) mergeFiles(Array.from(dt.files));
    e.currentTarget.classList.remove("ring-2", "ring-offset-2");
  };
  const onDragOver: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };
  const onDragEnter: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.currentTarget.classList.add("ring-2", "ring-offset-2");
  };
  const onDragLeave: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.currentTarget.classList.remove("ring-2", "ring-offset-2");
  };

  const removeAt = (idx: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      notify(next);
      return next;
    });
  };

  return (
    <div className={"w-full max-w-3xl " + (className ?? "")}>
      {/* Zone de sélection / drop */}
      <label
        htmlFor={inputId}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        className="block cursor-pointer rounded-2xl border border-dashed border-zinc-300 p-6 text-center hover:border-zinc-400 transition focus:outline-none"
      >
        <div className="flex flex-col items-center gap-2 dark:text-neutral-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-10 opacity-70"
          >
            <path d="M12 16a1 1 0 0 1-1-1V8.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.42L13 8.4V15a1 1 0 0 1-1 1Z" />
            <path d="M4 15a4 4 0 0 1 4-4h1a1 1 0 1 1 0 2H8a2 2 0 0 0 0 4h8a3 3 0 0 0 .83-5.89 1 1 0 0 1-.66-1.27A4.49 4.49 0 0 0 12 6a4.5 4.5 0 0 0-4.38 3.35 1 1 0 0 1-.74.72A4 4 0 0 0 4 15Z" />
          </svg>
          <div className="text-sm text-zinc-600 dark:text-neutral-400">
            <span className="font-medium text-zinc-900 dark:text-neutral-200">Cliquer pour choisir</span> ou déposer des
            images ici
          </div>
          <div className="text-xs text-zinc-500 dark:text-neutral-400">
            PNG, JPG, GIF, WEBP · Jusqu’à {maxFiles} images · {maxSizeMB} Mo / image
          </div>
        </div>
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          name={name}
          onChange={onInputChange}
          className="sr-only"
        />
      </label>

      {/* Affichage des erreurs */}
      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-red-600">
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      {/* Grille d'aperçus */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 text-sm text-zinc-600 dark:text-neutral-400">
            Sélectionné : {files.length}/{maxFiles}
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {files.map((file, idx) => {
              const url = URL.createObjectURL(file);
              return (
                <li
                  key={`${file.name}-${file.lastModified}`}
                  className="group relative rounded-xl border bg-white dark:bg-neutral-900"
                >
                  <img
                    src={url}
                    alt={file.name}
                    className="h-32 w-full object-cover"
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                  <button
                    type="button"
                    aria-label={`Supprimer ${file.name}`}
                    onClick={() => removeAt(idx)}
                    className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 transform w-7 h-7 grid place-items-center rounded-full bg-black/70 text-white shadow hover:bg-black"
                  >
                    ×
                  </button>
                  <div
                    className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/60 to-transparent p-2 text-[11px] text-white/90"
                    title={file.name}
                  >
                    {file.name}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
