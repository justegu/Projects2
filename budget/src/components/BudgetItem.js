import { Form, Link } from "react-router-dom";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../Helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path>
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 119v274h466V119H23zm16 16h434v242H39V135zm72.285 18A64 64 0 0 1 57 207.297v97.418A64 64 0 0 1 111.297 359h289.418A64 64 0 0 1 455 304.703v-97.418A64 64 0 0 1 400.703 153H111.285zM256 176a48 80 0 0 1 48 80 48 80 0 0 1-48 80 48 80 0 0 1-48-80 48 80 0 0 1 48-80zm-9 32v14.057c-5.37 1.576-9.96 4.136-13.766 7.685-6.848 6.386-10.27 15.146-10.27 26.28 0 11.014 3.36 19.744 10.085 26.19 3.86 3.685 8.513 6.305 13.95 7.874V304h18v-12.32c3.475-.23 6.878-.712 10.203-1.463 4.78-1.08 9.392-2.698 13.834-4.858v-33.223h-27.762v11.937h10.873v13.418c-1.264.494-2.698.865-4.302 1.112-1.574.215-3.286.324-5.137.324-6.818 0-12.077-1.99-15.778-5.97-3.702-3.978-5.553-9.624-5.553-16.935 0-7.372 1.91-13.034 5.735-16.982 3.856-3.978 9.333-5.968 16.428-5.968 3.825 0 7.634.542 11.428 1.62 3.826 1.08 7.666 2.716 11.522 4.906v-14.3c-3.732-1.696-7.71-2.975-11.937-3.84-3.077-.632-6.263-1.03-9.555-1.198V208h-18zm-119 32a16 16 0 0 1 16 16 16 16 0 0 1-16 16 16 16 0 0 1-16-16 16 16 0 0 1 16-16zm256 0a16 16 0 0 1 16 16 16 16 0 0 1-16 16 16 16 0 0 1-16-16 16 16 0 0 1 16-16z"></path>
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;
