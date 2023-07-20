import "./incription.css";

export default function Inscription() {
  return (
    <div className="login-signup-body">
      <div className="login-signup-main">
        <input className="signup-input" type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label className="signup-label" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input className="signup-input" type="text" name="txt" placeholder="User name" required="" />
            <input className="signup-input" type="email" name="email" placeholder="Email" required="" />
            <input className="signup-input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
            />
            <button className="signup-button">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label className="login-label" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input className="login-input" type="email" name="email" placeholder="Email" required="" />
            <input className="login-input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
            />
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
