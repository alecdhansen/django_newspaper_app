import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Cookies from "js-cookie";

function CreateNewArticle() {
  const [state, setState] = useState({
    image: null,
    title: "",
    body: "",
    category: "",
  });

  const handleError = (err) => {
    console.warn(err);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setState({
      ...state,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", state.image);
    formData.append("title", state.title);
    formData.append("body", state.body);
    formData.append("category", state.category);
    formData.append("article_process", e.target.value);
    formData.append("author", 1);
    for (const value of formData.values()) {
      console.log(value);
    }

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch("/api_v1/articles/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setState({
        image: null,
        title: "",
        body: "",
        category: "",
      });
      window.location.reload();
      // window.scrollTo({ top: 290, behavior: "smooth" });
    }
  };
  return (
    <Form>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        Create New Article
      </h2>
      <Form.Control
        style={{ marginBottom: "30px" }}
        type="file"
        className="form-control-file"
        name="image"
        onChange={handleImage}
      />
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Article Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title..."
          name="title"
          value={state.title}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="body">
        <Form.Label>Article Body</Form.Label>
        <textarea
          rows="3"
          className="form-control"
          placeholder="Body..."
          name="body"
          value={state.body}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Choose Category</Form.Label>
        <Form.Select
          name="category"
          value={state.category}
          onChange={handleInput}
        >
          <option value="World">World</option>
          <option value="Sports">Sports</option>
          <option value="Local">Local</option>
        </Form.Select>
      </Form.Group>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Button
          variant="warning"
          type="submit"
          value="Drafts"
          onClick={handleSubmit}
        >
          Save to Drafts
        </Button>
        <Button
          variant="success"
          type="submit"
          value="Submitted"
          onClick={handleSubmit}
        >
          Submit for Publication Approval
        </Button>
      </div>
    </Form>
  );
}
export default CreateNewArticle;
