import { Board, CellValue } from "./Board";
import { make2DArrayOf } from "./make2DArrayOf";

export class CaptureAnalysis {
    private board: Board;
    private color: CellValue;
    private cover: boolean[][];

    constructor(board: Board, color: CellValue) {
        this.board = board;
        this.color = color;
        this.cover = make2DArrayOf(board.size, board.size, () => false);
    }

    private depthFirstSearch() {

    }

    private markCovered(i: number, j: number) {
        this.cover[i][j] = true;
    }

    private isCovered(i: number, j: number) {
        return this.cover[i][j];
    }

    private findFirstUncoveredOfColor() {
        const n = this.board.size;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (this.board.getCell(i, j).value === this.color && !this.isCovered(i, j)) {
                    return [i, j];
                }
            }
        }
        return false;
    }

}