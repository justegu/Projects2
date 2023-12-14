import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: blogs,
    isKraunasi,
    error,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isKraunasi && <div>Kraunasi...</div>}
      {blogs && <BlogList blogs={blogs} title={"Visi įrašai"} />}

      {/* <BlogList
        blogs={blogs.filter((blog) => blog.autorius === "Valdemaras")}
        title={"Valdemaro įrašai"}
      /> */}
    </div>
  );
};

export default Home;
