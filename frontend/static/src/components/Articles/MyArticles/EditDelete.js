import { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Cookies from "js-cookie";

function EditDelete({
  activeArticle,
  setActiveArticle,
  articles,
  setArticles,
}) {
  const [isEditing, setEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState({ ...activeArticle });

  const handleError = (err) => {
    console.warn(err);
  };

  const deleteArticle = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(
      `/api_v1/articles/${activeArticle.id}/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not ok!");
    }
    console.log(response);
    window.location.reload();
  };

  const updateArticle = (updatedArticle) => {
    const index = activeArticle.findIndex(
      (activeArticle) => activeArticle.id === updatedArticle.id
    );
    const updatedactiveArticle = [...activeArticle];
    updatedactiveArticle[index] = updatedArticle;
    setActiveArticle(updatedactiveArticle);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditedArticle({ ...activeArticle });
  };

  const handleSave = () => {
    updateArticle(editedArticle);
    setEditing(false);
  };

  const submitArticle = async (e) => {
    const formData = new FormData();
    console.log(e);
    formData.append("title", activeArticle.title);
    formData.append("body", activeArticle.body);
    formData.append("article_process", e.target.value);
    for (const value of formData.values()) {
      console.log(value);
    }
    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(
      `/api_v1/articles/${activeArticle.id}/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      // setState({
      //   category: "",
      // });
      window.location.reload();
    }
  };

  const previewTemplate = (
    <>
      <div>
        <span style={{ fontWeight: "800" }}>
          {activeArticle.article_process}
        </span>
        {activeArticle.article_process == "Drafts" ? (
          <>
            <Button
              type="button"
              variant="success"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="success"
              type="button"
              onClick={() => deleteArticle(activeArticle.id)}
            >
              Delete Draft
            </Button>
            <Button
              variant="success"
              type="button"
              value="Submitted"
              onClick={(e) => submitArticle(e)}
            >
              Submit for Publication Approval
            </Button>
          </>
        ) : (
          ""
        )}
        <h2>{activeArticle.title}</h2>
        <p>{activeArticle.body}</p>
      </div>
    </>
  );

  const editTemplate = (
    <div>
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={editedArticle.title}
        onChange={(e) =>
          setEditedArticle({
            ...editedArticle,
            [e.target.name]: e.target.value,
          })
        }
      />
      <label>Body</label>
      <textarea
        rows={10}
        cols={40}
        name="body"
        value={editedArticle.body}
        onChange={(e) =>
          setEditedArticle({
            ...editedArticle,
            [e.target.name]: e.target.value,
          })
        }
      />
      <Button type="button" variant="success" onClick={handleSave}>
        Save
      </Button>
      <Button type="button" variant="success" onClick={cancelEdit}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Alert variant="success">
      <ul>{isEditing ? editTemplate : previewTemplate} </ul>
    </Alert>
  );
}
export default EditDelete;
