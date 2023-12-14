import { useLoaderData, useParams } from "react-router-dom";

export default function CareerDetails() {
  const { id } = useParams();
  const career = useLoaderData();

  return (
    <div className="career-details">
      <h2>Darbo pasiūlymai - {career.title}</h2>
      <p>Atlyginimas: nuo {career.salary} eur</p>
      <p>Veitovė: {career.location}</p>
      <div className="details">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
          obcaecati optio perferendis qui quam quis recusandae harum, aut odio,
          ratione in distinctio laborum provident nulla libero, totam adipisci
          minima repudiandae?
        </p>
      </div>
    </div>
  );
}

export const careerDetailsLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch("http://localhost:4000/careers/" + id);

  if (!res.ok) {
    throw Error("Neradome šio darbo pasiūlymo");
  }

  return res.json();
};
