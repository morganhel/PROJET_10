import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    // classement par ordre décroissant
  ); 

  const l =byDateDesc?.length

  const nextCard = () => {
    setTimeout(
      () => setIndex(index < l-1 ? index + 1 : 0),
      5000
    );
  };
  // on enlève 1 pour ne pas dépasser la longueur du tableau

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((e, radioIdx) => (
                <input
                  key={`${e.title}`}
                  // key unique
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}  // remplace idx par index (celui de la slide active)
                  readOnly // erreur console, gestionnaire onChange
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
