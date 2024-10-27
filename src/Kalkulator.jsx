import { createSignal } from 'solid-js';
import './stilovi.css';

export default function SalaryCalculator() {
  const [amount, setAmount] = createSignal(0);
  const [location, setLocation] = createSignal('Zagreb (18%)');
  const [children, setChildren] = createSignal(0);
  const [dependents, setDependents] = createSignal(0);
  const [isDisabled, setIsDisabled] = createSignal(false);
  const [netto, setNetto] = createSignal(null);

  function submit(event) {
    event.preventDefault();
    const nettoAmount = calculateNetto();
    setNetto(nettoAmount);
  }

  function calculateNetto() {
    const bruto = parseFloat(amount());

    // 1. mirovinski doprinosi (20% od bruto - 15% za prvi stup i 5% za drugi stup)
    const mirovinskiDoprinosi = bruto * 0.20;
    const poreznaOsnovica = bruto - mirovinskiDoprinosi;

    // 2. osobni odbitak (osnovni odbitak + odbitak za djecu i uzdržavane članove)
    const osnovniOdbitak = 560.00; // u eurima za 2024
    const odbitakZaDjecu = 280.00 * children(); // odbitak po djetetu
    const odbitakZaUzdržavane = 280.00 * dependents(); // odbitak po uzdržavanoj osobi
    const invalidskiOdbitak = isDisabled() ? 560.00 : 0; // odbitak za 100% invalidnost

    // ukupan osobni odbitak
    const ukupniOsobniOdbitak = osnovniOdbitak + odbitakZaDjecu + odbitakZaUzdržavane + invalidskiOdbitak;

    // 3. Porezna osnovica s odbitkom
    const osnovicaSOsobnimOdbitkom = Math.max(poreznaOsnovica - ukupniOsobniOdbitak, 0);

    // 4. Porez na dohodak - primjenjujemo stopu od 20% do određenog praga, nakon čega ide 30%
    const prag = 4200; // Prag u eurima za višu stopu poreza
    let porezNaDohodak;
    if (osnovicaSOsobnimOdbitkom <= prag) {
      porezNaDohodak = osnovicaSOsobnimOdbitkom * 0.20;
    } else {
      porezNaDohodak = prag * 0.20 + (osnovicaSOsobnimOdbitkom - prag) * 0.30;
    }

    // priprez prema mjestu prebivališta
    let prirezStopa = 0;
    if (location() === 'Zagreb (18%)') prirezStopa = 0.18;
    else if (location() === 'Split (15%)') prirezStopa = 0.15;
    else if (location() === 'Rijeka (12%)') prirezStopa = 0.12;

    const prirez = porezNaDohodak * prirezStopa;

    // neto plaća
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
        <div>
          <label>Broj djece:</label>
          <input
            type="number"
            min="0"
            value={children()}
            onInput={(event) => setChildren(parseInt(event.target.value))}
          />
        </div>
        <div>
          <label>Broj uzdržavanih osoba:</label>
          <input
            type="number"
            min="0"
            value={dependents()}
            onInput={(event) => setDependents(parseInt(event.target.value))}
          />
        </div>
        <div>
          <label>Invalidnost:</label>
          <input
            type="checkbox"
            checked={isDisabled()}
            onChange={(event) => setIsDisabled(event.target.checked)}
          />{' '}
          100% invalidnost
        </div>
        <button type="submit">Izračunaj Netto</button>
      </form>
      {netto() && <h2>Netto iznos: {netto()} EUR</h2>}
    </div>
  );
}