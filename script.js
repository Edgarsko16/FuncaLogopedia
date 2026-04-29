const islandCopy = {
  "la-palma": {
    kicker: "La Palma",
    title: "Atención cercana y seguimiento coordinado",
    text: "El servicio adapta los objetivos de escucha, lenguaje y comunicación a las necesidades de la persona y su entorno familiar, educativo o laboral. <br><strong>¿Necesitas ayuda logopédica? Llama al 618 394 750 o contacta por email a <a href='mailto:logopedialapalma@funcasor.org'>logopedialapalma@funcasor.org</a>"
  },
  tenerife: { kicker: "Tenerife", 
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
    text: "La persona aprende a advertir si hay presencia o ausencia de sonido: por ejemplo, si suena un coche, un teléfono o si hay silencio.",
    kicker: "Detección",
    gameTitle: "Presencia o ausencia de sonido",
    instruction: "Pulsa reproducir y decide si has escuchado algún sonido o si ha habido silencio."
  },
  discriminacion: {
    title: "Discriminación",
    text: "Se entrenan diferencias entre sonidos: dos tonos iguales o diferentes, ritmos largos o cortos, sonidos fuertes o suaves.",
    kicker: "Discriminación",
    gameTitle: "Compara dos sonidos",
    instruction: "Pulsa reproducir y decide si los dos sonidos son iguales o diferentes."
  },
  identificacion: {
    title: "Identificación",
    text: "La persona reconoce un sonido dentro de un conjunto cerrado de opciones conocidas.",
    kicker: "Identificación",
    gameTitle: "Identifica el sonido",
    instruction: "Pulsa reproducir y elige si has escuchado un teléfono, un perro o un coche."
  },
  reconocimiento: {
    title: "Reconocimiento auditivo",
    text: "La persona reconoce sonidos cotidianos sin ver la respuesta antes: teléfono, coche, timbre, agua u otros sonidos familiares.",
    kicker: "Reconocimiento",
    gameTitle: "Qué sonido cotidiano es",
    instruction: "Pulsa reproducir y elige qué sonido conocido has escuchado."
  },
  comprension: {
    title: "Comprensión",
    text: "La escucha se usa para entender instrucciones con más información: acción, objeto, color, orden o condición.",
    kicker: "Comprensión",
    gameTitle: "Sigue la instrucción oral",
    instruction: "Pulsa reproducir, escucha la instrucción completa y elige la respuesta correcta."
  }
};

const soundNames = {
  car: "coche",
  phone: "teléfono",
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
let playbackTimers = [];
let activeOscillators = [];
let activeAudioElements = [];
let advanceTimer = null;
const lastSelections = {};

const remoteSoundEffects = {
  phone: {
    url: "https://assets.mixkit.co/active_storage/sfx/1350/1350-preview.mp3",
    duration: 1300,
    fallback: playPhoneRing
  },
  dog: {
    url: "https://assets.mixkit.co/active_storage/sfx/1/1-preview.mp3",
    duration: 1300,
    fallback: playDogBark
  },
  car: {
    url: "https://assets.mixkit.co/active_storage/sfx/1565/1565-preview.mp3",
    duration: 1300,
    fallback: playCarSound
  }
};

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
  stopPlayback();
  window.clearTimeout(advanceTimer);
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

}

function renderDetection() {
  const options = ["car", "phone", "quiet", "bell", "quiet"];
  const selected = pickDifferent(options, lastSelections.deteccion);
  lastSelections.deteccion = selected;
  currentAnswer = selected === "quiet" ? "quiet" : "sound";
  currentPlayable = () => {
    if (selected !== "quiet") {
      return playKnownSound(selected);
    }
    return 600;
  };
  gameStage.innerHTML = stagePrompt("Escucha y decide", "Puede sonar un coche, un teléfono, un timbre... o no sonar nada.");
  renderAnswerActions([
    { value: "sound", label: "Hay sonido" },
    { value: "quiet", label: "Silencio" }
  ]);
}

function renderDiscrimination() {
  const pairs = [
    { label: "tono corto + tono corto", answer: "same", pattern: ["beep-high", "beep-high"] },
    { label: "tono corto + tono grave", answer: "different", pattern: ["beep-high", "beep-low"] },
    { label: "teléfono + teléfono", answer: "same", pattern: ["phone", "phone"] },
    { label: "coche + timbre", answer: "different", pattern: ["car", "bell"] }
  ];
  const pair = pickDifferent(pairs, lastSelections.discriminacion, (item) => item.label);
  lastSelections.discriminacion = pair.label;
  currentAnswer = pair.answer;
  currentPlayable = () => playSequence(pair.pattern);
  gameStage.innerHTML = stagePrompt("Escucha dos sonidos", "Sonarán dos estímulos separados. No mires la respuesta: compara lo que oyes.");
  renderAnswerActions([
    { value: "same", label: "Iguales" },
    { value: "different", label: "Diferentes" }
  ]);
}

