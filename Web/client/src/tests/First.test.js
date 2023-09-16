import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Homepage from "../components/HomePage";

describe("<Homepage /> stuff", () => {
  test("whats the slogan?", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const slogan = screen.getByText(/stream music like a/i);
    expect(slogan).toBeInTheDocument();
  });
});
