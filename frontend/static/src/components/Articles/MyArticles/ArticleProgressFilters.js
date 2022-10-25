import Button from "react-bootstrap/Button";

function ArticleProgressFilters({
  setFilter,
  filterListHTML,
  articleListHtml,
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "50px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
        <Button className="filterbtns all" onClick={(e) => setFilter(null)}>
          All
        </Button>
        {filterListHTML}
      </div>
      <ul
        className="myarticlelist"
        style={{ listStyleType: "none", padding: "0px" }}
      >
        {articleListHtml}
      </ul>
    </div>
  );
}
export default ArticleProgressFilters;
