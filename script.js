const islandCopy = {
  "la-palma": {
    kicker: "La Palma",
    title: "Atención cercana y seguimiento coordinado",
    text: "El servicio adapta los objetivos de escucha, lenguaje y comunicación a las necesidades de la persona y su entorno familiar, educativo o laboral. <br><strong>¿Necesitas ayuda logopédica? Llama al 618 394 750 o contacta por email a <a href='mailto:logopedialapalma@funcasor.org'>logopedialapalma@funcasor.org</a>"
  },
  tenerife: {
    kicker: "Tenerife",
    title: "Intervención especializada y recursos compartidos",
    text: "La isla funciona como un punto clave para valorar necesidades, planificar sesiones y coordinar apoyos con familias, centros educativos y otros profesionales. <br><strong>¿Necesitas ayuda logopédica? Llama al 646 210 763 o contacta por email a <a href='mailto:logopediatenerife@funcasor.org'>logopediatenerife@funcasor.org</a>"
  },
  "gran-canaria": {
    kicker: "Gran Canaria",
    title: "Rehabilitación auditiva orientada a la participación",
    text: "El trabajo logopédico se centra en que la persona use la audición y el lenguaje en conversaciones, rutinas, aprendizaje y autonomía diaria. <br><strong>¿Necesitas ayuda logopédica? Llama al 646 964 470 o contacta por email a <a href='mailto:logopediagc@funcasor.org'>logopediagc@funcasor.org</a>"
  }
};

const rehabCopy = {
  deteccion: {
    title: "Detección",
    text: "La persona aprende a advertir la presencia o ausencia de sonido. Es la base para responder a la voz, sonidos ambientales y señales de alerta.",
    gameTitle: "Presencia o ausencia de sonido",
    instruction: "Pulsa reproducir y decide si hay sonido o silencio."
  },
  discriminacion: {
    title: "Discriminación",
    text: "La persona compara dos estímulos y percibe si son iguales o diferentes atendiendo a rasgos como altura, duración o intensidad.",
    gameTitle: "Comparación de dos estímulos",
    instruction: "Escucha los dos tonos y decide si son iguales o diferentes."
  },
  identificacion: {
    title: "Identificación",
    text: "La persona escucha una palabra y la identifica dentro de un conjunto cerrado de opciones conocidas que puede ver desde el principio.",
    gameTitle: "Elección dentro de un conjunto cerrado",
    instruction: "Observa las tres opciones, escucha la palabra y selecciona la que has oído."
  },
  reconocimiento: {
    title: "Reconocimiento",
    text: "La persona reconoce un sonido cotidiano sin recibir una pista previa clara sobre cuál va a escuchar.",
    gameTitle: "Reconocimiento de sonidos cotidianos",
    instruction: "Escucha el estímulo sin pista previa y responde: ¿qué has escuchado?"
  },
  comprension: {
    title: "Comprensión",
    text: "La persona procesa una instrucción oral completa y responde teniendo en cuenta acción, objeto, color y, en ocasiones, el orden.",
    gameTitle: "Comprensión de instrucciones orales",
    instruction: "Escucha la instrucción completa y realiza la acción indicada."
  }
};

const soundNames = {
  dog: "Perro",
  phone: "Teléfono",
  car: "Coche",
  water: "Agua",
  bell: "Timbre"
};

const targetNames = {
  "blue-circle": "círculo azul",
  "red-square": "cuadrado rojo",
  "yellow-triangle": "triángulo amarillo",
  dog: "perro",
  car: "coche",
  phone: "teléfono"
};

const everydaySoundFiles = {
  dog: { src: "sounds/dog-bark.mp3", duration: 1800 },
  car: { src: "sounds/car-horn.mp3", duration: 1800 },
  phone: { src: "sounds/telephone-ring.mp3", duration: 4200 },
  bell: { src: "sounds/doorbell.mp3", duration: 4200 },
  water: { src: "sounds/water-flowing.mp3", duration: 4200 }
};

