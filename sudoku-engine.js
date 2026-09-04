(function attachSudokuEngine(globalScope) {
  "use strict";

  const range = (length) => Array.from({ length }, (_, index) => index);

  function shuffled(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
  }

  function pattern(row, column) {
    return (3 * (row % 3) + Math.floor(row / 3) + column) % 9;
  }

  function createSolution() {
    const rows = shuffled([0, 1, 2]).flatMap((band) => shuffled([0, 1, 2]).map((row) => band * 3 + row));
    const columns = shuffled([0, 1, 2]).flatMap((stack) => shuffled([0, 1, 2]).map((column) => stack * 3 + column));
    const numbers = shuffled(range(9).map((index) => index + 1));
    return rows.flatMap((row) => columns.map((column) => numbers[pattern(row, column)]));
  }

  function candidatesFor(board, index) {
    const row = Math.floor(index / 9);
    const column = index % 9;
    const used = new Set();
    for (let cursor = 0; cursor < 9; cursor += 1) {
      used.add(board[row * 9 + cursor]);
      used.add(board[cursor * 9 + column]);
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxColumn = Math.floor(column / 3) * 3;
    for (let y = 0; y < 3; y += 1) {
      for (let x = 0; x < 3; x += 1) used.add(board[(boxRow + y) * 9 + boxColumn + x]);
    }
    return range(9).map((value) => value + 1).filter((value) => !used.has(value));
  }

  function countSolutions(board, limit = 2) {
    let count = 0;

    function solve() {
      if (count >= limit) return;
      let selectedIndex = -1;
      let selectedCandidates = null;
      for (let index = 0; index < 81; index += 1) {
        if (board[index] !== 0) continue;
        const candidates = candidatesFor(board, index);
        if (candidates.length === 0) return;
        if (!selectedCandidates || candidates.length < selectedCandidates.length) {
          selectedIndex = index;
          selectedCandidates = candidates;
          if (candidates.length === 1) break;
        }
      }
      if (selectedIndex === -1) {
        count += 1;
        return;
      }
      selectedCandidates.forEach((value) => {
        board[selectedIndex] = value;
        solve();
        board[selectedIndex] = 0;
      });
    }

    solve();
    return count;
  }

  function buildCandidate(targetClues) {
    const solution = createSolution();
    const puzzle = [...solution];
    let clues = 81;
    const positions = shuffled(range(81));
    for (const index of positions) {
      if (clues <= targetClues) break;
      const value = puzzle[index];
      puzzle[index] = 0;
      if (countSolutions([...puzzle], 2) !== 1) puzzle[index] = value;
      else clues -= 1;
    }
    return { puzzle, solution, clues };
  }

  function createMediumPuzzle() {
    const target = 36 + Math.floor(Math.random() * 2);
    let best = buildCandidate(target);
    for (let attempt = 1; attempt < 3 && best.clues > 39; attempt += 1) {
      const candidate = buildCandidate(target);
      if (candidate.clues < best.clues) best = candidate;
    }
    return { ...best, difficulty: "Medium" };
  }

  function isComplete(board, solution) {
    return board.every((value, index) => value === solution[index]);
  }

  function isValidSolution(board) {
    if (board.length !== 81 || board.some((value) => value < 1 || value > 9)) return false;
    const validGroup = (values) => new Set(values).size === 9;
    for (let index = 0; index < 9; index += 1) {
      if (!validGroup(board.slice(index * 9, index * 9 + 9))) return false;
      if (!validGroup(range(9).map((row) => board[row * 9 + index]))) return false;
      const boxRow = Math.floor(index / 3) * 3;
      const boxColumn = (index % 3) * 3;
      const box = [];
      for (let y = 0; y < 3; y += 1) for (let x = 0; x < 3; x += 1) box.push(board[(boxRow + y) * 9 + boxColumn + x]);
      if (!validGroup(box)) return false;
    }
    return true;
  }

  const engine = { createMediumPuzzle, countSolutions, isComplete, isValidSolution, candidatesFor };
  globalScope.SudokuEngine = engine;
  if (typeof module !== "undefined" && module.exports) module.exports = engine;
})(typeof window !== "undefined" ? window : globalThis);
