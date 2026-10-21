"""Build tiny hero-heading font subsets (inlined/preloaded by scripts/prerender.mjs)."""
import re, subprocess
c = open("src/lib/content.ts", encoding="utf8").read()
def val(key, lang):
    m = re.search(key + r': \{ en: "([^"]+)", ar: "([^"]+)" \}', c)
    return m.group(1) if lang == "en" else m.group(2)
ar = val("  title", "ar") + val("  name", "ar") + "٠١٢٣٤٥٦٧٨٩"
en = val("  title", "en") + "Dar Al Sama" + "0123456789"
# heroCopy.title is the first `title:` after `heroCopy`
hc = c[c.index("export const heroCopy"):]
ar = re.search(r'title: \{ en: "([^"]+)", ar: "([^"]+)" \}', hc).group(2) + "دار السماء"
en = re.search(r'title: \{ en: "([^"]+)", ar: "([^"]+)" \}', hc).group(1) + "Dar Al Sama"
for src, text, out in [("public/fonts/Amiri-400-arabic.woff2", ar, "public/fonts/hero-ar.woff2"),
                       ("public/fonts/CormorantGaramond-500-latin.woff2", en, "public/fonts/hero-en.woff2")]:
    subprocess.run(["pyftsubset", src, f"--text={text}", "--layout-features=*", "--flavor=woff2", f"--output-file={out}"], check=True)
    print(out, len(open(out, "rb").read()))
