import { useEffect, useState } from "react";
import ArticleProgressFilters from "./ArticleProgressFilters";
import Button from "react-bootstrap/Button";
import EditDelete from "./EditDelete";
import CreateNewArticle from "./CreateNewArticle";

function MyArticles({ state }) {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("");
  const [activeArticle, setActiveArticle] = useState([]);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const filterList = [
    ...new Set(articles.map((article) => article.article_process)),
  ];
  const filterListHTML = filterList.map((article_process, index) => (
    <Button
      className="filterbtns"
      key={index}
      onClick={(e) => setFilter(article_process)}
    >
      {article_process}
    </Button>
  ));

  const getArticles = async (state) => {
    const response = await fetch(`/api_v1/user/articles/`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setArticles(data);
      setActiveArticle(data[0]);
    }
  };

  const showArticle = (id) => {
    const index = articles.findIndex((article) => article.id === id);
    const selectedArticle = articles[index];
    setActiveArticle(selectedArticle);

    window.scrollTo({ top: 290, behavior: "smooth" });
  };

  const articleListHtml = articles
    .filter((article) =>
      filter ? article.article_process === filter : article
    )
    .map((article) => (
      <li key={article.id} className="myarticles">
        <div style={{ height: "20px" }} className="col-12">
          <button
            className="my-article-titles"
            name={article.title}
            value={article.id}
            key={article.title}
            onClick={() => showArticle(article.id)}
          >
            {article.title}
          </button>
          - <span className="progresslabel">{article.article_process}</span>
        </div>
      </li>
    ));

  return (
    <>
      <main className="col-10 offset-1 col-md-10 offset-md-1">
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginBottom: "50px",
          }}
        >
          My Articles
        </h1>
        <div className="row">
          <div
            className="col-12 col-md-5"
            // style={{ display: "flex", justifyContent: "center" }}
          >
            <ArticleProgressFilters
              setFilter={setFilter}
              filterListHTML={filterListHTML}
              articleListHtml={articleListHtml}
            />
            <CreateNewArticle />
          </div>
          <div className="col-12 col-md-6 offset-md-1">
            <EditDelete
              activeArticle={activeArticle}
              setActiveArticle={setActiveArticle}
              articles={articles}
              setArticles={setArticles}
            />
          </div>
        </div>
      </main>
    </>
  );
}
export default MyArticles;
