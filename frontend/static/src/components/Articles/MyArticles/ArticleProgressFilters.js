function ArticleProgressFilters({
  setFilter,
  filterListHTML,
  articleListHtml,
}) {
  return (
    <>
      <h1>My Articles</h1>
      <div>
        <button className="filterbtns all" onClick={(e) => setFilter(null)}>
          All
        </button>
        {filterListHTML}
      </div>
      <ul style={{ listStyleType: "none", padding: "0px" }}>
        {articleListHtml}
      </ul>
    </>
  );
}
export default ArticleProgressFilters;
