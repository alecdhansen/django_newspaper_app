function ArticleProgressFilters({
  setFilter,
  filterListHTML,
  articleListHtml,
}) {
  return (
    <>
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
