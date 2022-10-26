import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ReviewArticles from "./ReviewArticles";
import ArchiveArticles from "./ArchiveArticles";

function AdminHub() {
  const [page, setPage] = useState("a");

  let content;
  if (page == "a") {
    content = <ReviewArticles />;
  } else if (page == "b") {
    content = <ArchiveArticles setPage={setPage} />;
  }

  return (
    <>
      <main className="col-10 offset-1 col-md-10 offset-md-1">
        <div className="buttongroup">
          <ButtonGroup aria-label="Basic example">
            <Button
              type="button"
              variant="warning"
              onClick={() => setPage("a")}
            >
              Review Articles for Publication
            </Button>
            <Button variant="info" type="button" onClick={() => setPage("b")}>
              Archive Articles
            </Button>
          </ButtonGroup>
        </div>
        <div className="spacerbar"></div>
        {content}
      </main>
    </>
  );
}
export default AdminHub;
