import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import moment from "moment";

function Articles() {
  const [text, setText] = useState("");
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState([]);
  const [filter, setFilter] = useState("");

  const categoryList = [
    ...new Set(articles.map((article) => article.category)),
  ];
  const categoryListHTML = categoryList.map((category, index) => (
    <Button
      className="filterbtns"
      key={index}
      onClick={(e) => setFilter(category)}
    >
      {category}
    </Button>
  ));

  const handleError = (err) => {
    console.warn(err);
  };

  const showArticle = (id) => {
    const index = articles.findIndex((article) => article.id === id);
    const selectedArticle = articles[index];
    setActiveArticle(selectedArticle);

    window.scrollTo({ top: 230, behavior: "smooth" });
  };

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const response = await fetch("/api_v1/articles/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      const publishedArticles = data.filter((obj) => obj.is_published == true);
      setArticles(publishedArticles);
      console.log("here", publishedArticles);
      setActiveArticle(publishedArticles[0]);
    }
  };

  const articleListHtml = articles
    .filter((article) => (filter ? article.category === filter : article))
    .map((article) => (
      <li key={article.id} className="btnlist row" style={{ height: "150px" }}>
        <div className="col-7 left">
          <button
            className="articlelis row-6"
            name={article.title}
            value={article.id}
            key={article.title}
            onClick={() => showArticle(article.id)}
          >
            {article.title}
          </button>
          <p className="row-6 author">By {article.author_name}</p>
        </div>
        <div className="col-5 right previewimg">
          <img
            style={{
              width: "100%",
              borderRadius: "2px",
              maxHeight: "91px",
            }}
            src={article.image}
          />
        </div>
      </li>
    ));

  return (
    <>
      <main className="col-10 offset-1 main">
        <div className="articles row">
          <div className="articleview col-12 col-md-6">
            <img
              style={{ width: "100%", borderRadius: "2px" }}
              src={activeArticle.image}
            />
            <h2
              className="bodytext"
              style={{
                fontFamily: "Newsreader, serif",
                textAlign: "center",
                marginTop: "30px",
                fontSize: "40px",
              }}
            >
              {activeArticle.title}
            </h2>
            <p style={{ textAlign: "center", fontStyle: "italic" }}>
              {activeArticle.category}
            </p>
            <p
              className="author"
              style={{ textAlign: "center", fontSize: "16px", padding: "0px" }}
            >
              By {activeArticle.author_name} -{" "}
              <span style={{ fontWeight: "400" }}>
                {moment(activeArticle.created_at).format("MMMM Do, YYYY")}
              </span>
            </p>

            <div
              className="bodytext"
              style={{ marginTop: "40px", textAlign: "justify" }}
            >
              {activeArticle.body}
            </div>
          </div>
          <div
            className="col-1"
            style={{ borderRight: "0.5px solid rgb(182, 182, 182)" }}
          ></div>
          <div className="articleul col-12 col-md-3 offset-md-1">
            <div className="filters">
              <div className="filters2">
                <Button
                  className="filterbtns all"
                  onClick={(e) => setFilter(null)}
                >
                  All
                </Button>

                {categoryListHTML}
              </div>
            </div>
            <ul style={{ padding: "0px" }}>{articleListHtml}</ul>
          </div>
        </div>
      </main>
    </>
  );
}
export default Articles;
