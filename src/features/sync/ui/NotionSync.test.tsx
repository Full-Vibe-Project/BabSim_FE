//import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
//import NotionSync from "./NotionSync";

//describe("NotionSync", () => {
//  // Test Case 1: 성공 (최초 설정)
//  it("Notion이 연결되지 않은 상태에서는 연결을 유도하는 버튼을 보여준다", () => {
//    // Arrange
//    render(<NotionSync isConnected={false} />);

//    // Assert
//    expect(
//      screen.getByRole("button", { name: "Notion 연동하기" })
//    ).toBeInTheDocument();
//    expect(
//      screen.queryByRole("button", { name: "기록 내보내기" })
//    ).not.toBeInTheDocument();
//  });

//  // Test Case 2: 성공 (연결 완료)
//  it("Notion 연결에 성공하면, 연결된 DB 정보와 내보내기 버튼을 보여준다", () => {
//    // Arrange
//    render(<NotionSync isConnected={true} databaseName="나의 식단 기록" />);

//    // Assert
//    expect(
//      screen.getByText("연결된 데이터베이스: 나의 식단 기록")
//    ).toBeInTheDocument();
//    const exportButton = screen.getByRole("button", { name: "기록 내보내기" });
//    expect(exportButton).toBeInTheDocument();
//    expect(exportButton).not.toBeDisabled();
//  });

//  // Test Case 3: 성공 (내보내기)
//  it('"기록 내보내기" 버튼을 클릭하면, 로딩 상태를 거쳐 성공 메시지를 보여준다', async () => {
//    // Arrange
//    render(<NotionSync isConnected={true} />);
//    const exportButton = screen.getByRole("button", { name: "기록 내보내기" });
//    // API 모킹: 성공 시나리오
//    // mockExportAPI.mockResolvedValue({ success: true });

//    // Act
//    userEvent.click(exportButton);

//    // Assert
//    // 1. 로딩 상태 확인
//    expect(
//      await screen.findByText("Notion으로 내보내는 중...")
//    ).toBeInTheDocument();
//    // 2. 성공 메시지 확인
//    expect(
//      await screen.findByText("성공적으로 내보냈습니다")
//    ).toBeInTheDocument();
//  });

//  // Test Case 4: 실패 (API 오류)
//  it("내보내기 중 API 오류가 발생하면, 에러 메시지와 재시도 버튼을 보여준다", async () => {
//    // Arrange
//    render(<NotionSync isConnected={true} />);
//    const exportButton = screen.getByRole("button", { name: "기록 내보내기" });
//    // API 모킹: 실패 시나리오
//    // mockExportAPI.mockRejectedValue(new Error('API 권한이 없습니다.'));

//    // Act
//    await userEvent.click(exportButton);

//    // Assert
//    expect(
//      await screen.findByText("내보내기에 실패했습니다: API 권한이 없습니다.")
//    ).toBeInTheDocument();
//    expect(screen.getByRole("button", { name: "재시도" })).toBeInTheDocument();
//  });
//});