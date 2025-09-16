import React, { useCallback, useEffect, useId, useRef, useState } from "react";

export default function MultipleImagePicker({
  maxFiles = 12,
  maxSizeMB = 10,
  onChange,
  className,
}: {
  maxFiles?: number;
  maxSizeMB?: number; // per file
  onChange?: (files: File[]) => void;
  className?: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropId = useId();

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const notifyParent = useCallback(
    (next: File[]) => {
      if (onChange) onChange(next);
    },
    [onChange],
  );

  const validateAndMerge = useCallback(
    (incoming: File[]) => {
      const nextErrors: string[] = [];
      const isImage = (f: File) => f.type.startsWith("image/");
      const sizeOk = (f: File) => f.size <= maxSizeMB * 1024 * 1024;

      const key = (f: File) => `${f.name}__${f.size}__${f.lastModified}`;
      const currentKeys = new Set(files.map(key));

      const filtered = incoming.filter((f) => {
        if (!isImage(f)) {
          nextErrors.push(`❌ "${f.name}" n’est pas une image.`);
          return false;
        }
        if (!sizeOk(f)) {
          nextErrors.push(`❌ "${f.name}" dépasse ${maxSizeMB} Mo (${(f.size / 1024 / 1024).toFixed(1)} Mo).`);
          return false;
        }
        if (currentKeys.has(key(f))) {
          nextErrors.push(`⚠️ "${f.name}" est déjà sélectionné.`);
          return false;
        }
        return true;
      });

      const room = Math.max(0, maxFiles - files.length);
      const allowed = filtered.slice(0, room);
      if (filtered.length > room) {
        nextErrors.push(`⚠️ Limite: ${maxFiles} images maximum (les extra ont été ignorées).`);
      }

      const next = [...files, ...allowed];
      setFiles(next);
      setErrors(nextErrors);
      notifyParent(next);
    },
    [files, maxFiles, maxSizeMB, notifyParent],
  );

  const handleFilesFromInput = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      validateAndMerge(Array.from(list));
      if (inputRef.current) inputRef.current.value = ""; // allow re-selecting same files
    },
    [validateAndMerge],
  );

  const onInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => handleFilesFromInput(e.target.files),
    [handleFilesFromInput],
  );

  const onDrop = useCallback<React.DragEventHandler<HTMLLabelElement>>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dt = e.dataTransfer;
      if (dt?.files?.length) {
        validateAndMerge(Array.from(dt.files));
      }
      e.currentTarget.classList.remove("ring-2", "ring-offset-2");
    },
    [validateAndMerge],
  );

  const onDragOver = useCallback<React.DragEventHandler<HTMLLabelElement>>((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const onDragEnter = useCallback<React.DragEventHandler<HTMLLabelElement>>((e) => {
    e.currentTarget.classList.add("ring-2", "ring-offset-2");
  }, []);

  const onDragLeave = useCallback<React.DragEventHandler<HTMLLabelElement>>((e) => {
    e.currentTarget.classList.remove("ring-2", "ring-offset-2");
  }, []);

  const removeAt = useCallback(
    (idx: number) => {
      setFiles((prev) => {
        const next = prev.filter((_, i) => i !== idx);
        notifyParent(next);
        return next;
      });
    },
    [notifyParent],
  );

  return (
    <div className={"w-full max-w-3xl mx-auto " + (className ?? "")}>
      {/* Dropzone */}
      <label
        htmlFor={dropId}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        className="block cursor-pointer rounded-2xl border border-dashed border-zinc-300 p-6 text-center hover:border-zinc-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-10 opacity-70"
          >
            <path d="M12 16a1 1 0 0 1-1-1V8.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.42L13 8.4V15a1 1 0 0 1-1 1Z" />
            <path d="M4 15a4 4 0 0 1 4-4h1a1 1 0 1 1 0 2H8a2 2 0 0 0 0 4h8a3 3 0 0 0 .83-5.89 1 1 0 0 1-.66-1.27A4.49 4.49 0 0 0 12 6a4.5 4.5 0 0 0-4.38 3.35 1 1 0 0 1-.74.72A4 4 0 0 0 4 15Z" />
          </svg>
          <div className="text-sm text-zinc-600">
            <span className="font-medium text-zinc-900">Cliquer pour choisir</span> ou déposer des images ici
          </div>
          <div className="text-xs text-zinc-500">
            PNG, JPG, GIF, WEBP · Jusqu’à {maxFiles} images · {maxSizeMB} Mo / image
          </div>
        </div>
        <input
          id={dropId}
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onInputChange}
          className="sr-only"
        />
      </label>

      {/* Errors */}
      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-red-600">
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      {/* Preview Grid */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 text-sm text-zinc-600">
            Sélectionné : {files.length}/{maxFiles}
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {files.map((file, idx) => {
              const url = URL.createObjectURL(file);
              return (
                <li
                  key={`${file.name}-${file.lastModified}`}
                  className="group relative overflow-hidden rounded-xl border bg-white"
                >
                  <img
                    src={url}
                    alt={file.name}
                    className="h-32 w-full object-cover"
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <div className="truncate text-xs text-white/90" title={file.name}>
                      {file.name}
                    </div>
                    <button
                      type="button"
                      aria-label={`Supprimer ${file.name}`}
                      onClick={() => removeAt(idx)}
                      className="opacity-0 group-hover:opacity-100 rounded-lg bg-white/90 px-2 py-1 text-xs text-zinc-800 transition hover:bg-white"
                    >
                      Retirer
                    </button>
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
