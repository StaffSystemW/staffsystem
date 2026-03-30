import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import loginPhoto from "../../../assets/login_photo.jpg";

const LoginPage = () => {
  return (
    <div className="login_page">
      <div className="login_container">
        <div className="login_left-side">
          <LoginForm className="login_form" />
          <div className="no-account_group">
            <p>Har du inget konto än?</p>
            <Link to={"/signup"}>Registrera konto</Link>
          </div>
        </div>
        <img src={loginPhoto} />
      </div>
    </div>
  );
};

export default LoginPage;
