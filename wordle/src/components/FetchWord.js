import { useState, useEffect } from "react";
import axios from "axios";
import Wordle from "./Wordle";

const FetchWord = () => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://wordle-game-api1.p.rapidapi.com/word",
        headers: {
          "X-RapidAPI-Key":
            "03f7e33079msh03b007e1e93bcc8p1782edjsn4ad368bbb537",
          "X-RapidAPI-Host": "wordle-game-api1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setSolution(response.data.word);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <div>{solution && <Wordle solution={solution} />}</div>;
};

export default FetchWord;
