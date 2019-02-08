import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board, CellValue } from "./model/Board";
interface AppState {
	board: Board
	paint: CellValue
}
class App extends Component<{}, AppState> {
	state: AppState = {
		board: Board.ofSize(10),
		paint: CellValue.Black,
	}
	render() {
		const { paint, board } = this.state;
		const paintLabels = {
			[CellValue.Black]: "Black",
			[CellValue.White]: "White",
			[CellValue.Empty]: "Empty",
		}
		return (
			<div className="App">
				<button onClick={() => this.togglePaint()}>{paintLabels[paint]}</button>
				<table>
					{board.cells.map((row, i) => (
						<tr>
							{row.map((cell, j) => this.drawCell(i, j))}
						</tr>
					))}
				</table>
			</div>
		);
	}

	togglePaint = () => {
		const nextPaint = {
			[CellValue.Black]: CellValue.White,
			[CellValue.White]: CellValue.Black,
			[CellValue.Empty]: CellValue.Black,
		}
		this.setState({
			paint: nextPaint[this.state.paint]
		})
	}

	public clickCell(i: number, j: number) {
		const { board, paint } = this.state;
		this.setState({
			board: board.replace(i, j, paint)
		})
		this.togglePaint();
	}

	public drawCell(i: number, j: number) {
		const { board, paint } = this.state;
		const colors = {
			[CellValue.Black]: "black",
			[CellValue.White]: "white",
			[CellValue.Empty]: "transparent"
		}
		const cell = board.getCell(i, j);
		return (
			<td>
				<button
					className={'cellbtn'}
					style={{ background: colors[cell.value] }}
					onClick={() => this.clickCell(i, j)}
				>
					&nbsp;
				</button>
			</td >
		)
	}
}

export default App;
