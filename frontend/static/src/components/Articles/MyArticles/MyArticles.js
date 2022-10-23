import { useEffect, useState } from "react";
import ArticleProgressFilters from "./ArticleProgressFilters";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import PostNewArticle from "./PostNewArticle";

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

    window.scrollTo({ top: 230, behavior: "smooth" });
  };

  const articleListHtml = articles
    .filter((article) =>
      filter ? article.article_process === filter : article
    )
    .map((article) => (
      <li key={article.id} className="myarticles">
        <div style={{ height: "20px" }} className="col-8">
          <button
            className="my-article-titles row-6"
            name={article.title}
            value={article.id}
            key={article.title}
            onClick={() => showArticle(article.id)}
          >
            <div className="my-article-title">
              {article.title} -{" "}
              <span className="progresslabel">{article.article_process}</span>
            </div>
          </button>
        </div>
      </li>
    ));

  return (
    <>
      <main className="col-8 offset-2">
        <div className="row">
          <div className="col-6">
            <ArticleProgressFilters
              setFilter={setFilter}
              filterListHTML={filterListHTML}
              articleListHtml={articleListHtml}
            />
            <PostNewArticle />
          </div>
          <div className="col-6">
            {activeArticle.title}
            {activeArticle.body}
          </div>
        </div>
      </main>
    </>
  );
}
export default MyArticles;
