import Header from "@components/Header";
import { AuthContextProvider } from "@context/AuthContext";
import { act, fireEvent, render, screen } from "@testing-library/react";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  pathname: "/",
}));
describe("Header component", () => {
  it("should render the header component", () => {
    act(() => {
      render(
        <AuthContextProvider>
          <Header />
        </AuthContextProvider>
      );
    });
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });
});