const positiveFeedback = "Correcto. Esta respuesta refleja la habilidad auditiva trabajada.";
const retryFeedback = "Inténtalo de nuevo. Vuelve a escuchar el estímulo con atención.";

let currentGame = "deteccion";
let currentAnswer = null;
let currentPlayable = null;
let currentSequence = [];
let audioContext = null;
let playbackTimers = [];
let activeSources = [];
let activeAudioElements = [];
let advanceTimer = null;
const lastSelections = {};
const soundCache = {};

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

document.querySelector("#reset-game").addEventListener("click", renderGame);

function setGame(game) {
  currentGame = game;
  document.querySelectorAll(".phase").forEach((item) => {
    item.classList.toggle("active", item.dataset.game === game);
  });
  const copy = rehabCopy[game];
  rehabDetail.innerHTML = `<h3>${copy.title}</h3><p>${copy.text}</p>`;
  gameKicker.textContent = copy.title;
  gameTitle.textContent = copy.gameTitle;
  gameInstruction.textContent = copy.instruction;
  renderGame();
}

function renderGame() {
  stopPlayback();
  window.clearTimeout(advanceTimer);
  currentPlayable = null;
  currentSequence = [];
  setFeedback("");

  const renderers = {
    deteccion: renderDetection,
    discriminacion: renderDiscrimination,
    identificacion: renderIdentification,
    reconocimiento: renderRecognition,
    comprension: renderComprehension
  };
  renderers[currentGame]();
}

function renderDetection() {
  const stimulus = pickDifferent(["sound", "quiet"], lastSelections.deteccion);
  lastSelections.deteccion = stimulus;
  currentAnswer = stimulus;
  currentPlayable = stimulus === "sound" ? playDetectionTone : () => 850;
  gameStage.innerHTML = stagePrompt(
    "¿Hay sonido o silencio?",
    "La única pista válida será lo que escuches al pulsar reproducir.",
    "Escucha atenta"
  );
  renderAnswerActions([
    { value: "sound", label: "Hay sonido" },
    { value: "quiet", label: "Silencio" }
  ]);
}

function renderDiscrimination() {
  const pairs = [
    { key: "high-same", answer: "same", trait: "Altura: agudo / grave", tones: [{ frequency: 880 }, { frequency: 880 }] },
    { key: "high-low", answer: "different", trait: "Altura: agudo / grave", tones: [{ frequency: 880 }, { frequency: 260 }] },
    { key: "long-same", answer: "same", trait: "Duración: largo / corto", tones: [{ duration: 0.65 }, { duration: 0.65 }] },
    { key: "long-short", answer: "different", trait: "Duración: largo / corto", tones: [{ duration: 0.7 }, { duration: 0.18 }] },
    { key: "loud-same", answer: "same", trait: "Intensidad: fuerte / suave", tones: [{ volume: 0.25 }, { volume: 0.25 }] },
    { key: "loud-soft", answer: "different", trait: "Intensidad: fuerte / suave", tones: [{ volume: 0.28 }, { volume: 0.06 }] }
  ];
  const pair = pickDifferent(pairs, lastSelections.discriminacion, (item) => item.key);
  lastSelections.discriminacion = pair.key;
  currentAnswer = pair.answer;
  currentPlayable = () => playTonePair(pair.tones);
  gameStage.innerHTML = stagePrompt("Compara dos estímulos", `Contraste trabajado: ${pair.trait}.`, "1.º sonido · pausa · 2.º sonido");
  renderAnswerActions([
    { value: "same", label: "Iguales" },
    { value: "different", label: "Diferentes" }
  ]);
}

function renderIdentification() {
  const words = ["perro", "coche", "teléfono"];
  currentAnswer = pickDifferent(words, lastSelections.identificacion);
  lastSelections.identificacion = currentAnswer;
  currentPlayable = () => speak(currentAnswer);
  gameStage.innerHTML = `
    <div class="closed-set" aria-label="Conjunto cerrado de opciones conocidas">
      ${words.map((word) => identificationTarget(word)).join("")}
    </div>
  `;
  gameActions.innerHTML = playButton("Reproducir palabra");
}

