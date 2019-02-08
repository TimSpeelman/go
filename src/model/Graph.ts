import { Cell, Board } from "./Board";

export class GoGraph {
    readonly nodes: GoNode[][];

    constructor(nodes: GoNode[][]) {
        this.nodes = nodes;
    }

    public getNode(col: number, row: number) {
        return this.nodes[col][row];
    }

    static fromBoard(board: Board) {
        const n = board.size;
        const nodes = board.cells.map(r => r.map(c => new GoNode(c)));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                for (let x = 0; x < 9; x++) {
                    const di = x % 3 - 1;
                    const dj = Math.floor(x / 3) - 1;
                    if (di != 0 && dj != 0 && board.isWithinBounds(x + di, j + dj)) {
                        nodes[i][j].addNeighbor(nodes[i + di][j + dj])
                    }
                }

            }
        }
        return new GoGraph(nodes);
    }
}

export class GoNode {
    private cell: Cell;
    private neighbors: GoNode[];
    constructor(cell: Cell) {
        this.cell = cell;
        this.neighbors = [];
    }
    public addNeighbor(node: GoNode) {
        this.neighbors.push(node);
    }
}
