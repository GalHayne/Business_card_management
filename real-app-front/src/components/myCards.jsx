import PageHeader from "./common/pageHeader";
import { useMyCards } from "../hooks/useMyCards";
import Card from "./card";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import usersService from "../services/usersService";
import { Navigate, useNavigate } from "react-router-dom";
import useDarkContext from "../hooks/useDarkModa-context";

const MyCards = () => {

  const [onlyFavorite, setOnlyFavorite] = useState(false);

  const [favoriteCards, setFavoriteCards] = useState([]);

  const { user } = useAuth();

  const cards = useMyCards();

  const { theme } = useDarkContext();

  const navigate = useNavigate();

  useEffect(() => {
    getFavoriteCards();
  }, [onlyFavorite])

  const getFavoriteCards = async () => {
    if (user) {
      const res = usersService.getFavoriteCards(user);
      res.then(response => setFavoriteCards(response.data.favoriteCard))
        .catch(err => { toast.error('server error cant favorite cards') })
    }
  }

  const MoveTofavorite = async (card_id) => {
    try {
      await usersService.addCardFromUserToFavorite(card_id, user._id)
      toast.success(`The card move to favorite`)
      getFavoriteCards();

    } catch (error) {
      toast.error('server error cant move to favorite cards')
    }
  }

  const removeFromfavorite = async (card_id) => {
    try {
      await usersService.removeCardFromFavoriteToUser(card_id, user._id);
      toast.success(`The card remove from favorite`)
      getFavoriteCards();
    } catch (error) {
      toast.error('server error cant remove this card from favorite cards')
    }
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader
        title={!onlyFavorite ? "My Cards" : 'Favorite Cards'}
        description={cards.length ? !onlyFavorite ? "your cards are in the list below" : "your favorite cards are in the list below" : 'Click on Add new card to add new card'}
      />

      <div className="d-flex justify-content-between mb-3" >
        <button type="button" className={`btn btn-primary ${theme}`} onClick={() => navigate('/create-card')} title="Add new card">Add new card</button>
        {!onlyFavorite ? <button disabled={favoriteCards.length === 0} type="button" style={{ minWidth: "5rem", width: "10rem" }} className="btn btn-secondary" onClick={() => setOnlyFavorite((prev) => !prev)}>Favorite cards </button>
          :
          <button type="button" style={{ minWidth: "5rem", width: "10rem" }} className="btn btn-secondary" onClick={() => setOnlyFavorite((prev) => !prev)}>All cards </button>
        }

      </div>


      <div className="d-flex justify-content-center m-3 flex-wrap">
        {!cards.length ? (<p>no cards...</p>)
          : onlyFavorite === false ? (
            cards.map((card) => {
              let isFavoriteCard = false;
              favoriteCards.some(favoriteCard => {
                if (favoriteCard._id === card._id) {
                  isFavoriteCard = true;
                }
              })

              return <Card key={card._id} card={card} isFavoriteCard={isFavoriteCard} MoveTofavorite={MoveTofavorite} removeFromfavorite={removeFromfavorite}
              />
            })
          )
            : (
              favoriteCards.map((card) => {
                let isFavoriteCard = false;
                favoriteCards.some(favoriteCard => {
                  if (favoriteCard._id === card._id) {
                    isFavoriteCard = true;
                  }
                });

                return <Card key={card._id} card={card} isFavoriteCard={isFavoriteCard} MoveTofavorite={MoveTofavorite} removeFromfavorite={removeFromfavorite}
                />
              })
            )
        }
      </div>
    </>
  );
};

export default MyCards;
