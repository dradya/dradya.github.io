(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const header = document.querySelector(".site-header");
  const menuButton = document.getElementById("menuButton");
  const mobileNav = document.getElementById("mobileNav");

  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    if (mobileNav) mobileNav.hidden = isOpen;
  });
  mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("in-view"));
  }

  const rainField = document.getElementById("rainField");
  const lightningFlash = document.getElementById("lightningFlash");
  let lightningTimer = 0;

  if (rainField && !reduceMotion) {
    const rain = document.createDocumentFragment();
    for (let index = 0; index < 74; index += 1) {
      const drop = document.createElement("i");
      drop.className = "rain-drop";
      drop.style.setProperty("--x", `${Math.random() * 108 - 4}%`);
      drop.style.setProperty("--length", `${8 + Math.random() * 16}vh`);
      drop.style.setProperty("--duration", `${0.52 + Math.random() * 0.48}s`);
      drop.style.setProperty("--delay", `${Math.random() * -2}s`);
      drop.style.setProperty("--opacity", `${0.28 + Math.random() * 0.52}`);
      rain.appendChild(drop);
    }
    rainField.appendChild(rain);
  }

  const queueLightning = () => {
    window.clearTimeout(lightningTimer);
    if (document.body.dataset.scene !== "monsoon" || reduceMotion) return;
    lightningTimer = window.setTimeout(() => {
      lightningFlash?.classList.remove("strike");
      if (lightningFlash) void lightningFlash.offsetWidth;
      lightningFlash?.classList.add("strike");
      queueLightning();
    }, 2200 + Math.random() * 5000);
  };

  document.querySelectorAll("[data-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.dataset.scene = button.dataset.scene;
      document.querySelectorAll("[data-scene]").forEach((choice) => {
        choice.setAttribute("aria-pressed", String(choice === button));
      });
      queueLightning();
    });
  });

  const hero = document.querySelector(".hero");
  const heroArt = document.getElementById("heroArt");
  if (hero && heroArt && finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * -12;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      heroArt.style.setProperty("--px", `${x}px`);
      heroArt.style.setProperty("--py", `${y}px`);
    }, { passive: true });
    hero.addEventListener("pointerleave", () => {
      heroArt.style.setProperty("--px", "0px");
      heroArt.style.setProperty("--py", "0px");
    });
  }

  const routeProgress = document.getElementById("routeProgress");
  const routeScooter = document.getElementById("routeScooter");
  const routeStops = [...document.querySelectorAll(".route-stop")];
  const scooterPositions = [
    { left: 3, top: 48 },
    { left: 27, top: 34 },
    { left: 51, top: 62 },
    { left: 72, top: 34 },
    { left: 88, top: 54 }
  ];

  routeStops.forEach((stop, index) => {
    stop.addEventListener("click", () => {
      routeStops.forEach((item) => item.classList.toggle("active", item === stop));
      const progress = Math.max(0, Math.min(1, Number(stop.dataset.progress) || 0));
      if (routeProgress) routeProgress.style.strokeDashoffset = String(1 - progress);
      if (routeScooter) {
        const position = scooterPositions[index];
        routeScooter.classList.add("riding");
        routeScooter.style.left = `${position.left}%`;
        routeScooter.style.top = `${position.top}%`;
        window.setTimeout(() => routeScooter.classList.remove("riding"), reduceMotion ? 0 : 700);
      }
      const destination = document.getElementById(stop.dataset.target);
      window.setTimeout(() => destination?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }), reduceMotion ? 0 : 520);
    });
  });

  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt], [data-skill-card]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1100px) rotateX(${y * -2.5}deg) rotateY(${x * 3}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  const radarDot = document.getElementById("radarDot");
  const currentZone = document.getElementById("currentZone");
  const zones = [
    { id: "home", label: "HOME", x: 50, y: 50 },
    { id: "about", label: "ABOUT", x: 29, y: 33 },
    { id: "experience", label: "INTERNSHIP", x: 67, y: 28 },
    { id: "projects", label: "PROJECTS", x: 72, y: 68 },
    { id: "sudoku", label: "SUDOKU", x: 35, y: 72 },
    { id: "education", label: "EDUCATION", x: 26, y: 50 },
    { id: "contact", label: "CONTACT", x: 54, y: 45 }
  ];
  const zoneElements = zones.map((zone) => ({ ...zone, element: document.getElementById(zone.id) })).filter((zone) => zone.element);
  let scrollTicking = false;

  const updateScrollState = () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);
    const marker = window.scrollY + window.innerHeight * 0.42;
    let active = zoneElements[0];
    zoneElements.forEach((zone) => {
      if (zone.element.offsetTop <= marker) active = zone;
    });
    if (active && currentZone && radarDot) {
      currentZone.textContent = active.label;
      radarDot.style.left = `${active.x}%`;
      radarDot.style.top = `${active.y}%`;
    }
    scrollTicking = false;
  };

  const requestScrollUpdate = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollState);
  };
  updateScrollState();
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);

  const initialiseSudoku = () => {
    const engine = window.SudokuEngine;
    const boardElement = document.getElementById("sudokuBoard");
    if (!engine || !boardElement) return;

    const clueCount = document.getElementById("clueCount");
    const timerElement = document.getElementById("sudokuTimer");
    const statusElement = document.getElementById("sudokuStatus");
    const messageElement = document.getElementById("sudokuMessage");
    const winElement = document.getElementById("sudokuWin");
    const winTimeElement = document.getElementById("sudokuWinTime");
    const confettiElement = document.getElementById("sudokuConfetti");
    const newButton = document.getElementById("newSudoku");
    const checkButton = document.getElementById("checkSudoku");
    const hintButton = document.getElementById("hintSudoku");
    const resetButton = document.getElementById("resetSudoku");
    const closeWinButton = document.getElementById("closeSudokuWin");
    let puzzle = [];
    let solution = [];
    let values = [];
    let cells = [];
    let selectedIndex = -1;
    let elapsed = 0;
    let hints = 0;
    let timerId = 0;
    let timerStarted = false;
    let solved = false;

    const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    const stopTimer = () => {
      window.clearInterval(timerId);
      timerId = 0;
    };
    const startTimer = () => {
      if (timerId || solved) return;
      timerStarted = true;
      timerId = window.setInterval(() => {
        elapsed += 1;
        if (timerElement) timerElement.textContent = formatTime(elapsed);
      }, 1000);
    };

    const cellGroup = (index) => {
      const row = Math.floor(index / 9);
      const column = index % 9;
      const boxRow = Math.floor(row / 3);
      const boxColumn = Math.floor(column / 3);
      return { row, column, boxRow, boxColumn };
    };

    const selectCell = (index) => {
      selectedIndex = index;
      const selectedGroup = cellGroup(index);
      cells.forEach((cell, cellIndex) => {
        const group = cellGroup(cellIndex);
        const related = group.row === selectedGroup.row || group.column === selectedGroup.column || (group.boxRow === selectedGroup.boxRow && group.boxColumn === selectedGroup.boxColumn);
        cell.classList.toggle("selected", cellIndex === index);
        cell.classList.toggle("related", related && cellIndex !== index);
      });
    };

    const duplicateIndexes = () => {
      const duplicates = new Set();
      const groups = [];
      for (let row = 0; row < 9; row += 1) groups.push(Array.from({ length: 9 }, (_, column) => row * 9 + column));
      for (let column = 0; column < 9; column += 1) groups.push(Array.from({ length: 9 }, (_, row) => row * 9 + column));
      for (let boxRow = 0; boxRow < 3; boxRow += 1) {
        for (let boxColumn = 0; boxColumn < 3; boxColumn += 1) {
          const group = [];
          for (let y = 0; y < 3; y += 1) for (let x = 0; x < 3; x += 1) group.push((boxRow * 3 + y) * 9 + boxColumn * 3 + x);
          groups.push(group);
        }
      }
      groups.forEach((group) => {
        const positions = new Map();
        group.forEach((index) => {
          const value = values[index];
          if (!value) return;
          if (!positions.has(value)) positions.set(value, []);
          positions.get(value).push(index);
        });
        positions.forEach((indexes) => { if (indexes.length > 1) indexes.forEach((index) => duplicates.add(index)); });
      });
      return duplicates;
    };

    const showConflicts = () => {
      const duplicates = duplicateIndexes();
      cells.forEach((cell, index) => {
        cell.classList.remove("correct", "wrong");
        if (duplicates.has(index)) cell.classList.add("wrong");
      });
      if (duplicates.size && messageElement) messageElement.textContent = "A number is repeated in a row, column, or square.";
    };

    const setValue = (index, value, fromHint = false) => {
      if (solved || index < 0 || puzzle[index] !== 0) return;
      const parsed = Number(value);
      if (!fromHint && !timerStarted && parsed >= 1 && parsed <= 9) startTimer();
      values[index] = parsed >= 1 && parsed <= 9 ? parsed : 0;
      cells[index].value = values[index] || "";
      cells[index].classList.remove("hint", "correct", "wrong");
      if (fromHint) {
        cells[index].classList.add("hint");
        window.setTimeout(() => cells[index]?.classList.remove("hint"), 750);
      }
      showConflicts();
      if (engine.isComplete(values, solution)) finishPuzzle();
    };

    const celebrate = () => {
      if (!confettiElement || reduceMotion) return;
      const colors = ["#c85a37", "#236044", "#4c9eb0", "#f5c64c", "#fffaf0"];
      const pieces = document.createDocumentFragment();
      for (let index = 0; index < 46; index += 1) {
        const piece = document.createElement("i");
        piece.style.setProperty("--x", `${Math.random() * 100}%`);
        piece.style.setProperty("--size", `${5 + Math.random() * 7}px`);
        piece.style.setProperty("--color", colors[index % colors.length]);
        piece.style.setProperty("--speed", `${1.8 + Math.random() * 1.7}s`);
        piece.style.setProperty("--delay", `${Math.random() * -2.2}s`);
        piece.style.setProperty("--angle", `${Math.random() * 180}deg`);
        piece.style.setProperty("--drift", `${Math.random() * 110 - 55}px`);
        pieces.appendChild(piece);
      }
      confettiElement.replaceChildren(pieces);
    };

    const finishPuzzle = () => {
      if (solved) return;
      solved = true;
      stopTimer();
      cells.forEach((cell) => cell.classList.add("correct"));
      if (statusElement) statusElement.textContent = "COMPLETE";
      const result = `Solved in ${formatTime(elapsed)}${hints ? ` with ${hints} hint${hints === 1 ? "" : "s"}` : ""}.`;
      if (messageElement) messageElement.textContent = result;
      if (winTimeElement) winTimeElement.textContent = result;
      if (winElement) winElement.hidden = false;
      celebrate();
      closeWinButton?.focus({ preventScroll: true });
    };

    const checkPuzzle = () => {
      const emptyCount = values.filter((value) => value === 0).length;
      let wrongCount = 0;
      cells.forEach((cell, index) => {
        if (puzzle[index] !== 0 || values[index] === 0) return;
        const correct = values[index] === solution[index];
        cell.classList.toggle("correct", correct);
        cell.classList.toggle("wrong", !correct);
        if (!correct) wrongCount += 1;
      });
      if (!emptyCount && !wrongCount && engine.isComplete(values, solution)) {
        finishPuzzle();
      } else if (messageElement) {
        const parts = [];
        if (emptyCount) parts.push(`${emptyCount} empty`);
        if (wrongCount) parts.push(`${wrongCount} to revisit`);
        messageElement.textContent = `${parts.join(" · ")}. Keep going.`;
      }
    };

    const buildBoard = () => {
      const fragment = document.createDocumentFragment();
      cells = values.map((value, index) => {
        const input = document.createElement("input");
        const row = Math.floor(index / 9) + 1;
        const column = index % 9 + 1;
        input.className = `sudoku-cell${puzzle[index] ? " given" : ""}`;
        input.type = "text";
        input.inputMode = "numeric";
        input.maxLength = 1;
        input.value = value || "";
        input.readOnly = puzzle[index] !== 0;
        input.setAttribute("aria-label", `Row ${row}, column ${column}${puzzle[index] ? `, given ${value}` : ""}`);
        input.addEventListener("focus", () => selectCell(index));
        input.addEventListener("click", () => selectCell(index));
        input.addEventListener("input", () => setValue(index, input.value.replace(/[^1-9]/g, "").slice(-1)));
        input.addEventListener("keydown", (event) => {
          const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -9, ArrowDown: 9 };
          if (event.key in offsets) {
            event.preventDefault();
            const target = Math.max(0, Math.min(80, index + offsets[event.key]));
            cells[target]?.focus();
          } else if ((event.key === "Backspace" || event.key === "Delete") && puzzle[index] === 0) {
            event.preventDefault();
            setValue(index, 0);
          }
        });
        fragment.appendChild(input);
        return input;
      });
      boardElement.replaceChildren(fragment);
    };

    const loadPuzzle = () => {
      if (statusElement) statusElement.textContent = "GENERATING…";
      if (messageElement) messageElement.textContent = "Generating a fresh medium puzzle…";
      stopTimer();
      window.setTimeout(() => {
        const generated = engine.createMediumPuzzle();
        puzzle = [...generated.puzzle];
        solution = [...generated.solution];
        values = [...puzzle];
        elapsed = 0;
        hints = 0;
        timerStarted = false;
        solved = false;
        selectedIndex = -1;
        if (timerElement) timerElement.textContent = "00:00";
        if (clueCount) clueCount.textContent = String(generated.clues);
        if (statusElement) statusElement.textContent = "MEDIUM · READY";
        if (messageElement) messageElement.textContent = "Fresh puzzle ready. The timer starts with your first number.";
        if (winElement) winElement.hidden = true;
        confettiElement?.replaceChildren();
        buildBoard();
      }, 20);
    };

    const resetPuzzle = () => {
      stopTimer();
      values = [...puzzle];
      elapsed = 0;
      hints = 0;
      timerStarted = false;
      solved = false;
      selectedIndex = -1;
      if (timerElement) timerElement.textContent = "00:00";
      if (statusElement) statusElement.textContent = "MEDIUM · RESET";
      if (messageElement) messageElement.textContent = "Back to the starting grid.";
      if (winElement) winElement.hidden = true;
      confettiElement?.replaceChildren();
      buildBoard();
    };

    document.querySelectorAll("[data-number]").forEach((button) => {
      button.addEventListener("click", () => {
        setValue(selectedIndex, button.dataset.number);
        cells[selectedIndex]?.focus();
      });
    });
    newButton?.addEventListener("click", loadPuzzle);
    checkButton?.addEventListener("click", checkPuzzle);
    resetButton?.addEventListener("click", resetPuzzle);
    hintButton?.addEventListener("click", () => {
      if (solved) return;
      const candidates = values.map((value, index) => ({ value, index })).filter((item) => puzzle[item.index] === 0 && item.value !== solution[item.index]);
      if (!candidates.length) return checkPuzzle();
      const choice = candidates[Math.floor(Math.random() * candidates.length)];
      hints += 1;
      setValue(choice.index, solution[choice.index], true);
      cells[choice.index]?.focus();
      if (messageElement) messageElement.textContent = `Hint ${hints}: one square has been filled.`;
      if (engine.isComplete(values, solution)) finishPuzzle();
    });
    closeWinButton?.addEventListener("click", loadPuzzle);

    loadPuzzle();
  };

  initialiseSudoku();
})();
