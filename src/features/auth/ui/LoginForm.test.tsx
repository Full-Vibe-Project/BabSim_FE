import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("초기 렌더링: 로고, 타이틀, 소셜 버튼 2개, 이메일/비밀번호 입력, 로그인 버튼, 보조 링크가 보여야 한다", () => {
    render(<LoginForm />);

    expect(screen.getByText("BabSim")).toBeInTheDocument();
    expect(screen.getByText("Google로 계속하기")).toBeInTheDocument();
    expect(screen.getByText("카카오톡으로 계속하기")).toBeInTheDocument();
    expect(screen.getByLabelText("이메일")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /로그인/ })).toBeInTheDocument();
    expect(screen.getByText("비밀번호를 잊으셨나요?")).toBeInTheDocument();
    expect(screen.getByText("회원가입")).toBeInTheDocument();
  });

  it("버튼 상태: 입력이 비어있을 때 로그인 버튼은 비활성화되어야 한다, 유효한 이메일+비밀번호 입력 시 활성화된다", async () => {
    render(<LoginForm />);
    const loginBtn = screen.getByRole("button", {
      name: /로그인/,
    }) as HTMLButtonElement;
    expect(loginBtn).toBeDisabled();

    await userEvent.type(screen.getByLabelText("이메일"), "invalid-email");
    await userEvent.type(screen.getByLabelText("비밀번호"), "pass");
    expect(loginBtn).toBeDisabled();

    await userEvent.clear(screen.getByLabelText("이메일"));
    await userEvent.type(screen.getByLabelText("이메일"), "test@example.com");
    await userEvent.clear(screen.getByLabelText("비밀번호"));
    await userEvent.type(screen.getByLabelText("비밀번호"), "password123");
    expect(loginBtn).toBeEnabled();
  });

  it("유효성 피드백: 잘못된 이메일/짧은 비밀번호 제출 시 에러가 보인다", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText("이메일"), "bad");
    await userEvent.click(screen.getByRole("button", { name: /로그인/ }));
    expect(
      await screen.findByText("유효한 이메일 형식이 아닙니다.")
    ).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText("이메일"));
    await userEvent.type(screen.getByLabelText("이메일"), "test@example.com");
    await userEvent.clear(screen.getByLabelText("비밀번호"));
    await userEvent.type(screen.getByLabelText("비밀번호"), "123");
    await userEvent.click(screen.getByRole("button", { name: /로그인/ }));
    expect(
      await screen.findByText("비밀번호는 8자 이상이어야 합니다.")
    ).toBeInTheDocument();
  });

  it("엔터키 제출: 비밀번호 입력에서 Enter를 누르면 제출된다 (유효 시)", async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText("이메일"), "test@example.com");
    await userEvent.type(
      screen.getByLabelText("비밀번호"),
      "password123{enter}"
    );
    expect(await screen.findByText("환영합니다!")).toBeInTheDocument();
  });

  it("링크 경로 확인: 비밀번호 찾기 및 회원가입 링크가 올바른 href를 가짐", () => {
    render(<LoginForm />);
    const forgot = screen.getByText("비밀번호를 잊으셨나요?").closest("a");
    const signup = screen.getByText("회원가입").closest("a");
    expect(forgot).toHaveAttribute("href", "/forgot-password");
    expect(signup).toHaveAttribute("href", "/signup");
  });
});
