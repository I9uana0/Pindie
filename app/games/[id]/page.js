'use client'
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { GameNotFound } from "@/app/components/GameNotFound/GameNotFound";
import Styles from "./Game.module.css";
import { Overlay } from "@/app/components/Overlay/Overlay"
import { Popup } from "@/app/components/Popup/Popup"
import { AuthForm } from "@/app/components/AuthForm/AuthForm"
import { getJWT, removeJWT, getMe, getNormalizedGameDataById, isResponseOk } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { checkIfUserVoted } from "@/app/api/api-utils"
import { handleVote } from "@/app/api/api-utils";
import { vote } from "@/app/api/api-utils";


export default function GamePage(props) {

  const [game, setGame] = useState(null)
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isVoted, setIsVoted] = useState(false)

  const roter = useRouter();

  const openPopup = (popupIsOpened) => {
    setPopupIsOpened(true);
  }

  const closePopup = () => {
    setPopupIsOpened(false);
  }

  useEffect(() => {
    async function fetchData() {
      const game = await getNormalizedGameDataById(
        endpoints.games,
        props.params.id
      );
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const jwt = getJWT();
    if (jwt) {
      getMe(endpoints.me, jwt).then((userData) => {
        if (isResponseOk(userData)) {
          setIsAuthorized(true);
          setCurrentUser(userData);
        } else {
          setIsAuthorized(false);
          removeJWT();
        }
      });
    }
  }, []);

  useEffect(() => {
    if (currentUser && game) {
      setIsVoted(checkIfUserVoted(game, currentUser.id));
    } else {
      setIsVoted(false);
    }
  }, [currentUser, game])


  const handleVote = async () => {
    const jwt = getJWT();
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(currentUser.id);
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
    if (isResponseOk(response)) {
      setIsVoted(true);
      setGame(() => {
        return {
          ...game,
          users: [...game.users, currentUser],
        };
      });
    }
  };

  return game ? (
    <main>
      <section className={Styles['game']}>
        <iframe className={Styles['game__iframe']} src={game.link}></iframe>
      </section>
      <section className={Styles['about']}>
        <h2 className={Styles['about__title']}>{game.title}</h2>
        <div className={Styles['about__content']}>
          <p className={Styles["about__description"]}>{game.description}</p>
          <div className={Styles["about__author"]}>
            <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
          </div>
        </div>
        <div className={Styles["about__vote"]}>
          <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: <span className={Styles["about__accent"]}>{game.users.length}</span></p>
          <button className={`button ${Styles["about__vote-button"]}`} disabled={!isAuthorized || isVoted} onClick={handleVote}>{isVoted ? "Голос учтён" : "Голосовать"}</button>
        </div>
      </section>
      <Overlay isOpened={popupIsOpened} closePopup={closePopup} />
      <Popup isOpened={popupIsOpened} closePopup={closePopup}>
        <AuthForm />
      </Popup>
    </main>
  ) : preloaderVisible ? (
    <Preloader />
  ) : (
    <main className="main">
      <GameNotFound />
    </main >
  )
}