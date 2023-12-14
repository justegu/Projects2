import { useContext } from "react";
import { BookContext } from "../contexts/BookContext";

const Navbar = () => {
  const { books } = useContext(BookContext);

  return (
    <div className="navbar">
      <h1>Mano skaitinių sąrašas</h1>
      <p>Šiuo metu turiu {books.length} knygas, kurias noriu paskaityti</p>
    </div>
  );
};

export default Navbar;

// Kitas variantas / sudėtingesnis:
//
// class Navbar extends Component {
//   render() {
//     return (
//       <AuthContext.Consumer>
//         {(authContext) => (
//           <ThemeContext.Consumer>
//             {(themeContext) => {
//               const { isAuthenticated, toggleAuth } = authContext;
//               const { isLigthTheme, light, dark } = themeContext;
//               const theme = isLigthTheme ? light : dark;

//               return (
//                 <nav style={{ backgroundColor: theme.ui, color: theme.syntax }}>
//                   <h1>Context App</h1>
//                   <div onClick={toggleAuth}>
//                     {isAuthenticated ? "Logged in" : "Logged out"}
//                   </div>
//                   <ul>
//                     <li>Home</li>
//                     <li>About</li>
//                     <li>Contact</li>
//                   </ul>
//                 </nav>
//               );
//             }}
//           </ThemeContext.Consumer>
//         )}
//       </AuthContext.Consumer>
//     );
//   }
// }
