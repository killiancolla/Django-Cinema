import { useEffect, useState } from "react";
import "../style/profile.css";
import $ from "jquery";

function Profile() {
  const [activeTab, setActiveTab] = useState(0);

  const [user] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  console.log(user);
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
  });

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
      </div>

      <div className="main-bd">
        <div className="left-side">
          <div className="profile-side">
            <p className="user-mail">
              <i className="fa fa-envelope"></i> {user.email}
            </p>
            <div className="user-bio">
              <h3>Bio</h3>
              <p className="bio">
                Lorem ipsum dolor sit amet, hello how consectetur adipisicing
                elit.
              </p>
            </div>
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
              <p>histo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
