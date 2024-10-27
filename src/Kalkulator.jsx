import { createSignal } from 'solid-js';

export default function SalaryCalculator() {
  const [amount, setAmount] = createSignal(0);
  const [location, setLocation] = createSignal('Zagreb (18%)');
  const [netto, setNetto] = createSignal(null);

  function submit(event) {
    event.preventDefault();
    const nettoAmount = calculateNetto();
    setNetto(nettoAmount);
  }

  function calculateNetto() {
    const bruto = parseFloat(amount());

    // 1. Mirovinski doprinosi (20% od bruto - 15% za prvi stup i 5% za drugi stup)
    const mirovinskiDoprinosi = bruto * 0.20;
    const poreznaOsnovica = bruto - mirovinskiDoprinosi;

    // 2. Porez na dohodak - primjenjujemo 20% na cijelu osnovicu
    const porezNaDohodak = poreznaOsnovica * 0.20;

    // 3. Prirez - prema mjestu prebivališta
    let prirezStopa = 0;
    if (location() === 'Zagreb (18%)') prirezStopa = 0.18;
    else if (location() === 'Split (15%)') prirezStopa = 0.15;
    else if (location() === 'Rijeka (12%)') prirezStopa = 0.12;

    const prirez = porezNaDohodak * prirezStopa;

    // 4. Neto plaća
    const netto = poreznaOsnovica - porezNaDohodak - prirez;
    return netto.toFixed(2);
  }

  return (
    <div>
      <h1>Kalkulator za izračun plaće</h1>
      <form onSubmit={submit}>
        <div>
          <label>Iznos (bruto):</label>
          <input
            type="number"
            value={amount()}
            onInput={(event) => setAmount(event.target.value)}
          />
        </div>
        <div>
          <label>Mjesto prebivališta:</label>
          <select value={location()} onInput={(event) => setLocation(event.target.value)}>
            <option value="Zagreb (18%)">Zagreb (18%)</option>
            <option value="Split (15%)">Split (15%)</option>
            <option value="Rijeka (12%)">Rijeka (12%)</option>
          </select>
        </div>
        <button type="submit">Izračunaj Netto</button>
      </form>
      {netto() && <h2>Netto iznos: {netto()} HRK</h2>}
    </div>
  );
}

/*<p>
Objašnjenje:
Bruto plaća (Iznos) - unosimo bruto plaću.
Mirovinski doprinosi - 20% bruto plaće se odbija za mirovinsko osiguranje.
Porez na dohodak - 20% na cijelu poreznu osnovicu.

Prirez - ovisno o mjestu prebivališta:
Zagreb ima prirez 18%.
Split 15%.
Rijeka 12%.

Neto plaća - konačna neto plaća se dobiva oduzimanjem poreza na dohodak i prireza od porezne osnovice.
</p> */
