import Button from "react-bootstrap/Button";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useState } from "react";

function LoadPage({ setIsAuth, setState, setIsEditor }) {
  const [modalShow, setModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);
  return (
    <div className="preload">
      <div className="loadpage">
        <h2>Already a member?</h2>
        <Button className="bn" type="submit" onClick={() => setModalShow(true)}>
          Login
        </Button>
        <LoginForm
          show={modalShow}
          onHide={() => setModalShow(false)}
          setIsAuth={setIsAuth}
          setState={setState}
          setIsEditor={setIsEditor}
        />

        <h2>Sign Me Up!</h2>
        <Button
          className="bn"
          type="submit"
          onClick={() => setRegisterModalShow(true)}
        >
          Register
        </Button>
        <RegistrationForm
          show={registerModalShow}
          onHide={() => setRegisterModalShow(false)}
          setIsAuth={setIsAuth}
          setState={setState}
        />
      </div>
    </div>
  );
}
export default LoadPage;
