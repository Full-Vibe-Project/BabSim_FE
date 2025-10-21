import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuRecommendation from "./MenuRecommendation";
import { mockRecommendations, mockEmptyRecommendations } from "./mockData"; // Mock 데이터

describe("MenuRecommendation", () => {
  // Test Case 1: 성공 (추천 목록 표시)
  it("컴포넌트가 렌더링되면, 사용자 데이터 기반 추천 메뉴 목록을 보여준다", () => {
    // Arrange
    render(<MenuRecommendation recommendations={mockRecommendations} />);

    // Assert
    const list = screen.getByRole("list", { name: /추천 메뉴/ });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(mockRecommendations.length);
    expect(within(items[0]).getByText("닭가슴살 샐러드")).toBeInTheDocument();
  });

  // Test Case 2: 성공 (메뉴 카드 내용)
  it("각 추천 메뉴 카드에는 영양 요약과 주의 질환 정보가 포함된다", () => {
    // Arrange
    render(<MenuRecommendation recommendations={mockRecommendations} />);
    const firstCard = screen.getAllByRole("listitem")[0];

    // Assert
    // 영양 요약 (예: 단백질 풍부)
    expect(within(firstCard).getByText(/단백질 풍부/)).toBeInTheDocument();
    // 주의 질환 (예: 신장 질환 주의)
    expect(within(firstCard).getByText(/신장 질환 주의/)).toBeInTheDocument();
  });

  // Test Case 3: 성공 (관심 표현)
  it('사용자가 "저장" 버튼을 클릭하면, 저장되었다는 피드백을 보여준다', async () => {
    // Arrange
    render(<MenuRecommendation recommendations={mockRecommendations} />);
    const firstCard = screen.getAllByRole("listitem")[0];
    const saveButton = within(firstCard).getByRole("button", { name: "저장" });

    // Act
    await userEvent.click(saveButton);

    // Assert
    // 버튼이 비활성화되거나, "저장됨"으로 텍스트가 바뀌는 등의 변화를 검증
    expect(await within(firstCard).findByText("저장됨")).toBeInTheDocument();
  });

  // Test Case 4: 엣지 케이스 (추천 불가)
  it("추천할 메뉴가 없는 경우, 안내 메시지를 보여준다", () => {
    // Arrange
    render(<MenuRecommendation recommendations={mockEmptyRecommendations} />);

    // Assert
    expect(
      screen.getByText("추천할 메뉴를 준비 중입니다.")
    ).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