function renderRecognition() {
  const sounds = Object.keys(soundNames);
  currentAnswer = pickDifferent(sounds, lastSelections.reconocimiento);
  lastSelections.reconocimiento = currentAnswer;
  currentPlayable = () => playEverydaySound(currentAnswer);
  gameStage.innerHTML = stagePrompt(
    "¿Qué has escuchado?",
    "No se muestra ninguna pista sobre el sonido antes de reproducirlo.",
    "Sonido cotidiano"
  );
  renderAnswerActions(shuffle(sounds).map((sound) => ({ value: sound, label: soundNames[sound] })));
}

function renderComprehension() {
  const tasks = [
    { text: "Toca el círculo azul.", answer: ["blue-circle"] },
    { text: "Selecciona el cuadrado rojo.", answer: ["red-square"] },
    { text: "Toca el triángulo amarillo.", answer: ["yellow-triangle"] },
    { text: "Primero elige el perro y después el coche.", answer: ["dog", "car"] },
    { text: "Primero selecciona el coche y después el teléfono.", answer: ["car", "phone"] }
  ];
  const task = pickDifferent(tasks, lastSelections.comprension, (item) => item.text);
  lastSelections.comprension = task.text;
  currentAnswer = task.answer;
  currentPlayable = () => speak(task.text);
  gameStage.innerHTML = `
    <div class="comprehension-board" aria-label="Opciones para seguir la instrucción oral">
      ${comprehensionTarget("blue-circle", "shape circle blue", "Círculo azul")}
      ${comprehensionTarget("red-square", "shape square red", "Cuadrado rojo")}
      ${comprehensionTarget("yellow-triangle", "shape triangle yellow", "Triángulo amarillo")}
      ${comprehensionTarget("dog", "object-target", "Perro", "PERRO")}
      ${comprehensionTarget("car", "object-target", "Coche", "COCHE")}
      ${comprehensionTarget("phone", "object-target", "Teléfono", "TELÉFONO")}
    </div>
  `;
  gameActions.innerHTML = `
    ${playButton("Escuchar instrucción")}
    <button type="button" data-clear-sequence>Limpiar selección</button>
    <span class="sequence-status" id="sequence-status">${sequenceStatus()}</span>
  `;
}

function comprehensionTarget(value, className, label, visibleText = "") {
  return `<button type="button" class="comprehension-target ${className}" data-sequence-answer="${value}" aria-label="${label}">${visibleText}</button>`;
}

function identificationTarget(word) {
  return `
    <button type="button" class="identification-target" data-answer="${word}">
      <span class="choice-icon" aria-hidden="true">${choiceIcon(word)}</span>
      <strong>${capitalize(word)}</strong>
    </button>
  `;
}

function choiceIcon(word) {
  const icons = {
    perro: `<svg viewBox="0 0 64 64"><path d="M18 25 9 15v24h9v13h9V39h13v13h9V34l7-7-7-7-8 5H18Zm25 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/></svg>`,
    coche: `<svg viewBox="0 0 64 64"><path d="m14 19-6 17v13h8v-6h32v6h8V36l-6-17H14Zm5 4h26l4 12H15l4-12Zm-2 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm30 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"/></svg>`,
    teléfono: `<svg viewBox="0 0 64 64"><path d="M20 8h24a6 6 0 0 1 6 6v36a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6Zm0 8v29h24V16H20Zm12 38a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>`
  };
  return icons[word];
}

function stagePrompt(title, text, badge) {
  return `
    <div class="stage-symbol prompt">
      <small>${badge}</small>
      <strong>${title}</strong>
      <span>${text}</span>
    </div>
  `;
}

function playButton(label = "Reproducir") {
  return `<button type="button" data-play aria-label="${label}">${label}</button>`;
}

function renderAnswerActions(options) {
  gameActions.innerHTML = `
    ${playButton()}
    ${options.map((option) => `<button type="button" data-answer="${option.value}">${option.label}</button>`).join("")}
  `;
}

