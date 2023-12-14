import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  // paima iš url parametrą
  const { id } = useParams();
  const {
    data: blog,
    error,
    isKraunasi,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => window.history.back());
  };

  return (
    <div className="blog-details">
      {isKraunasi && <div>Kraunasi...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Autorius: {blog.autorius}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Trinti</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
