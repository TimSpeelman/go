import { CellValue } from "./model/Board";

export class Move {
    readonly row: number;
    readonly col: number;
    readonly value: number;

    public constructor(row: number, col: number, value: CellValue) {
        this.row = row;
        this.col = col;
        this.value = value;
    }

    static black(row: number, col: number) {
        return new Move(row, col, CellValue.Black);
    }
    static white(row: number, col: number) {
        return new Move(row, col, CellValue.White);
    }
    static empty(row: number, col: number) {
        return new Move(row, col, CellValue.Empty);
    }

}
