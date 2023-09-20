import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

import Navbar from "../components/common/Navbar";
import Homepage from "../components/HomePage";
import Register from "../components/Register";
// import userService from "../services/userService";

// const axiosMock = new MockAdapter(axios);

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

  test("header test", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const header = screen.queryByText("Music Room");
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe("DIV");

    const diibadaaba = screen.queryByText(/dubbiduu/);
    expect(diibadaaba).not.toBeInTheDocument();
  });
});

describe("<Register />", () => {
  test("header and link", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const header = screen.queryByText(/register here/i);
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe("H2");

    const login = screen.queryByText(/log in/i);
    expect(login).toBeInTheDocument();
    expect(login).toHaveAttribute("href", "/login");
  });

  test("email and username fields error messages", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    // email
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const errorMessage = screen.queryByText(/Use a valid email, thanks./i);

    act(() => {
      emailInput.focus();
    });

    expect(errorMessage).not.toBeInTheDocument();

    act(() => {
      userEvent.type(emailInput, "a");
    });

    const errorMessage2 = screen.queryByText(/Use a valid email, thanks./i);
    expect(errorMessage2).toBeInTheDocument();

    // username
    const userInput = screen.getByPlaceholderText(/username/i);
    expect(userInput).toBeInTheDocument();

    const errMsg = screen.queryByText(/alphanumeric/i);
    expect(errMsg).not.toBeInTheDocument();

    act(() => {
      userEvent.type(userInput, "%");
    });

    const errMsg2 = screen.queryByText(/alphanumeric/i);
    expect(errMsg2).toBeInTheDocument();
  });

  test("age field", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const ageInput = screen.getByPlaceholderText(/age/i);
    expect(ageInput).toBeInTheDocument();

    const errMsg1 = screen.queryByText(/too old/i);
    const errMsg2 = screen.queryByText(/that is not a number/i);

    expect(errMsg1).not.toBeInTheDocument();
    expect(errMsg2).not.toBeInTheDocument();

    act(() => {
      userEvent.type(ageInput, "333");
    });

    const errMsg11 = screen.queryByText(/too old/i);
    expect(errMsg11).toBeInTheDocument();

    act(() => {
      userEvent.clear(ageInput);
      userEvent.type(ageInput, "33");
    });

    const errMsg111 = screen.queryByText(/too old/i);
    expect(errMsg111).not.toBeInTheDocument();

    act(() => {
      userEvent.type(ageInput, "3f");
    });

    const errMsg22 = screen.queryByText(/that is not a number/i);
    expect(errMsg22).toBeInTheDocument();
  });

  test("Whats your gender?", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const genderSelect = screen.getByLabelText(/gender/i);
    expect(genderSelect).not.toHaveValue("Male");

    act(() => {
      fireEvent.change(genderSelect, { target: { value: "Male" } });
    });

    const updatedGender = screen.getByDisplayValue("Male");
    expect(updatedGender).toBeInTheDocument();
    expect(updatedGender).toHaveValue("Male");
  });

  test("all about password", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const pw1 = screen.getByPlaceholderText("password...");
    const pw2 = screen.getByPlaceholderText("password again...");
    expect(pw1).toBeInTheDocument();
    expect(pw2).toBeInTheDocument();

    const pw1err1 = screen.queryByText(/one uppercase/i);
    expect(pw1err1).not.toBeInTheDocument();

    act(() => {
      userEvent.type(pw1, "help");
    });

    const pw1err2 = screen.queryByText(/one uppercase/i);
    expect(pw1err2).toBeInTheDocument();

    const pw2err1 = screen.queryByText(/passwords doesn't match/i);
    expect(pw2err1).not.toBeInTheDocument();

    act(() => {
      userEvent.type(pw2, "hel");
    });

    const pw2err2 = screen.queryByText(/passwords doesn't match/i);
    expect(pw2err2).toBeInTheDocument();

    act(() => {
      userEvent.type(pw2, "p");
    });

    const pw2err3 = screen.queryByText(/passwords doesn't match/i);
    expect(pw2err3).not.toBeInTheDocument();
  });
});
