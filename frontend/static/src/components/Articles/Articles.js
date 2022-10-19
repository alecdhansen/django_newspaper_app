import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { AiOutlineSend } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

function Articles() {
  const [text, setText] = useState("");
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState([]);
  const [filter, setFilter] = useState("");
  const categoryList = [
    ...new Set(articles.map((article) => article.category)),
  ];
  const categoryListHTML = categoryList.map((category, index) => (
    <Button key={index} onClick={(e) => setFilter(category)}>
      {category}
    </Button>
  ));
  //   const [filterCriteria] = useState();

  const handleError = (err) => {
    console.warn(err);
  };

  const showArticle = (id) => {
    const index = articles.findIndex((article) => article.id === id);
    const selectedArticle = articles[index];
    setActiveArticle(selectedArticle);
  };

  // button setsFilterCriteria

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const response = await fetch("/api_v1/articles/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setArticles(data);
    }
  };

  //   const showArticle = async () => {
  //     const response = await fetch("/api_v1/articles/").catch(handleError);
  //     if (!response.ok) {
  //       throw new Error("Network response not OK");
  //     } else {
  //       const data = await response.json();
  //       setArticles(data);
  //     }
  //   };

  // have a filter criteria variable that you use in the .filter call
  // const filteredArticles = articles.filter(article => {{articles that match a certain criteria}})
  // filteredArticles.map()
  const articleListHtml = articles
    .filter((article) => (filter ? article.category === filter : article))
    .map((article) => (
      <button
        name={article.title}
        type="button"
        value={article.id}
        key={article.title}
        onClick={() => showArticle(article.id)}
      >
        {article.title}
      </button>
    ));

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button onClick={(e) => setFilter(null)}>ALL</Button>
        {categoryListHTML}
      </ButtonGroup>
      <div className="articles">
        <div className="articlelist">{articleListHtml}</div>
        <div className="articleview">{activeArticle.body}</div>
      </div>
    </>
  );
}
export default Articles;

//   function handleSubmit(e) {
//     e.preventDefault();
//     addArticles(text);
//     setText("");
//   }
