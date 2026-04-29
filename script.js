const islandCopy = {
  "la-palma": {
    kicker: "La Palma",
    title: "Atencion cercana y seguimiento coordinado",
    text: "El servicio adapta los objetivos de escucha, lenguaje y comunicacion a las necesidades de la persona y su entorno familiar, educativo o laboral."
  },
  tenerife: {
    kicker: "Tenerife",
    title: "Intervencion especializada y recursos compartidos",
    text: "La isla funciona como un punto clave para valorar necesidades, planificar sesiones y coordinar apoyos con familias, centros educativos y otros profesionales."
  },
  "gran-canaria": {
    kicker: "Gran Canaria",
    title: "Rehabilitacion auditiva orientada a la participacion",
    text: "El trabajo logopedico se centra en que la persona use la audicion y el lenguaje en conversaciones, rutinas, aprendizaje y autonomia diaria."
  }
};

const rehabCopy = {
  deteccion: {
    title: "Deteccion",
    text: "La persona aprende a advertir si hay presencia o ausencia de sonido: por ejemplo, si suena un coche, un telefono o si hay silencio.",
    kicker: "Deteccion",
    gameTitle: "Presencia o ausencia de sonido",
    instruction: "Pulsa reproducir y decide si has escuchado algun sonido o si ha habido silencio."
  },
  discriminacion: {
    title: "Discriminacion",
    text: "Se entrenan diferencias entre sonidos: dos tonos iguales o diferentes, ritmos largos o cortos, sonidos fuertes o suaves.",
    kicker: "Discriminacion",
    gameTitle: "Compara dos sonidos",
    instruction: "Pulsa reproducir y decide si los dos sonidos son iguales o diferentes."
  },
  identificacion: {
    title: "Identificacion",
    text: "La persona reconoce una palabra o sonido dentro de un conjunto cerrado de opciones conocidas.",
    kicker: "Identificacion",
    gameTitle: "Identifica la palabra",
    instruction: "Pulsa reproducir y elige la palabra que has escuchado entre las opciones."
  },
  reconocimiento: {
    title: "Reconocimiento auditivo",
    text: "La persona reconoce sonidos cotidianos sin ver la respuesta antes: telefono, coche, timbre, agua u otros sonidos familiares.",
    kicker: "Reconocimiento",
    gameTitle: "Que sonido cotidiano es",
    instruction: "Pulsa reproducir y elige que sonido conocido has escuchado."
  },
  comprension: {
    title: "Comprension",
    text: "La escucha se usa para entender instrucciones con mas informacion: accion, objeto, color, orden o condicion.",
    kicker: "Comprension",
    gameTitle: "Sigue la instruccion oral",
    instruction: "Pulsa reproducir, escucha la instruccion completa y elige la respuesta correcta."
  }
};

const soundNames = {
  car: "coche",
  phone: "telefono",
  bell: "timbre",
  water: "agua",
  dog: "perro"
};

const wordChoices = ["casa", "mesa", "sopa", "luna", "mano", "pato"];
const actionChoices = ["aplaudir", "saltar", "sentarse", "levantar la mano", "tocar la mesa", "mirar la puerta"];

let currentGame = "deteccion";
let currentAnswer = null;
let currentPlayable = null;
let audioContext = null;

const islandPanel = document.querySelector("#island-panel");
const rehabDetail = document.querySelector("#rehab-detail");
const gameKicker = document.querySelector("#game-kicker");
const gameTitle = document.querySelector("#game-title");
const gameInstruction = document.querySelector("#game-instruction");
const gameStage = document.querySelector("#game-stage");
const gameActions = document.querySelector("#game-actions");
const feedback = document.querySelector("#feedback");

document.querySelectorAll(".island").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".island").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const copy = islandCopy[button.dataset.island];
    islandPanel.innerHTML = `
      <p class="panel-kicker">${copy.kicker}</p>
      <h3>${copy.title}</h3>
      <p>${copy.text}</p>
    `;
  });
});

