import { useEffect, useState } from "react";
import axios from "axios";
import "../style/purchasecard.css";

export default function PurchaseCard(data) {
  const [tarifs, setTarifs] = useState([]);
  const [film, setFilm] = useState({});
  const [placeSelected, setPlaceSelected] = useState(0);
  const [globalPrice, setGlobalPrice] = useState(0);
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    const fetchTarifData = async () => {
      try {
        const tarifResponse = await axios.get("http://127.0.0.1:8000/prices");
        setTarifs(tarifResponse.data);
      } catch (error) {
        console.error("Failed to fetch tarif data:", error);
      }
    }

    fetchTarifData();
    setFilm(data.film);
  }, [data]);

  useEffect(() => {
    tarifs.forEach(element => {
      setPlaceData((values) => ({ ...values, [element.id]: 0 }));
    });
  }, [tarifs])

  const addPlaces = (e) => {
    const targetTarif= e.target.id.slice(10);

    // TODO: Vérification par rapport au nombre de place maximal
    if (placeSelected === 9) {
      return;
    }

    setPlaceData((values) => ({ ...values, [targetTarif]: placeData[targetTarif]++ }));
    setPlaceSelected(placeSelected + 1);

    tarifs.forEach(element => {
      if (element.id === parseInt(targetTarif)) {
        setGlobalPrice(globalPrice + element.price)
      }
    });
  };

  const minusPlaces = (e) => {
    const targetTarif = e.target.id.slice(12);

    if (placeSelected < 1 || placeData[targetTarif] < 1) {
      return;
    }

    setPlaceData((values) => ({ ...values, [targetTarif]: placeData[targetTarif]-- }));
    setPlaceSelected(placeSelected - 1);

    tarifs.forEach(element => {
      if (element.id === parseInt(targetTarif)) {
        setGlobalPrice(globalPrice - element.price)
      }
    });
  };

  return (
    <div className="purchase-card">
      <div className="purchase-card-header">
        <div className="first-line">
          <b className="title">{film.film_name}</b>
          <div className="session-details">
            {film.room_name} - {film.timestamp}
          </div>
        </div>

        <div className="second-line">
          <div className="nbPlaces">{placeSelected} Place{placeSelected > 1 ? "s" : ""}</div>
          <div className="total-prices">{globalPrice.toFixed(2)} €</div>
        </div>
      </div>

      <div className="purchase-card-body">
        {tarifs.map((tarif, index) => (
          <div key={tarif.id} class="line">
            <p>
              {tarif.name}
              <span class="tarif-price">
                {tarif.price.toFixed(2)} €
              </span>
            </p>
            <input type="button" class="place-minus" id={`minus_tarif_${tarif.id}`} value="−" onClick={minusPlaces} />
            <input type="number" class="place-nb vide" name={`tarif[${tarif.id}]`} id={`tarif_${tarif.id}`} value={placeData[tarif.id]} min="0" step="1" readOnly />
            <input type="button" class="place-add" id={`add_tarif_${tarif.id}`}  value="+" onClick={addPlaces} />
          </div>
        ))}
      </div>
    </div>
  );
};