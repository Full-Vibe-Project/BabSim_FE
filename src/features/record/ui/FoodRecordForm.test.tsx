import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FoodRecordForm from "./FoodRecordForm";

describe("FoodRecordForm", () => {
  // Mock File object
  const mockFile = new File(["(⌐□_□)"], "food.png", { type: "image/png" });

  // Test Case 1: 성공 (이미지 업로드)
  it("사용자가 이미지를 업로드하면, AI 분석 결과(음식명, 칼로리)가 화면에 표시된다", async () => {
    // Arrange
    render(<FoodRecordForm />);
    // API 모킹: 이미지 업로드 시 예상 결과 반환
    // mockUploadAPI.mockResolvedValue({ name: '김치찌개', calories: 500 });

    // Act
    const fileInput = screen.getByLabelText("음식 사진 업로드");
    await userEvent.upload(fileInput, mockFile);

    // Assert
    expect(await screen.findByDisplayValue("김치찌개")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("500")).toBeInTheDocument();
  });

  // Test Case 2: 성공 (결과 수정)
  it("사용자가 AI 분석 결과를 직접 수정하고 저장 버튼을 누를 수 있다", async () => {
    // Arrange
    render(<FoodRecordForm />);
    const fileInput = screen.getByLabelText("음식 사진 업로드");
    await userEvent.upload(fileInput, mockFile);

    const foodNameInput = await screen.findByDisplayValue("김치찌개");
    const saveButton = screen.getByRole("button", { name: "저장" });

    // Act
    await userEvent.clear(foodNameInput);
    await userEvent.type(foodNameInput, "된장찌개");
    await userEvent.click(saveButton);

    // Assert
    // 저장 후의 동작 검증 (예: 성공 메시지)
    expect(await screen.findByText("저장되었습니다")).toBeInTheDocument();
  });

  // Test Case 3: 성공 (저장 완료)
  it("저장 버튼을 클릭하면, 해당 날짜의 식단 목록에 새로운 기록이 추가된다", async () => {
    // Arrange
    render(<FoodRecordForm />);
    const fileInput = screen.getByLabelText("음식 사진 업로드");
    await userEvent.upload(fileInput, mockFile);

    // Act
    await userEvent.click(screen.getByRole("button", { name: "저장" }));

    // Assert
    // 이 테스트는 FoodRecordForm과 식단 목록(Timeline) 컴포넌트의 통합 테스트에 더 가깝습니다.
    // 우선은 저장 성공 메시지로 대체합니다.
    expect(await screen.findByText("저장되었습니다")).toBeInTheDocument();
    // 추후: expect(within(screen.getByTestId('daily-timeline')).getByText('김치찌개')).toBeInTheDocument();
  });

  // Test Case 4: 실패 (인식 실패)
  it("AI가 이미지 인식을 실패하면, 수기 입력을 유도하는 메시지를 보여준다", async () => {
    // Arrange
    render(<FoodRecordForm />);
    // API 모킹: 인식 실패 시나리오
    // mockUploadAPI.mockRejectedValue(new Error('인식 실패'));

    // Act
    const fileInput = screen.getByLabelText("음식 사진 업로드");
    await userEvent.upload(fileInput, mockFile);

    // Assert
    expect(
      await screen.findByText("음식 인식에 실패했습니다. 직접 입력해주세요.")
    ).toBeInTheDocument();
  });

  // Test Case 5: UI (로딩 상태)
  it("이미지 업로드 후 분석 중에는 로딩 스피너를 보여준다", async () => {
    // Arrange
    render(<FoodRecordForm />);

    // Act
    const fileInput = screen.getByLabelText("음식 사진 업로드");
    userEvent.upload(fileInput, mockFile); // await을 붙이지 않아 비동기 처리 중 상태 확인

    // Assert
    expect(await screen.findByRole("status")).toBeInTheDocument(); // 'status'는 스피너의 ARIA role
    // 분석 완료 후 스피너가 사라지는 것도 검증하면 더 좋습니다.
    expect(await screen.findByDisplayValue("김치찌개")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