document.querySelectorAll(".phase").forEach((button) => {
  button.addEventListener("click", () => {
    setGame(button.dataset.game);
    document.querySelector("#juegos").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelector("#reset-game").addEventListener("click", () => renderGame());

function setGame(game) {
  currentGame = game;
  document.querySelectorAll(".phase").forEach((item) => {
    item.classList.toggle("active", item.dataset.game === game);
  });
  const copy = rehabCopy[game];
  rehabDetail.innerHTML = `<h3>${copy.title}</h3><p>${copy.text}</p>`;
  gameKicker.textContent = copy.kicker;
  gameTitle.textContent = copy.gameTitle;
  gameInstruction.textContent = copy.instruction;
  renderGame();
}

function renderGame() {
  feedback.textContent = "";
  feedback.className = "feedback";
  currentPlayable = null;

  if (currentGame === "deteccion") {
    renderDetection();
  }

  if (currentGame === "discriminacion") {
    renderDiscrimination();
  }

  if (currentGame === "identificacion") {
    renderIdentification();
  }

  if (currentGame === "reconocimiento") {
    renderRecognition();
  }

  if (currentGame === "comprension") {
    renderComprehension();
  }

  gameActions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button.dataset.answer));
  });
}

function renderDetection() {
  const options = ["car", "phone", "quiet", "bell", "quiet"];
  const selected = pick(options);
  currentAnswer = selected === "quiet" ? "quiet" : "sound";
  currentPlayable = () => {
    if (selected !== "quiet") {
      playKnownSound(selected);
    }
  };
  gameStage.innerHTML = stagePrompt("Escucha y decide", "Puede sonar un coche, un telefono, un timbre... o no sonar nada.");
  gameActions.innerHTML = `
    ${playButton()}
    <button data-answer="sound">Hay sonido</button>
    <button data-answer="quiet">Silencio</button>
  `;
}

function renderDiscrimination() {
  const pair = pick([
    { label: "tono corto + tono corto", answer: "same", pattern: ["beep-high", "beep-high"] },
    { label: "tono corto + tono grave", answer: "different", pattern: ["beep-high", "beep-low"] },
    { label: "telefono + telefono", answer: "same", pattern: ["phone", "phone"] },
    { label: "coche + timbre", answer: "different", pattern: ["car", "bell"] }
  ]);
  currentAnswer = pair.answer;
  currentPlayable = () => playSequence(pair.pattern);
  gameStage.innerHTML = stagePrompt("Escucha dos sonidos", "Sonaran dos estimulos separados. No mires la respuesta: compara lo que oyes.");
  gameActions.innerHTML = `
    ${playButton()}
    <button data-answer="same">Iguales</button>
    <button data-answer="different">Diferentes</button>
  `;
}

function renderIdentification() {
  currentAnswer = pick(wordChoices);
  currentPlayable = () => speak(`Escucha: ${currentAnswer}`);
  gameStage.innerHTML = stagePrompt("Conjunto cerrado", "Escucha una palabra y selecciona una opcion.");
  gameActions.innerHTML = `
    ${playButton()}
    ${shuffle(wordChoices.slice(0, 4).includes(currentAnswer) ? wordChoices.slice(0, 4) : [currentAnswer, "casa", "mesa", "luna"]).map(optionButton).join("")}
  `;
}

function renderRecognition() {
  const sounds = ["car", "phone", "bell", "water", "dog"];
  const selected = pick(sounds);
  currentAnswer = selected;
  currentPlayable = () => playKnownSound(selected);
  gameStage.innerHTML = stagePrompt("Reconocimiento auditivo", "Escucha un sonido cotidiano sin pista visual y di que es.");
  gameActions.innerHTML = `
    ${playButton()}
    ${shuffle(sounds).map((sound) => optionButton(sound, soundNames[sound])).join("")}
  `;
}

