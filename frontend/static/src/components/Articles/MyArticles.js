import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function MyArticles({ user }) {
  const [articles, setArticles] = useState([]);
  //   const [activeArticle, setActiveArticle] = useState([]);
  //   const [filter, setFilter] = useState("");
  //   const [activeArticleID, setActiveArticleID] = useState(0);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async (user) => {
    console.log("here", user.id);
    const response = await fetch(`/api_v1/articles/${user.id}/articles`).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setArticles(data);
      //   setActiveArticle(data[0]);
    }
  };

  return <div>{articles}</div>;
}
export default MyArticles;
