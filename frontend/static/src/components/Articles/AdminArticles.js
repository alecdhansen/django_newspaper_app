import { useState, useEffect } from "react";

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("");

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getSubmittdArticles();
  }, []);

  const getSubmittdArticles = async () => {
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
            // onClick={() => showArticle(article.id)}
          >
            <div className="my-article-title">
              {article.title} -{" "}
              <span className="progresslabel">{article.article_process}</span>
            </div>
          </button>
        </div>
      </li>
    ));

  return <div>{articleListHtml}</div>;
}
export default AdminArticles;
