import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ProfileForm() {
  const [profile, setProfile] = useState({ avatar: null });
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    console.dir(e.target);
    const file = e.target.files[0];
    setProfile({ ...profile, avatar: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", profile.avatar);
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/profiles/", options);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="col-2 offset-5">
      <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
        Upload a Profile Image Below
      </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          style={{ marginBottom: "30px" }}
          type="file"
          name="avatar"
          onChange={handleImage}
        />
        {profile.avatar && <img src={preview} alt="" />}
        <Button
          style={{ marginBottom: "180px" }}
          type="submit"
          className="submitbtn0"
        >
          Save
        </Button>
      </Form>
    </div>
  );
}
export default ProfileForm;
