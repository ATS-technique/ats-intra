"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Fonction récursive pour transformer les dates entrantes (DD/MM/YYYY -> YYYY-MM-DD)
const transformIncomingDates = (data) => {
    if (Array.isArray(data)) {
        return data.map((item) => transformIncomingDates(item));
    }
    else if (data && typeof data === "object" && data !== null) {
        return Object.fromEntries(Object.entries(data).map(([key, value]) => {
            if (typeof value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                // Vérifie format DD/MM/YYYY
                console.log(`⏩ [Entrée] Avant transformation : ${key} = ${value}`);
                const [day, month, year] = value.split("/");
                const transformed = `${year}-${month}-${day}`;
                console.log(`✅ [Entrée] Après transformation : ${key} = ${transformed}`);
                return [key, transformed];
            }
            return [key, transformIncomingDates(value)];
        }));
    }
    return data;
};
const formatDate = (req, res, next) => {
    // 🔹 Transformer les dates entrantes uniquement
    req.body = transformIncomingDates(req.body);
    next();
};
exports.default = formatDate;
