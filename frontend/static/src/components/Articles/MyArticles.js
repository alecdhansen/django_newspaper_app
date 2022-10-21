import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function MyArticles({ state }) {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("");
  //   const [activeArticle, setActiveArticle] = useState([]);
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

  const getArticles = async (state) => {
    // console.log("here", state.id);
    const response = await fetch(`/api_v1/user/articles/`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setArticles(data);
      //   setActiveArticle(data[0]);
    }
  };

  const articleListHtml = articles
    .filter((article) =>
      filter ? article.article_process === filter : article
    )
    .map((article) => (
      <li key={article.id} className="btnlist row" style={{ height: "150px" }}>
        <div className="col-7 left">
          <button
            className="articlelis row-6"
            name={article.title}
            value={article.id}
            key={article.title}
            // onClick={() => showArticle(article.id)}
          >
            {article.title}
          </button>
          <p className="row-6 author">By {article.author_name}</p>
        </div>
        <div className="col-5 right previewimg">
          <img
            style={{ width: "100%", borderRadius: "2px" }}
            src={article.image}
          />
        </div>
      </li>
    ));

  return (
    <>
      <main className="col-6 offset-3 main">
        <div>{articleListHtml}</div>
        <Button className="filterbtns all" onClick={(e) => setFilter(null)}>
          All
        </Button>
        <div>{progressListHTML}</div>
      </main>
    </>
  );
}
export default MyArticles;

{
  /* // .filter((article) => (filter ? article.category === filter : article)) */
}