gameActions.addEventListener("click", (event) => {
  const play = event.target.closest("[data-play]");
  const answer = event.target.closest("[data-answer]");
  const clear = event.target.closest("[data-clear-sequence]");
  if (answer) {
    checkAnswer(answer.dataset.answer);
  } else if (clear) {
    currentSequence = [];
    updateSequenceStatus();
    setFeedback("");
  } else if (play) {
    playCurrentStimulus(play);
  }
});

gameStage.addEventListener("click", (event) => {
  const answer = event.target.closest("[data-answer]");
  if (answer && currentGame === "identificacion") {
    checkAnswer(answer.dataset.answer);
    return;
  }

  const target = event.target.closest("[data-sequence-answer]");
  if (!target || currentGame !== "comprension") {
    return;
  }
  currentSequence.push(target.dataset.sequenceAnswer);
  updateSequenceStatus();
  if (currentSequence.length === currentAnswer.length) {
    checkSequenceAnswer();
  }
});

function playCurrentStimulus(button) {
  if (!currentPlayable || button.disabled) {
    return;
  }
  stopPlayback();
  setFeedback("Reproduciendo estímulo...");
  const duration = currentPlayable() || 1400;
  button.disabled = true;
  playbackTimers.push(window.setTimeout(() => {
    button.disabled = false;
    if (feedback.textContent === "Reproduciendo estímulo...") {
      setFeedback("Ahora selecciona tu respuesta.");
    }
  }, duration));
}

function checkAnswer(answer) {
  const isCorrect = answer === currentAnswer;
  setFeedback(isCorrect ? positiveFeedback : retryFeedback, isCorrect ? "ok" : "retry");
  if (isCorrect) {
    advanceTimer = window.setTimeout(renderGame, 2200);
  }
}

function checkSequenceAnswer() {
  const isCorrect = currentAnswer.every((answer, index) => answer === currentSequence[index]);
  setFeedback(isCorrect ? positiveFeedback : retryFeedback, isCorrect ? "ok" : "retry");
  if (isCorrect) {
    advanceTimer = window.setTimeout(renderGame, 2200);
  } else {
    currentSequence = [];
    updateSequenceStatus();
  }
}

function sequenceStatus() {
  return currentSequence.length
    ? `Selección: ${currentSequence.map((item) => targetNames[item]).join(" → ")}`
    : "Selección: ninguna";
}

function updateSequenceStatus() {
  const status = document.querySelector("#sequence-status");
  if (status) {
    status.textContent = sequenceStatus();
  }
}

function setFeedback(message, state = "") {
  feedback.textContent = message;
  feedback.className = `feedback ${state}`.trim();
}

function stopPlayback() {
  playbackTimers.forEach((timer) => window.clearTimeout(timer));
  playbackTimers = [];
  activeSources.forEach((source) => {
    try {
      source.stop();
    } catch (error) {
      // La fuente puede haber terminado de forma natural.
    }
  });
  activeSources = [];
  activeAudioElements.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  activeAudioElements = [];
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
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

function tone({ frequency = 520, start, duration = 0.35, type = "sine", volume = 0.18 }) {
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
  trackSource(oscillator);
}

function noise({ start, duration = 0.8, frequency = 1500, filterType = "bandpass", volume = 0.16 }) {
  const context = ensureAudio();
  const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = filterType;
  filter.frequency.value = frequency;
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
  trackSource(source);
}

function trackSource(source) {
  activeSources.push(source);
  source.onended = () => {
    activeSources = activeSources.filter((item) => item !== source);
  };
}

function playDetectionTone() {
  const now = ensureAudio().currentTime;
  tone({ frequency: 620, start: now, duration: 0.55, volume: 0.22 });
  return 850;
}

function playTonePair(tones) {
  const now = ensureAudio().currentTime;
  tones.forEach((settings, index) => {
    tone({ frequency: 520, duration: 0.35, volume: 0.18, ...settings, start: now + index * 0.95 });
  });
  return 2200;
}

function playEverydaySound(sound) {
  const effect = everydaySoundFiles[sound];
  if (!effect) {
    return playSynthesizedEverydaySound(sound);
  }

  const cachedAudio = soundCache[sound] || new Audio(effect.src);
  soundCache[sound] = cachedAudio;
  const audio = cachedAudio.cloneNode();
  audio.preload = "auto";
  audio.volume = 0.9;
  activeAudioElements.push(audio);

  audio.addEventListener("ended", () => {
    activeAudioElements = activeAudioElements.filter((item) => item !== audio);
  }, { once: true });

  audio.addEventListener("error", () => {
    activeAudioElements = activeAudioElements.filter((item) => item !== audio);
    playSynthesizedEverydaySound(sound);
  }, { once: true });

  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(() => {
      activeAudioElements = activeAudioElements.filter((item) => item !== audio);
      playSynthesizedEverydaySound(sound);
    });
  }

  return effect.duration;
}

