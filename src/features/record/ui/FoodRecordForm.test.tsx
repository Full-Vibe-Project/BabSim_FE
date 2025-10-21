import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FoodRecordForm from "./FoodRecordForm";
import { describe, it, expect } from "vitest";

describe("FoodRecordForm", () => {
  // Mock File object
  const mockFile = new File(["(⌐□_□)"], "food.png", { type: "image/png" });

  // Test Case 1: 성공 (이미지 업로드)
  it.skip("사용자가 이미지를 업로드하면, AI 분석 결과(음식명, 칼로리)가 화면에 표시된다", async () => {
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
  it.skip("사용자가 AI 분석 결과를 직접 수정하고 저장 버튼을 누를 수 있다", async () => {
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

  // Test Case 2: 실패 (유효성 - 음식 이름)
  it.skip('사용자가 음식 이름을 입력하지 않고 저장을 시도하면, 에러 메시지를 보여준다', async () => {
    // Arrange
    render(<FoodRecordForm />);

    // Act
    await userEvent.click(screen.getByRole('button', { name: '저장' }));

    // Assert
    expect(await screen.findByText('음식 이름은 필수입니다.')).toBeInTheDocument();
  });

  // Test Case 3: 실패 (유효성 - 섭취량)
  it.skip('사용자가 섭취량을 0 이하로 입력하고 저장을 시도하면, 에러 메시지를 보여준다', async () => {
    // Arrange
    render(<FoodRecordForm />);

    // Act
    await userEvent.type(screen.getByLabelText('섭취량 (g)'), '0');
    await userEvent.click(screen.getByRole('button', { name: '저장' }));

    // Assert
    expect(await screen.findByText('섭취량은 0보다 커야 합니다.')).toBeInTheDocument();
  });

  // Test Case 4: 실패 (유효성 - 식사 시간)
  it.skip('사용자가 식사 시간을 입력하지 않고 저장을 시도하면, 에러 메시지를 보여준다', async () => {
    // Arrange
    render(<FoodRecordForm />);

    // Act
    await userEvent.click(screen.getByRole('button', { name: '저장' }));

    // Assert
    expect(await screen.findByText('식사 시간은 필수입니다.')).toBeInTheDocument();
  });
});