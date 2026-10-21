const BASE = import.meta.env.BASE_URL;
export const img = (name: string, w: number) => `${BASE}img/${name}-${w}.webp`;
const widths = (name: string) => (["coffee", "detail"].includes(name) ? [480, 800, 912] : [480, 800, 1200]);
export function pic(name: string, sizes: string) {
  const ws = widths(name);
  return { src: img(name, ws[1]!), srcSet: ws.map((w) => `${img(name, w)} ${w}w`).join(", "), sizes };
}
export const archSizes = "(min-width: 1024px) 36rem, (min-width: 640px) 26rem, calc(100vw - 3rem)";
export const archAvif = [480, 720, 870].map((w) => `${BASE}img/arch-${w}.avif ${w}w`).join(", ");
export const archWebp = [480, 720, 870].map((w) => `${BASE}img/arch-${w}.webp ${w}w`).join(", ");
