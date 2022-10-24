import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

function AdminArticles() {
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
      console.log(data);
      setArticles(data);
    }
  };

  const showSubmittedArticle = (id) => {
    const index = articles.findIndex((article) => article.id === id);
    const selectedArticle = articles[index];
    setActiveArticle(selectedArticle);

    // window.scrollTo({ top: 230, behavior: "smooth" });
  };

  const articleListHtml = articles
    // .filter((article) =>
    //   filter ? article.article_process.drafts === filter : article
    // )
    .map((article) => (
      <li key={article.id} className="myarticles">
        <div style={{ height: "20px" }} className="col-8">
          <button
            className="my-article-titles row-6"
            name={article.title}
            value={article.id}
            key={article.title}
            onClick={() => showSubmittedArticle(article.id)}
          >
            <div className="my-article-title">
              {article.title} -{" "}
              <span className="progresslabel">{article.article_process}</span>
            </div>
          </button>
        </div>
      </li>
    ));

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("body", activeArticle.body);
    formData.append("title", activeArticle.title);
    formData.append("article_process", e.target.value);
    if (e.target.value === "Published") {
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
      console.log(data);
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>{articleListHtml}</div>
      <div style={{ width: "50%" }}>
        <Button onClick={(e) => handleSubmit(e)} value="Rejected">
          Reject
        </Button>
        <Button onClick={(e) => handleSubmit(e)} value="Published">
          Publish
        </Button>
        {activeArticle?.title}
        {activeArticle?.body}
      </div>
    </div>
  );
}
export default AdminArticles;
