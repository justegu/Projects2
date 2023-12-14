import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  // paima puslapio tolimesnį linko pavadinimą po baseUrl
  const location = useLocation();
  let currentLink = "";

  const breadcrumbsTranslations = {
    home: "Pradinis",
    about: "Apie",
    help: "Pagalba",
    faq: "DUK",
    contact: "Kontaktai",
    careers: "Darbo skelbimai",
  };

  const getTranslation = (slug) => breadcrumbsTranslations[slug] || slug;

  // tada čia splitina, atsirenka ne tuščius ir tada sukuria tokius pačius linkų pav, tam kad būtų galima pernaudoti kitur kaip linkus
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      const translatedText = getTranslation(crumb);

      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{translatedText}</Link>
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
}
