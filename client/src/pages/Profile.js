import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/profile.css";
import $ from "jquery";

function Profile({ setTest }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [user] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [purchaseResume, setPurchaseResume] = useState();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    $(".nave ul li").on("click", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
    const tab = document.querySelectorAll(".tab");
    const tabs = (activeTab) => {
      tab.forEach(function (node) {
        node.style.display = "none";
      });
      tab[activeTab].style.display = "block";
    };
    tabs(activeTab);

    const fetchPurchasesData = async () => {
      const purchasesResponse = await axios.get(
        `http://127.0.0.1:8000/purchases/`
      );

      const purchases = purchasesResponse.data.filter(
        (purchase) => purchase.userId === parseInt(user.id)
      );

      const updatedSeances = await Promise.all(
        purchases.map(async (seance) => {
          const sessionsResponse = await axios.get(
            `http://127.0.0.1:8000/sessions/${seance.sessionId}`
          );
          const movieResponse = await axios.get(
            `http://127.0.0.1:8000/movies/${sessionsResponse.data.filmId}`
          );

          const pricesResponse = await axios.get(
            `http://127.0.0.1:8000/prices/${seance.priceId}`
          );

          return {
            sessions: sessionsResponse.data,
            movies: movieResponse.data,
            price: pricesResponse.data,
          };
        })
      );
      setPurchaseResume(updatedSeances);
    };
    fetchPurchasesData();
  }, []);
  console.log(purchaseResume);

  const deleteAccount = async () => {
    try {
      // TODO: Route de suppression
      // await axios.delete(`http://127.0.0.1:8000/${user.id}`);

      localStorage.removeItem("userInfo");
      setTest(localStorage.getItem("userInfo"));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="account-body">
      <div className="profile-header">
        <div className="profile-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            style={{ width: "200" }}
            alt=""
          />
        </div>
        <div className="profile-nav-info">
          <h3 className="user-name">{user.username}</h3>
          <div className="address">
            <p id="state" className="state">
              {user.first_name}
            </p>
            <span id="country" className="country">
              {user.last_name}
            </span>
          </div>
        </div>
        <div className="profile-nav-button">
          <button className="delete-button" onClick={deleteAccount}>Supprimer le compte</button>
        </div>
      </div>

      <div className="main-bd">
        <div className="left-side">
          <div className="profile-side">
            <p className="user-mail">
              <i className="ri-mail-line"></i> {user.email}
            </p>
          </div>
        </div>
        <div className="right-side">
          <div className="nave">
            <ul>
              <li
                onClick={() => handleTabClick(0)}
                className="user-post active"
              >
                Qrcode
              </li>
              <li onClick={() => handleTabClick(1)} className="user-review">
                Historique
              </li>
            </ul>
          </div>
          <div className="profile-body">
            <div className="profile-posts tab">
              <h1>QRCODE</h1>
              <p>why not</p>
            </div>
            <div className="profile-reviews tab">
              <h1>Historiques achat</h1>
              <table></table>

              <p>histo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
