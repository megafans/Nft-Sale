import { Container, Navbar, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, toggleWalletInfo } from "redux/auth/authSlice";
import { useWeb3React } from "@web3-react/core";
import { AiOutlineRight } from "react-icons/ai";

import styles from "./header.module.css";

const Header = () => {
  const { auth } = useSelector((state) => state);
  const { deactivate } = useWeb3React();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOutUser = (e) => {
    dispatch(logoutUser());
    dispatch(toggleWalletInfo(null));
    deactivate();
    navigate("/");
  };

  const SocialHeader = () => (
    <div className={styles.socialHeader}>
      <a href="#" className={styles.socialLink}>
        <img
          src="/assets/images/social/instagram.png"
          alt="Insta"
          className={styles.socialIcon}
        />
      </a>
      <a href="#" className={styles.socialLink}>
        <img
          src="/assets/images/social/discord.png"
          alt="Discord"
          className={styles.socialIcon}
        />
      </a>
      <a href="#" className={styles.socialLink}>
        <img
          src="/assets/images/social/facebook.png"
          alt="Facebook"
          className={styles.socialIcon}
        />
      </a>
      <a href="#" className={styles.socialLink}>
        <img
          src="/assets/images/social/twitter.png"
          alt="Twitter"
          className={styles.socialIcon}
        />
      </a>
      <a href="#" className={styles.socialLink}>
        <img
          src="/assets/images/social/telegram.png"
          alt="Telegram"
          className={styles.socialIcon}
        />
      </a>
    </div>
  );

  return (
    <Navbar expand="lg" className="header">
      <Container>
        <Link to="/" className="navLogo">
          <img src="/assets/svgs/logo.svg" alt="Logo" />
        </Link>
        <div className={styles.socialContainer}>
          <SocialHeader />
          {!auth?.isLoggedIn ? (
            <div className="homeBtnsDiv">
              <Link to="/sign-up">
                Login
                <span>
                  <AiOutlineRight />
                </span>
              </Link>
            </div>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                className="bg-transparent profileDropDownBtn userDroDown"
                id="dropdown-basic"
              >
                {auth?.user?.image ? (
                  <img src={auth?.user?.image} alt="User Profile" />
                ) : (
                  <Avatar name={auth?.user?.username} size={30} />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="profileDropDownDiv DBlock">
                  <Link to="/profile">Profile</Link>
                  <hr />
                  <button
                    onClick={signOutUser}
                    type="button"
                    className="logoutBtn"
                  >
                    Logout
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
