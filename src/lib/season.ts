export type Season = "default" | "halloween" | "navidad";

/**
 * Las variables PUBLIC_* se inyectan en tiempo de build (output: "static").
 * Comparación estricta: "false" o "" nunca activan una temporada.
 */
const isOn = (value: unknown) => String(value).toLowerCase() === "true";

const halloweenOn = isOn(import.meta.env.PUBLIC_HALLOWEEN);
const navidadOn = isOn(import.meta.env.PUBLIC_NAVIDAD);

if (halloweenOn && navidadOn) {
  console.warn(
    "[season] PUBLIC_HALLOWEEN y PUBLIC_NAVIDAD están activas a la vez. Se aplica Navidad; desactiva una de ellas.",
  );
}

export const season: Season = navidadOn
  ? "navidad"
  : halloweenOn
    ? "halloween"
    : "default";

export const halloween = season === "halloween";
export const navidad = season === "navidad";
export const themed = season !== "default";
