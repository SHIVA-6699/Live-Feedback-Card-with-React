import { ReactNode, useState } from "react";
import "./App.css";
import AOS from 'aos';
import "aos/dist/aos.css";

const Rating = () => {
     AOS.init();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reaction, SetReaction] = useState<ReactNode>(
    <p>Please Enter Your Valid Feedback!</p>
  );

  function storage(rating: number) {
    window.localStorage.setItem("rating", rating.toString());
  }
  function Reactions(index: number) {
    switch (index) {
      case 1:
        SetReaction(<p data-aos="fade-right">Poor 😭</p>);
        break
      case 2:
        SetReaction(<p data-aos="fade-right">Not Good 😞</p>);
        break

      case 3:
        SetReaction(<p data-aos="fade-right">Okay 🙂</p>);
        break
      case 4:
        SetReaction(<p data-aos="fade-right">Good 😊</p>);
        break
      case 5:
        SetReaction(<p>Excellent 👍</p>);
        break
      default:
        SetReaction(<p>Please Enter Your Valid Feedback!</p>); 
    }
  }

  return (
    <>
      <div className="star">
        {[1, 2, 3, 4, 5].map((indexs, _) => (
          <button
            key={indexs}
            onClick={() => {
              setRating(indexs);
              storage(indexs);
            }}
            onMouseOver={() => {
              setHover(indexs);
              Reactions(indexs);
            }}
            onMouseLeave={() => {
              setHover(rating);
              SetReaction("");
            }}
          >
            <span
              className={`${
                indexs <= ((rating && hover) || hover) ? "on" : "off"
              }`}
            >
              &#9733;
            </span>
          </button>
        ))}
      </div>
      <div>{reaction}</div>
    </>
  );
};
export default Rating;
