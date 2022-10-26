import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import swal from "sweetalert";

function ReviewArticles() {
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState();

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getSubmittedArticles();
  }, []);

  const getSubmittedArticles = async () => {
    const response = await fetch("/api_v1/admin/articles/submitted/").catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setArticles(data);
    }
  };

  const showSubmittedArticle = (id) => {
    const index = articles.findIndex((article) => article.id == id);
    const selectedArticle = articles[index];
    setActiveArticle(selectedArticle);

    // window.scrollTo({ top: 230, behavior: "smooth" });
  };

  const articleListHtml = articles.map((article) => (
    <div key={article.id} className="myarticles">
      <div className="col-12" style={{ display: "flex" }}>
        <button
          className="my-article-titles row-12 my-article-title"
          name={article.title}
          value={article.id}
          key={article.title}
          onClick={() => showSubmittedArticle(article.id)}
        >
          {article.title} -{" "}
          <span className="authorspan">{article.author_name}</span>{" "}
          <span className="processspan">
            {article.article_process} for review
          </span>
        </button>
      </div>
    </div>
  ));

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("body", activeArticle.body);
    formData.append("title", activeArticle.title);
    formData.append("article_process", e.target.value);
    if (e.target.value == "Published") {
      formData.append("is_published", true);
    }
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
      getSubmittedArticles();
      window.scrollTo({ top: 290, behavior: "smooth" });
      if (e.target.value == "Rejected") {
        swal({
          title: "Confirmed.",
          text: `${activeArticle.title} by ${activeArticle.author_name} was rejected.`,
          icon: "success",
          button: "Close",
        });
      } else if (e.target.value == "Published") {
        swal({
          title: "Success!",
          text: `${activeArticle.title} by ${activeArticle.author_name} was published!`,
          icon: "success",
          button: "Close",
        });
      }
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
        Review for Publication
      </h2>
      <div className="row">
        <ul
          className="col-12 col-md-5"
          style={{ listStyleType: "none", marginBottom: "70px" }}
        >
          <li style={{ fontSize: "30px", textAlign: "center" }}>
            Pending Articles
          </li>
          {articleListHtml}
        </ul>
        <div className="col-12 col-md-6 offset-md-1">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="danger"
              style={{ margin: "0px 3px" }}
              onClick={(e) => handleSubmit(e)}
              value="Rejected"
            >
              Reject
            </Button>
            <Button
              variant="success"
              style={{ margin: "0px 3px" }}
              onClick={(e) => handleSubmit(e)}
              value="Published"
            >
              Publish
            </Button>
          </div>
          <h2 className="articletitledisplay">{activeArticle?.title}</h2>
          <p style={{ marginBottom: "30px" }}> {activeArticle?.body}</p>
        </div>
      </div>
    </div>
  );
}
export default ReviewArticles;
