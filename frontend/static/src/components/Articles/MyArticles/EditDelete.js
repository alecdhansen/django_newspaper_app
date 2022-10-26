import { useState } from "react";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import swal from "sweetalert";

function EditDelete({ activeArticle, setActiveArticle, getArticles }) {
  const [isEditing, setEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState({ ...activeArticle });
  const handleError = (err) => {
    console.warn(err);
  };

  const deleteArticle = async () => {
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
    window.scrollTo({ top: 290, behavior: "smooth" });
    getArticles();
    swal({
      text: "Your draft was deleted.",
      icon: "success",
      button: "Close",
    });
  };

  const setEdit = () => {
    setEditing(true);
    setEditedArticle(activeArticle);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditedArticle({ ...activeArticle });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", editedArticle.title);
    formData.append("body", editedArticle.body);
    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(
      `/api_v1/articles/${editedArticle.id}/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
    }
    swal({
      text: "Your updated draft was saved.",
      icon: "success",
      button: "Close",
    });
    setEditing(false);
    setActiveArticle(editedArticle);
    getArticles();
  };

  const submitArticle = async (e) => {
    const formData = new FormData();
    formData.append("title", activeArticle.title);
    formData.append("body", activeArticle.body);
    formData.append("article_process", e.target.value);
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
    }
    swal({
      title: "Success!",
      text: "Your article was submitted for review.",
      icon: "success",
      button: "Close",
    });
    getArticles();
  };

  const previewTemplate = (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          Article Status:
          <span style={{ fontWeight: "800" }}>
            {" "}
            {activeArticle.article_process}
          </span>
        </div>

        <div>
          {activeArticle.article_process == "Drafts" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Button
                variant="danger"
                type="button"
                onClick={() => deleteArticle(activeArticle.id)}
              >
                Delete Draft
              </Button>
              <Button
                style={{ margin: "0px 10px" }}
                type="button"
                variant="warning"
                onClick={() => setEdit()}
              >
                Edit
              </Button>
              <Button
                variant="success"
                type="button"
                value="Submitted"
                onClick={(e) => submitArticle(e)}
              >
                Submit for Publication Approval
              </Button>
            </div>
          ) : (
            ""
          )}
          <h2 className="articletitledisplay">{activeArticle.title}</h2>
          <p>{activeArticle.body}</p>
        </div>
      </div>
    </>
  );

  const editTemplate = (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
        }}
      >
        <Button type="button" variant="danger" onClick={cancelEdit}>
          Cancel
        </Button>
        <Button
          type="button"
          style={{ marginLeft: "10px" }}
          variant="success"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <div className="articledisplaybox">
      <ul style={{ padding: "0px" }}>
        {isEditing ? editTemplate : previewTemplate}{" "}
      </ul>
    </div>
  );
}
export default EditDelete;

// const formData = new FormData();
// formData.append("title", activeArticle.title);
// formData.append("body", activeArticle.body);
// const options = {
//   method: "PATCH",
//   headers: {
//     "X-CSRFToken": Cookies.get("csrftoken"),
//   },
//   body: formData,
// };
// const response = await fetch(
//   `/api_v1/articles/${activeArticle.id}/`,
//   options
// ).catch(handleError);
// if (!response.ok) {
//   throw new Error("Network response was not OK");
// } else {
//   const data = await response.json();
// }
// // setActiveArticle(editedArticle);
// swal({
//   text: "Your updated draft was saved.",
//   icon: "success",
//   button: "Close",
// });