function renderComprehension() {
  const tasks = [
    { text: "Despues de escuchar, elige levantar la mano.", answer: "levantar la mano" },
    { text: "Si oyes la palabra mesa, selecciona tocar la mesa.", answer: "tocar la mesa" },
    { text: "Primero piensa en un coche y despues elige aplaudir.", answer: "aplaudir" },
    { text: "No elijas saltar. La respuesta correcta es sentarse.", answer: "sentarse" },
    { text: "Cuando termine la frase, selecciona mirar la puerta.", answer: "mirar la puerta" },
    { text: "Elige la accion que haces con las piernas: saltar.", answer: "saltar" }
  ];
  const task = pick(tasks);
  currentAnswer = task.answer;
  currentPlayable = () => speak(task.text);
  gameStage.innerHTML = stagePrompt("Instruccion oral", "Ahora la respuesta depende de comprender toda la frase, no solo una palabra.");
  gameActions.innerHTML = `
    ${playButton()}
    ${shuffle(actionChoices).map(optionButton).join("")}
  `;
}

function playButton() {
  return `<button type="button" data-play="true" aria-label="Reproducir sonido">Reproducir</button>`;
}

function optionButton(value, label = value) {
  return `<button data-answer="${value}">${label}</button>`;
}

function stagePrompt(title, text) {
  return `
    <div class="stage-symbol prompt">
      <strong>${title}</strong>
      <span>${text}</span>
    </div>
  `;
}

gameActions.addEventListener("click", (event) => {
  const play = event.target.closest("[data-play]");
  if (!play || !currentPlayable) {
    return;
  }
  feedback.textContent = "Reproduciendo...";
  feedback.className = "feedback";
  currentPlayable();
});

function checkAnswer(answer) {
  if (!answer) {
    return;
  }
  const isCorrect = answer === currentAnswer;
  feedback.textContent = isCorrect ? "Correcto. Buen trabajo de escucha." : "Casi. Reproduce otra vez y vuelve a intentarlo.";
  feedback.className = `feedback ${isCorrect ? "ok" : "retry"}`;
  if (isCorrect) {
    window.setTimeout(renderGame, 1300);
  }
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function tone(frequency, start, duration, type = "sine", volume = 0.18) {
  const context = ensureAudio();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
}

function playSequence(pattern) {
  const context = ensureAudio();
  pattern.forEach((sound, index) => {
    window.setTimeout(() => playKnownSound(sound), index * 850);
  });
  return context;
}

function playKnownSound(sound) {
  const context = ensureAudio();
  const now = context.currentTime;

  if (sound === "phone") {
    tone(880, now, 0.18, "sine", 0.16);
    tone(1100, now + 0.22, 0.18, "sine", 0.16);
    tone(880, now + 0.48, 0.18, "sine", 0.16);
    tone(1100, now + 0.7, 0.18, "sine", 0.16);
  }

  if (sound === "car") {
    tone(220, now, 0.38, "sawtooth", 0.2);
    tone(185, now + 0.42, 0.32, "sawtooth", 0.18);
  }

  if (sound === "bell") {
    tone(740, now, 0.16, "triangle", 0.17);
    tone(980, now + 0.18, 0.24, "triangle", 0.15);
  }

  if (sound === "water") {
    for (let i = 0; i < 9; i += 1) {
      tone(420 + Math.random() * 360, now + i * 0.08, 0.07, "sine", 0.06);
    }
  }

  if (sound === "dog") {
    tone(360, now, 0.14, "square", 0.14);
    tone(300, now + 0.18, 0.16, "square", 0.13);
    tone(390, now + 0.46, 0.13, "square", 0.12);
  }

  if (sound === "beep-high") {
    tone(880, now, 0.28, "sine", 0.14);
  }

  if (sound === "beep-low") {
    tone(330, now, 0.28, "sine", 0.14);
  }
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    feedback.textContent = "Este navegador no tiene voz sintetica disponible. Puedes probar con Chrome o Edge.";
    feedback.className = "feedback retry";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.86;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

renderGame();
