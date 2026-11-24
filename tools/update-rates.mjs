// Met à jour les taux de change de data/pricing.json (Node 18+).
// Usage : node tools/update-rates.mjs
import { readFile, writeFile } from "node:fs/promises";

const file = new URL("../data/pricing.json", import.meta.url);
const data = JSON.parse(await readFile(file, "utf8"));
const res = await fetch("https://open.er-api.com/v6/latest/EUR");
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const body = await res.json();
if (body.result !== "success") throw new Error("Réponse inattendue de l'API de taux");

const wanted = new Set(["EUR", "USD", "XOF", ...data.countries.map((c) => c.currency)]);
const missing = [];
for (const code of wanted) {
  if (typeof body.rates[code] === "number") data.rates.ratesPerEUR[code] = body.rates[code];
  else missing.push(code);
}
data.rates.ratesPerEUR.XOF = 655.957; // parité fixe F CFA / euro
data.rates.ratesPerEUR.XAF = 655.957;
data.rates.updatedAt = new Date().toISOString().slice(0, 10);
await writeFile(file, JSON.stringify(data, null, 2) + "\n");
console.log(`Taux mis à jour (${data.rates.updatedAt}).` + (missing.length ? ` Absents, conservés : ${missing.join(", ")}` : ""));
