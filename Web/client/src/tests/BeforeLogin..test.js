import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Homepage from "../components/HomePage";

describe("<Navbar />", () => {
  test("is it all there", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const linkToHome = screen.getByRole("link", { name: /music room/i });
    expect(linkToHome).toBeInTheDocument();
    expect(linkToHome).toHaveAttribute("href", "/");

    const toLogin = screen.getByRole("link", { name: /login/i });
    expect(toLogin).toBeInTheDocument();
    expect(toLogin).toHaveAttribute("href", "/login");

    const toRegister = screen.getByRole("link", { name: /sign up/i });
    expect(toRegister).toBeInTheDocument();
    expect(toRegister).toHaveAttribute("href", "/register");
  });

  test("...and image also", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const image = screen.getByTitle("musicroom");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "kassu2.png");
  });
});

describe("<Homepage />", () => {
  test("whats the slogan?", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const slogan = screen.getByText(/stream music like a/i);
    expect(slogan).toBeInTheDocument();
  });

  test("button to Register page", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const registerButton = screen.getByRole("button");

    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toHaveTextContent(/click here to join/i);
    expect(registerButton).toHaveClass("myButton");

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/register");
  });
});
