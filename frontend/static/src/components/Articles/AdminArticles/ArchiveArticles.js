import Button from "react-bootstrap/Button";
import moment from "moment";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import swal from "sweetalert";

function ArchiveArticles(setPage) {
  const [show, setShow] = useState(false);
  const [articles, setArticles] = useState([]);
  const [archivedArticles, setArchivedArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState([]);

  const handleError = (err) => {
    console.warn(err);
  };

  const handleShow = (e) => {
    setShow(true);
    const selectedArticles = articles.filter(
      (article) => article.id == e.target.value
    );
    setActiveArticle(selectedArticles[0]);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getPublishedArticles();
    getArchivedArticles();
  }, []);

  const getPublishedArticles = async () => {
    const response = await fetch("/api_v1/articles/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      const publishedArticles = data.filter((obj) => obj.is_published == true);
      setArticles(publishedArticles);
      console.log("Published articles list -->", publishedArticles);
    }
  };

  const articleListHtml = articles.map((article) => (
    <div key={article.id} className="myarticles">
      <div className="spacerbar2"></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontStyle: "italic", fontSize: "20px" }}>
          {article.title}
        </h2>
        <span className="authorspan">{article.author_name}</span>
        {moment(article.created_at).format("MMMM Do, YYYY")}
        <Button
          name={article.title}
          value={article.id}
          key={article.title}
          style={{ width: "30%", marginTop: "10px" }}
          onClick={handleShow}
          variant="info"
        >
          Archive
        </Button>
      </div>
    </div>
  ));

  const getArchivedArticles = async () => {
    const response = await fetch("/api_v1/articles/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      const newArchivedArticles = data.filter(
        (obj) => obj.article_process == "Archived"
      );
      setArchivedArticles(newArchivedArticles);
      console.log("Published articles list -->", archivedArticles);
    }
  };

  const archivedArticlesListHtml = archivedArticles.map((article) => (
    <div key={article.id} className="myarticles">
      <div className="spacerbar2"></div>
      <div className="archivedarticles">
        <h2 style={{ fontStyle: "italic", fontSize: "20px" }}>
          {article.title}
        </h2>
        <span className="authorspan">{article.author_name}</span>
        {moment(article.created_at).format("MMMM Do, YYYY")}
      </div>
    </div>
  ));

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("body", activeArticle.body);
    formData.append("title", activeArticle.title);
    formData.append("article_process", e.target.value);
    formData.append("is_published", false);

    console.log(activeArticle.id);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(
      `/api_v1/admin/articles/submitted/${activeArticle.id}/`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setShow(false);
      getPublishedArticles();
      getArchivedArticles();
      swal({
        title: "Success!",
        text: `${activeArticle.title} by ${activeArticle.author_name} was sent to the archives.`,
        icon: "success",
        button: "Close",
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "50px",
        }}
      >
        Archive Articles
      </h2>
      <div className="row">
        <ul className="col-12 col-md-6 aaa1">
          <li style={{ fontSize: "26px", textAlign: "center" }}>
            Currently Published Articles
          </li>
          {articleListHtml}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>Are you sure you want to archive?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Go Back
              </Button>
              <Button variant="info" value="Archived" onClick={handleSubmit}>
                Yes, Archive
              </Button>
            </Modal.Footer>
          </Modal>
        </ul>

        <ul className="col-12 col-md-6 aaa2">
          <li style={{ fontSize: "26px", textAlign: "center" }}>
            Currently Archived Articles
          </li>
          {archivedArticlesListHtml}
        </ul>
      </div>
    </div>
  );
}
export default ArchiveArticles;