function renderIdentification() {
  const sounds = ["phone", "dog", "car"];
  currentAnswer = pickDifferent(sounds, lastSelections.identificacion);
  lastSelections.identificacion = currentAnswer;
  currentPlayable = () => playKnownSound(currentAnswer);
  gameStage.innerHTML = stagePrompt("Conjunto cerrado", "Escucha un sonido y selecciona una opción.");
  renderAnswerActions(shuffle(sounds).map((sound) => ({ value: sound, label: soundNames[sound] })));
}

function renderRecognition() {
  const sounds = ["car", "phone", "bell", "water", "dog"];
  const selected = pickDifferent(sounds, lastSelections.reconocimiento);
  lastSelections.reconocimiento = selected;
  currentAnswer = selected;
  currentPlayable = () => playKnownSound(selected);
  gameStage.innerHTML = stagePrompt("Reconocimiento auditivo", "Escucha un sonido cotidiano sin pista visual y di que es.");
  renderAnswerActions(shuffle(sounds).map((sound) => ({ value: sound, label: soundNames[sound] })));
}

function renderComprehension() {
  const tasks = [
    { text: "Después de escuchar, elige levantar la mano.", answer: "levantar la mano" },
    { text: "Si oyes la palabra mesa, selecciona tocar la mesa.", answer: "tocar la mesa" },
    { text: "Primero piensa en un coche y después elige aplaudir.", answer: "aplaudir" },
    { text: "No elijas saltar. La respuesta correcta es sentarse.", answer: "sentarse" },
    { text: "Cuando termine la frase, selecciona mirar la puerta.", answer: "mirar la puerta" },
    { text: "Elige la acción que haces con las piernas: saltar.", answer: "saltar" }
  ];
  const task = pickDifferent(tasks, lastSelections.comprension, (item) => item.answer);
  lastSelections.comprension = task.answer;
  currentAnswer = task.answer;
  currentPlayable = () => speak(task.text);
  gameStage.innerHTML = stagePrompt("Instrucción oral", "Ahora la respuesta depende de comprender toda la frase, no solo una palabra.");
  renderAnswerActions(makeOptionSet(currentAnswer, actionChoices, 4));
}

function playButton() {
  return `<button type="button" data-play="true" aria-label="Reproducir sonido">Reproducir</button>`;
}

function optionButton(value, label = value) {
  return `<button type="button" data-answer="${value}">${label}</button>`;
}

function renderAnswerActions(options) {
  gameActions.innerHTML = `
    ${playButton()}
    ${options.map((option) => optionButton(option.value, option.label)).join("")}
  `;
}

function makeOptionSet(answer, choices, total) {
  const distractors = shuffle(choices.filter((choice) => choice !== answer)).slice(0, total - 1);
  return shuffle([answer, ...distractors]).map((choice) => ({ value: choice, label: choice }));
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
  const answer = event.target.closest("[data-answer]");

  if (answer) {
    checkAnswer(answer.dataset.answer);
    return;
  }

  if (!play || !currentPlayable || play.disabled) {
    return;
  }

  stopPlayback();
  feedback.textContent = "Reproduciendo...";
  feedback.className = "feedback";
  const duration = currentPlayable() || 1200;
  play.disabled = true;
  playbackTimers.push(window.setTimeout(() => {
    play.disabled = false;
    if (feedback.textContent === "Reproduciendo...") {
      feedback.textContent = "Ahora elige una opcion.";
    }
  }, duration));
});

function checkAnswer(answer) {
  if (!answer) {
    return;
  }
  const isCorrect = answer === currentAnswer;
  feedback.textContent = isCorrect ? "Correcto. Buen trabajo de escucha." : "Casi. Reproduce otra vez y vuelve a intentarlo.";
  feedback.className = `feedback ${isCorrect ? "ok" : "retry"}`;
  if (isCorrect) {
    advanceTimer = window.setTimeout(renderGame, 1300);
  }
}

function stopPlayback() {
  playbackTimers.forEach((timer) => window.clearTimeout(timer));
  playbackTimers = [];
  activeOscillators.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch (error) {
      // The oscillator may already have stopped.
    }
  });
  activeOscillators = [];
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
  activeOscillators.push(oscillator);
  oscillator.onended = () => {
    activeOscillators = activeOscillators.filter((item) => item !== oscillator);
  };
}

