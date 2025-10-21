//import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
//import SummaryReport from "./SummaryReport";
//import {
//  mockWeeklyData,
//  mockMonthlyData,
//  mockInsufficientData,
//} from "./mockData"; // Mock 데이터

//describe("SummaryReport", () => {
//  // Test Case 1: 성공 (기본 렌더링)
//  it("컴포넌트가 렌더링되면, 기본적으로 주간 데이터 요약과 차트를 보여준다", () => {
//    // Arrange
//    render(<SummaryReport initialData={mockWeeklyData} />);

//    // Assert
//    // 1. 제목/기간 확인
//    expect(
//      screen.getByRole("heading", { name: /주간 리포트/ })
//    ).toBeInTheDocument();
//    // 2. 차트 존재 여부 확인 (구체적인 차트 라이브러리에 따라 selector 변경)
//    expect(screen.getByTestId("summary-chart")).toBeInTheDocument();
//    // 3. 요약 텍스트 확인
//    expect(
//      screen.getByText(/지난 주에는 단백질 섭취가 목표치보다 높았습니다./)
//    ).toBeInTheDocument();
//  });

//  // Test Case 2: 성공 (기간 변경)
//  it('사용자가 "월간" 탭을 클릭하면, 월간 데이터 요약으로 내용이 변경된다', async () => {
//    // Arrange
//    render(
//      <SummaryReport
//        weeklyData={mockWeeklyData}
//        monthlyData={mockMonthlyData}
//      />
//    );
//    const monthlyTab = screen.getByRole("tab", { name: "월간" });

//    // Act
//    await userEvent.click(monthlyTab);

//    // Assert
//    expect(
//      screen.getByRole("heading", { name: /월간 리포트/ })
//    ).toBeInTheDocument();
//    expect(
//      screen.getByText(/지난 달에는 나트륨 섭취가 과다했습니다./)
//    ).toBeInTheDocument();
//  });

//  // Test Case 3: UI (데이터 강조)
//  it("목표치 대비 과다/부족 항목은 시각적으로 강조하여 보여준다", () => {
//    // Arrange
//    render(<SummaryReport initialData={mockWeeklyData} />);

//    // Assert
//    // 'highlight' 클래스나 특정 스타일이 적용되었는지 확인
//    const highlightedElement = screen.getByText("단백질");
//    expect(highlightedElement).toHaveClass("highlight-excess"); // 예시 클래스명
//  });

//  // Test Case 4: 엣지 케이스 (데이터 부족)
//  it("표시할 데이터가 충분하지 않을 경우, 안내 메시지를 보여준다", () => {
//    // Arrange
//    render(<SummaryReport initialData={mockInsufficientData} />);

//    // Assert
//    expect(screen.getByText("분석할 데이터가 부족합니다.")).toBeInTheDocument();
//    // 차트나 요약 정보는 렌더링되지 않아야 함
//    expect(screen.queryByTestId("summary-chart")).not.toBeInTheDocument();
//  });
//});
