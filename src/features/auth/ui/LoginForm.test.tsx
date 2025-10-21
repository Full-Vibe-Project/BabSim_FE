//import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
//import LoginForm from "./LoginForm";

describe("LoginForm", () => {
//  // Test Case 1: 성공
//  it("사용자가 유효한 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭하면, 환영 메시지를 보여준다", async () => {
//    // Arrange
//    render(<LoginForm />);

//    // Act
//    await userEvent.type(screen.getByLabelText("이메일"), "test@example.com");
//    await userEvent.type(screen.getByLabelText("비밀번호"), "password123");
//    await userEvent.click(screen.getByRole("button", { name: "로그인" }));

//    // Assert
//    expect(await screen.findByText("환영합니다!")).toBeInTheDocument();
//  });

//  // Test Case 2-1: 실패 (유효성 - 이메일)
//  it("사용자가 유효하지 않은 이메일 형식으로 로그인을 시도하면, 에러 메시지를 보여준다", async () => {
//    // Arrange
//    render(<LoginForm />);

//    // Act
//    await userEvent.type(screen.getByLabelText("이메일"), "test");
//    await userEvent.click(screen.getByRole("button", { name: "로그인" }));

//    // Assert
//    expect(
//      await screen.findByText("유효한 이메일 형식이 아닙니다.")
//    ).toBeInTheDocument();
//  });

//  // Test Case 2-2: 실패 (유효성 - 비밀번호)
//  it("사용자가 8자 미만의 비밀번호로 로그인을 시도하면, 에러 메시지를 보여준다", async () => {
//    // Arrange
//    render(<LoginForm />);

//    // Act
//    await userEvent.type(screen.getByLabelText("비밀번호"), "1234567");
//    await userEvent.click(screen.getByRole("button", { name: "로그인" }));

//    // Assert
//    expect(
//      await screen.findByText("비밀번호는 8자 이상이어야 합니다.")
//    ).toBeInTheDocument();
//  });

//  // Test Case 3: 실패 (인증)
//  it("사용자가 잘못된 자격 증명으로 로그인을 시도하면, 에러 메시지를 보여준다", async () => {
//    // Arrange
//    render(<LoginForm />);
//    // Note: API 모킹이 필요할 수 있습니다. 지금은 실패 케이스를 가정합니다.

//    // Act
//    await userEvent.type(screen.getByLabelText("이메일"), "wrong@example.com");
//    await userEvent.type(screen.getByLabelText("비밀번호"), "wrongpassword");
//    await userEvent.click(screen.getByRole("button", { name: "로그인" }));

//    // Assert
//    expect(
//      await screen.findByText("이메일 또는 비밀번호가 올바르지 않습니다.")
//    ).toBeInTheDocument();
//  });
});