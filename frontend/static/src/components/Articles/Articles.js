import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiOutlineSend } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

function Articles() {
  //   const [text, setText] = useState("");
  //   const articleView = articles.map((article) => (
  //     <div className="all-article" key={article.id} value={article.room}>
  //       <Card className="mb-2 article-box">
  //         <Card.Header className="articleheader">
  //           <span className="username">{article.username}</span>
  //           <Button
  //             type="button"
  //             value={article.id}
  //             onClick={() => deleteArticle(article.id)}
  //             className="deletebutton"
  //           >
  //             <FaTrashAlt />
  //           </Button>
  //         </Card.Header>
  //         <Card.Body>
  //           <Card.Text className="articlebody">{article.text}</Card.Text>
  //         </Card.Body>
  //       </Card>
  //     </div>
  //   ));

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     addArticles(text);
  //     setText("");
  //   }
  //   function handleChange(e) {
  //     setText(e.target.value);
  //   }

  return (
    <>
      <div className="articles">
        {/* <div className="articlelist">{articleView}</div> */}
        these will be the articles
      </div>
    </>
  );
}
export default Articles;