// Respaldo local por Web Audio para navegadores que no puedan reproducir los MP3.
function playSynthesizedEverydaySound(sound) {
  const now = ensureAudio().currentTime;
  if (sound === "phone") {
    // Cadencia de llamada clásica: dos ráfagas claras de timbre.
    [0, 0.16, 0.32, 0.85, 1.01, 1.17].forEach((offset) => {
      tone({ frequency: 440, start: now + offset, duration: 0.12, type: "square", volume: 0.11 });
      tone({ frequency: 620, start: now + offset, duration: 0.12, type: "square", volume: 0.08 });
    });
    return 1700;
  }
  if (sound === "dog") {
    // Tres ladridos breves con ataque de ruido y cuerpo grave.
    [0, 0.42, 0.92].forEach((offset) => {
      noise({ start: now + offset, duration: 0.16, frequency: 950, volume: 0.34 });
      tone({ frequency: 185, start: now + offset, duration: 0.18, type: "sawtooth", volume: 0.16 });
      tone({ frequency: 125, start: now + offset + 0.08, duration: 0.13, type: "square", volume: 0.08 });
    });
    return 1500;
  }
  if (sound === "car") {
    // Bocina de coche de dos tonos, repetida dos veces.
    [0, 0.62].forEach((offset) => {
      tone({ frequency: 370, start: now + offset, duration: 0.34, type: "square", volume: 0.2 });
      tone({ frequency: 466, start: now + offset, duration: 0.34, type: "square", volume: 0.15 });
    });
    return 1400;
  }
  if (sound === "water") {
    // Flujo continuo con pequeñas gotas agudas.
    noise({ start: now, duration: 1.7, frequency: 3000, filterType: "highpass", volume: 0.24 });
    [0.18, 0.52, 0.9, 1.28].forEach((offset, index) => {
      tone({ frequency: 1250 + index * 110, start: now + offset, duration: 0.05, type: "sine", volume: 0.08 });
    });
    return 1900;
  }
  // Timbre doméstico: secuencia descendente "ding-dong".
  tone({ frequency: 880, start: now, duration: 0.65, type: "sine", volume: 0.24 });
  tone({ frequency: 1320, start: now, duration: 0.45, type: "sine", volume: 0.08 });
  tone({ frequency: 660, start: now + 0.55, duration: 0.8, type: "sine", volume: 0.24 });
  tone({ frequency: 990, start: now + 0.55, duration: 0.55, type: "sine", volume: 0.07 });
  return 1650;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    setFeedback("Este navegador no dispone de voz sintética. Prueba la actividad en Chrome o Edge.", "retry");
    return 0;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const spanishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith("es"));
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  utterance.lang = "es-ES";
  utterance.rate = 0.82;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
  return Math.max(1500, text.length * 70);
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickDifferent(items, previous, getKey = (item) => item) {
  const available = items.filter((item) => getKey(item) !== previous);
  return pick(available.length ? available : items);
}

function shuffle(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

Object.entries(everydaySoundFiles).forEach(([sound, effect]) => {
  soundCache[sound] = new Audio(effect.src);
  soundCache[sound].preload = "auto";
});

renderGame();
