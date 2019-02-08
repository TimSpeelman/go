import { OutOfBoundsError } from "./OutOfBoundsError";
import { make2DArrayOf } from "./make2DArrayOf";

export class Board {
    readonly size: number;
    readonly cells: Cell[][];

    public constructor(cells: Cell[][]) {
        this.cells = cells;
        this.size = cells.length;
    }

    public black(row: number, col: number) {
        return this.replace(row, col, CellValue.Black);
    }

    public white(row: number, col: number) {
        return this.replace(row, col, CellValue.White);
    }

    public empty(row: number, col: number) {
        return this.replace(row, col, CellValue.Empty);
    }

    public isBlack(row: number, col: number) {
        return this.getCell(row, col).value === CellValue.Black;
    }

    public isWhite(row: number, col: number) {
        return this.getCell(row, col).value === CellValue.White;
    }

    public isEmpty(row: number, col: number) {
        return this.getCell(row, col).value === CellValue.Empty;
    }

    public getCell(row: number, col: number) {
        this.assertWithinBounds(row, col);
        return this.cells[row][col];
    }

    private assertWithinBounds(row: number, col: number) {
        if (!this.isWithinBounds(row, col)) {
            throw new OutOfBoundsError(`Cell ${row}x${col} does not exist within size ${this.size}.`)
        }
    }

    public isWithinBounds(row: number, col: number) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    public replace(row: number, col: number, value: CellValue) {
        this.assertWithinBounds(row, col);
        const cells = this.copyCells();
        cells[row][col] = new Cell(row, col, value);
        return new Board(cells);
    }

    static ofSize(size: number) {
        return new Board(make2DArrayOf(size, size, (r, c) => new Cell(r, c, CellValue.Empty)));
    }

    private copyCells() {
        return this.cells.slice().map(r => r.slice().map(c => c.copy()));
    }
}

export class Cell {
    constructor(
        readonly row: number,
        readonly col: number,
        readonly value: CellValue,
    ) { }

    copy() {
        return new Cell(this.row, this.col, this.value);
    }
}

export enum CellValue { Empty, Black, White }