function sweepTone(startFrequency, endFrequency, start, duration, type = "sine", volume = 0.18) {
  const context = ensureAudio();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(startFrequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
  activeOscillators.push(oscillator);
  oscillator.onended = () => {
    activeOscillators = activeOscillators.filter((item) => item !== oscillator);
  };
}

function playSequence(pattern) {
  ensureAudio();
  pattern.forEach((sound, index) => {
    const timer = window.setTimeout(() => playKnownSound(sound), index * 850);
    playbackTimers.push(timer);
  });
  return pattern.length * 850 + 500;
}

function playNoise(start, duration, frequency = null, volume = 0.2, filterType = "lowpass", q = 0.7) {
  const context = ensureAudio();
  const bufferSize = context.sampleRate * duration;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const source = context.createBufferSource();
  source.buffer = buffer;
  
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  
  if (frequency) {
    const filter = context.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    source.connect(filter);
    filter.connect(gain);
  } else {
    source.connect(gain);
  }
  
  gain.connect(context.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
  activeOscillators.push(source);
  source.onended = () => {
    activeOscillators = activeOscillators.filter((item) => item !== source);
  };
}

function playPhoneRing(start) {
  [0, 0.34, 0.88, 1.22].forEach((offset) => {
    tone(440, start + offset, 0.22, "sine", 0.18);
    tone(480, start + offset, 0.22, "sine", 0.18);
    tone(1760, start + offset, 0.08, "triangle", 0.08);
  });
}

function playDogBark(start) {
  [0, 0.34, 0.82].forEach((offset, index) => {
    const barkStart = start + offset;
    playNoise(barkStart, 0.16, 900 - index * 90, 0.32, "bandpass", 5);
    sweepTone(520 - index * 35, 180, barkStart + 0.02, 0.18, "sawtooth", 0.16);
    tone(120, barkStart + 0.04, 0.12, "square", 0.08);
  });
}

function playCarSound(start) {
  playNoise(start, 1.05, 170, 0.34, "lowpass", 0.9);
  sweepTone(95, 145, start, 0.55, "sawtooth", 0.12);
  sweepTone(145, 90, start + 0.55, 0.5, "sawtooth", 0.1);
  tone(330, start + 1.1, 0.22, "square", 0.18);
  tone(392, start + 1.1, 0.22, "square", 0.14);
  tone(330, start + 1.4, 0.18, "square", 0.16);
  tone(392, start + 1.4, 0.18, "square", 0.12);
}

function preloadRemoteSounds() {
  Object.entries(remoteSoundEffects).forEach(([sound, effect]) => {
    if (!soundCache[sound]) {
      soundCache[sound] = new Audio(effect.url);
      soundCache[sound].preload = "auto";
    }
  });
}

function playRemoteSound(sound) {
  const effect = remoteSoundEffects[sound];
  if (!effect) {
    return null;
  }

  const cachedAudio = soundCache[sound] || new Audio(effect.url);
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
    effect.fallback(ensureAudio().currentTime);
  }, { once: true });

  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(() => {
      activeAudioElements = activeAudioElements.filter((item) => item !== audio);
      effect.fallback(ensureAudio().currentTime);
    });
  }

  return effect.duration;
}

function playKnownSound(sound) {
  const context = ensureAudio();
  const now = context.currentTime;
  const remoteDuration = playRemoteSound(sound);

  if (remoteDuration) {
    return remoteDuration;
  }

  if (sound === "phone") {
    // Telefono: doble timbre con armonicos, mas parecido a una llamada.
    playPhoneRing(now);
    return 1900;
  }

  if (sound === "car") {
    // Coche: motor grave con una bocina breve para que sea reconocible.
    playCarSound(now);
    return 1900;
  }

  if (sound === "bell") {
    // Timbre: tonos agudos claros.
    tone(800, now, 0.15, "triangle", 0.35);
    tone(1000, now + 0.1, 0.2, "triangle", 0.32);
    tone(1200, now + 0.35, 0.15, "triangle", 0.28);
    return 1300;
  }

  if (sound === "water") {
    // Agua: ruido brillante y continuo.
    playNoise(now, 1.2, 5200, 0.22, "highpass", 0.8);
    playNoise(now + 0.1, 1.0, 1800, 0.16, "bandpass", 1.4);
    return 1600;
  }

  if (sound === "dog") {
    // Perro: tres ladridos cortos con golpe grave.
    playDogBark(now);
    return 1600;
  }

  if (sound === "beep-high") {
    tone(880, now, 0.35, "sine", 0.28);
    return 900;
  }

  if (sound === "beep-low") {
    tone(330, now, 0.35, "sine", 0.28);
    return 900;
  }

  return 1600;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    feedback.textContent = "Este navegador no tiene voz sintética disponible. Puedes probar con Chrome o Edge.";
    feedback.className = "feedback retry";
    return 0;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.86;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
  return Math.max(1700, text.length * 55);
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickDifferent(items, previous, getKey = (item) => item) {
  if (items.length < 2) {
    return pick(items);
  }
  const available = items.filter((item) => getKey(item) !== previous);
  return pick(available.length ? available : items);
}

function shuffle(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

preloadRemoteSounds();
renderGame();
