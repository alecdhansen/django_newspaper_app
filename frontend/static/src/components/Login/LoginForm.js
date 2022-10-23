import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const { setIsAuth, setState, setIsEditor } = props;
  const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    const value = e.target.value;
    setUser((prevState) => ({ ...prevState, username: value }));
  };

  const handlePasswordInput = (e) => {
    const value = e.target.value;
    setUser((prevState) => ({ ...prevState, password: value }));
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const handleSubmit = async (e, state) => {
    // debugger;
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };

    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Uh oh. Something went wrong. Check your network tab!");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      await setIsAuth(true);
      setState(data);
      if (data.is_superuser == true) {
        setIsEditor(true);
      }
      sessionStorage.setItem("state", JSON.stringify(data));
      navigate("/");
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 labelwrap0" controlId="username">
              <Form.Label className="label0">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={user.username}
                onChange={handleUsernameInput}
                name="username"
                className="input0"
              />
            </Form.Group>

            <Form.Group className="mb-3 labelwrap0" controlId="password">
              <Form.Label className="label0">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password..."
                value={user.password}
                onChange={handlePasswordInput}
                name="password"
                className="input0"
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" type="submit" className="submitbtn0">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default LoginForm;
