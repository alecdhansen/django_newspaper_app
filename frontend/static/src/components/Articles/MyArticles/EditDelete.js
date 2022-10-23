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

  const previewTemplate = (
    <>
    <li>
      <h2>{activeArticle.title}</h2>
      <p>{activeArticle.body}</p>
      { activeArticle.article_progress == "Draft" ? (<Button type="button" variant="success" onClick={() => setEditing(true)}>
        Edit
      </Button>
      <Button
        variant="success"
        type="button"
        onClick={() => deleteArticle(activeArticle.id)}
      >
        Delete
      </Button>) : ('')}
    </li>
    </>
  );

  const editTemplate = (
    <li>
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
    </li>
  );

  return (
    <Alert variant="success">
      <ul>{isEditing ? editTemplate : previewTemplate} </ul>
    </Alert>
  );
}
export default EditDelete;
