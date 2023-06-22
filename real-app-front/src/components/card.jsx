import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import useDarkContext from "../hooks/useDarkModa-context";

const Card = ({
  card: {
    _id,
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImage,
    user_id,
  },
  isFavoriteCard,
  MoveTofavorite,
  removeFromfavorite,
}) => {
  const { user } = useAuth();

  const { theme } = useDarkContext();

  const navigate = useNavigate();

  const handleMoveTofavorite = async (card_id) => {
    MoveTofavorite(card_id);
  };

  const handleRemoveFromfavorite = async (card_id) => {
    removeFromfavorite(card_id);
  };

  return (
    <div
      className={`card-desgin m-3 ${theme}`}
      style={{ minWidth: "12rem", width: "20rem" }}
    >
      {!isFavoriteCard ? (
        <div className="d-flex justify-content-between">
          <i
            onClick={() => handleMoveTofavorite(_id)}
            style={{ cursor: "pointer" }}
            className="bi bi-star"
            title="add to favorite card"
          ></i>
          <i
            style={{ cursor: "pointer" }}
            class="bi bi-fullscreen"
            title="open card in full screen"
          ></i>
        </div>
      ) : (
        <div className="d-flex justify-content-between">
          <i
            onClick={() => handleRemoveFromfavorite(_id)}
            style={{ cursor: "pointer" }}
            className="bi bi-star-fill"
            title="remove from favorite cards"
          ></i>
          <i
            style={{ cursor: "pointer" }}
            class="bi bi-fullscreen"
            title="open card in full screen"
          ></i>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <img
          src={bizImage}
          className=" card-img-top my-1 p-1 w-50 rounded-circle"
          alt={bizName}
        />
        <h5 className="card-title">
          {bizName.length > 12 ? bizName.substring(0, 12) + "..." : bizName}
        </h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          <span>Description</span> :{" "}
          {bizDescription.length > 35
            ? bizDescription.substring(0, 35) + "..."
            : bizDescription}
        </p>
        <p className="card-text">
          <span>Adress</span> :
          {bizAddress.length > 35
            ? bizAddress.substring(0, 35) + "..."
            : bizAddress}
        </p>
        <p className="card-text">
          <span>Phone</span> :{" "}
          {bizPhone.length > 35 ? bizPhone.substring(0, 35) + "..." : bizPhone}
        </p>
      </div>
      <hr />
      {user.biz ? (
        <div className="d-flex justify-content-between P-2">
          <button
            className={`btn btn-primary ${theme}`}
            onClick={() => navigate(`/my-cards/edit/${_id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/my-cards/delete/${_id}`)}
          >
            Delete
          </button>
        </div>
      ) : (
        <>
          {user_id === user._id ? (
            <div className="d-flex justify-content-between P-2">
              <button
                className={`btn btn-primary ${theme}`}
                onClick={() => navigate(`/my-cards/edit/${_id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(`/my-cards/delete/${_id}`)}
              >
                Delete
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
