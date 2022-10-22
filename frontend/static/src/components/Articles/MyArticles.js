import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function MyArticles({ state }) {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("");
  const [activeArticle, setActiveArticle] = useState([]);
  //   const [activeArticleID, setActiveArticleID] = useState(0);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const progressList = [
    ...new Set(articles.map((article) => article.article_process)),
  ];
  const progressListHTML = progressList.map((article_process, index) => (
    <Button
      className="filterbtns"
      key={index}
      onClick={(e) => setFilter(article_process)}
    >
      {article_process}
    </Button>
  ));

  const showArticle = (id) => {
    const index = articles.findIndex((article) => article.id === id);
    const selectedArticle = articles[index];
    setActiveArticle(selectedArticle);

    window.scrollTo({ top: 230, behavior: "smooth" });
  };

  const getArticles = async (state) => {
    // console.log("here", state.id);
    const response = await fetch(`/api_v1/user/articles/`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setArticles(data);
      setActiveArticle(data[0]);
    }
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
            <div>
              <button
                className="filterbtns all"
                onClick={(e) => setFilter(null)}
              >
                All
              </button>
              {progressListHTML}
            </div>
            <ul style={{ listStyleType: "none", padding: "0px" }}>
              {articleListHtml}
            </ul>
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

{
  /* // .filter((article) => (filter ? article.category === filter : article)) */
}
