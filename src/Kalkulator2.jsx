import { createSignal } from "solid-js";


export default function Kalkulator() {
    const [iznos, setIznos] = createSignal(0);
    const [lokacija, setLokacija] = createSignal('Zagreb (23.6% / 35s4%)');
    const [djeca, setDjeca] = createSignal(0);
    const [uzdrzavane, setUzdrzavane] = createSignal(0);
    const [invaliditet, setInvaliditet] = createSignal('Bez invalidnosti');
    const [neto, setNeto] = createSignal(null);

    function submit(event) {
        event.preventDefault();
        const netoIznos = izracunajNeto();
        setNeto(netoIznos);
    }
    function izracunajNeto() {
        //formualza izracun tu
        let netoValue = iznos() * 0.75; //primjer??
        return netoValue.toFixed(2);
    }

    return (
        <div>
            <h1>Kalkulator za izračun plaće</h1>
            <form onSubmit={submit}>
                <div>
                    <label>Iznos:</label>
                    <input type="number" value={iznos()} onInput={(event) => setAmount(event.target.value)} />
                </div>
                <label>Mjesto prebivališta (zbog stope poreza): </label>
                <select value={lokacija()} onInput={(event) => setLokacija(event.target.value)}>
                    <option value="Zagreb (23.6% / 35.4%)">Zagreb (23.6% / 35.4%)</option>
                    <option value="Split (21.5% / 32.25%)">Split (21.5% / 32.25%)</option>
                </select>
                <div>
                    <label>Broj djece:</label>
                    <input type="number" value={djeca()} onInput={(event) => setDjeca(event.target.value)} />
                </div>
                <div>
                    <label>Broj uzdržavanih osoba:</label>
                    <input type="number" value={uzdrzavane()} onInput={(event) => setUzdrzavane(event.target.value)} />
                </div>
                <div>
                    <label>Invalidnost:</label>
                    <input type="radio" value="Bez invalidnosti" onInput={(event) => setInvaliditet(event.target.value)} />

                </div>
                <div>
                    <label>Bez invalidnosti</label>
                    <input type="radio" value="Djelomična invalidnost" checked={invaliditet() === 'Djelomična invalidnost'} onInput={(event) => setDisability(event.target.value)} />
                </div>
                <div>
                    <label> Djelomična invalidnost</label>
                    <input type="radio" value="100% invalidnost" checked={invaliditet() === '100% invalidnost'} onInput={(event) => setDisability(event.target.value)} />
                </div>
            </form>

        </div>

    );

}

_______________________________________________________________________________________________________________





import { createSignal } from 'solid-js';

export default function SalaryCalculator() {
  const [iznos, setIznos] = createSignal(0);
  const [lokacija, setLokacija] = createSignal('Zagreb (23.60% / 35.40%)');
  const [dijeca, setDijeca] = createSignal(0);
  const [uzdrzavane, setUzdrzavane] = createSignal(0);
  const [invalidnost, setInvalidnost] = createSignal('Bez invalidnosti');
  const [netto, setNetto] = createSignal(null);

  function submit(event) {
    event.preventDefault();
    const nettoIznos = calculateNetto();
    setNetto(nettoIznos);
  }

  function calculateNetto() {
    // Ovdje ide formula za izračun
    let nettoValue = iznos() * 0.75; // Jednostavni primjer
    return nettoValue.toFixed(2);
  }

  return (
    <div>
      <h1>Kalkulator za izračun plaće</h1>
      <form onSubmit={submit}>
        <div>
          <label>Iznos:</label>
          <input
            type="number"
            value={iznos()}
            onInput={(event) => setIznos(event.target.value)}
          />
        </div>
        <div>
          <label>Mjesto prebivališta:</label>
          <select value={lokacija()} onInput={(event) => setLokacija(event.target.value)}>
            <option value="Zagreb (23.60% / 35.40%)">Zagreb (23.60% / 35.40%)</option>
            <option value="Split (21.5% / 32.25%)">Split (21.5% / 32.25%)</option>
            <option value="Koprivnica (20.00% / 30.00%)">Koprivnica (20.00% / 30.00%)</option>
          </select>
        </div>
        <div>
          <label>Broj djece:</label>
          <input
            type="number"
            value={dijeca()}
            onInput={(event) => setDijeca(event.target.value)}
          />
        </div>
        <div>
          <label>Broj uzdržavanih osoba:</label>
          <input
            type="number"
            value={uzdrzavane()}
            onInput={(event) => setUzdrzavane(event.target.value)}
          />
        </div>
        <div>
          <label>Invalidnost:</label>
          <div>
            <label>
              <input
                type="radio"
                value="Bez invalidnosti"
                checked={invalidnost() === 'Bez invalidnosti'}
                onInput={(event) => setInvalidnost(event.target.value)}
              />
              Bez invalidnosti
            </label>
            <label>
              <input
                type="radio"
                value="Djelomična invalidnost"
                checked={invalidnost() === 'Djelomična invalidnost'}
                onInput={(event) => setInvalidnost(event.target.value)}
              />
              Djelomična invalidnost
            </label>
            <label>
              <input
                type="radio"
                value="100% invalidnost"
                checked={invalidnost() === '100% invalidnost'}
                onInput={(event) => setInvalidnost(event.target.value)}
              />
              100% invalidnost
            </label>
          </div>
        </div>
        <button type="submit">Izračunaj Netto</button>
      </form>
      {netto() && <h2>Netto iznos: {netto()}</h2>}
    </div>
  );
}
