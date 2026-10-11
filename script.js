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
    text: "La persona escucha palabras o secuencias y las identifica dentro de un conjunto cerrado de opciones conocidas que puede ver desde el principio.",
    gameTitle: "Elección dentro de un conjunto cerrado",
    instruction: "Observa el conjunto de opciones, escucha la palabra o secuencia y selecciona sus elementos en el mismo orden."
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
    instruction: "Escucha la instrucción completa y realiza la acción indicada. Puedes mostrar el texto como apoyo accesible."
  }
};

const soundNames = {
  dog: "Perro",
  phone: "Teléfono",
  car: "Coche",
  water: "Agua",
  bell: "Timbre",
  rain: "Lluvia",
  applause: "Aplausos",
  birds: "Pájaros",
  clock: "Reloj",
  ambulance: "Ambulancia",
  door: "Puerta",
  motorcycle: "Motocicleta"
};

const recognitionOptionCounts = {
  dog: 3,
  car: 3,
  phone: 4,
  bell: 4,
  water: 4,
  rain: 4,
  birds: 5,
  clock: 5,
  door: 5,
  applause: 6,
  ambulance: 6,
  motorcycle: 6
};

const targetNames = {
  "blue-circle": "círculo azul",
  "red-square": "cuadrado rojo",
  "yellow-triangle": "triángulo amarillo",
  dog: "perro",
  car: "coche",
  phone: "teléfono",
  fish: "pez",
  bird: "pájaro",
  motorcycle: "motocicleta",
  clock: "reloj",
  boat: "barco",
  door: "puerta",
  cat: "gato",
  duck: "pato",
  house: "casa",
  cup: "taza",
  photo: "foto",
  table: "mesa",
  strawberry: "fresa",
  ball: "pelota",
  boot: "bota"
};

const identificationTargets = {
  dog: { label: "Perro", symbol: "🐕" },
  car: { label: "Coche", symbol: "🚗" },
  phone: { label: "Teléfono", symbol: "☎️" },
  fish: { label: "Pez", symbol: "🐟" },
  bird: { label: "Pájaro", symbol: "🐦" },
  motorcycle: { label: "Moto", symbol: "🏍️" },
  clock: { label: "Reloj", symbol: "🕒" },
  boat: { label: "Barco", symbol: "⛵" },
  door: { label: "Puerta", symbol: "🚪" },
  cat: { label: "Gato", symbol: "🐈" },
  duck: { label: "Pato", symbol: "🦆" },
  house: { label: "Casa", symbol: "🏠" },
  cup: { label: "Taza", symbol: "☕" },
  photo: { label: "Foto", symbol: "🖼️" },
  table: { label: "Mesa", symbol: "🪑" },
  strawberry: { label: "Fresa", symbol: "🍓" },
  ball: { label: "Pelota", symbol: "⚽" },
  boot: { label: "Bota", symbol: "👢" }
};

const identificationTasks = [
  // Nivel 1: una palabra y tres alternativas claramente distintas.
  { id: "id-1-dog", level: 1, answer: ["dog"], options: ["dog", "car", "phone"] },
  { id: "id-1-car", level: 1, answer: ["car"], options: ["dog", "car", "phone"] },
  { id: "id-1-phone", level: 1, answer: ["phone"], options: ["dog", "car", "phone"] },
  { id: "id-1-fish", level: 1, answer: ["fish"], options: ["fish", "clock", "door"] },
  { id: "id-1-bird", level: 1, answer: ["bird"], options: ["bird", "boat", "house"] },
  { id: "id-1-clock", level: 1, answer: ["clock"], options: ["clock", "cat", "motorcycle"] },

  // Nivel 2: una palabra, cuatro alternativas y distractores fonológicamente próximos.
  { id: "id-2-cat", level: 2, answer: ["cat"], options: ["cat", "duck", "dog", "bird"] },
  { id: "id-2-duck", level: 2, answer: ["duck"], options: ["cat", "duck", "dog", "bird"] },
  { id: "id-2-house", level: 2, answer: ["house"], options: ["house", "cup", "door", "clock"] },
  { id: "id-2-cup", level: 2, answer: ["cup"], options: ["house", "cup", "door", "clock"] },
  { id: "id-2-motorcycle", level: 2, answer: ["motorcycle"], options: ["motorcycle", "photo", "car", "boat"] },
  { id: "id-2-photo", level: 2, answer: ["photo"], options: ["motorcycle", "photo", "car", "boat"] },
  { id: "id-2-table", level: 2, answer: ["table"], options: ["table", "strawberry", "house", "cup"] },
  { id: "id-2-strawberry", level: 2, answer: ["strawberry"], options: ["table", "strawberry", "house", "cup"] },
  { id: "id-2-ball", level: 2, answer: ["ball"], options: ["ball", "boot", "photo", "cup"] },
  { id: "id-2-boot", level: 2, answer: ["boot"], options: ["ball", "boot", "photo", "cup"] },

  // Niveles 3 a 5: secuencias cada vez más largas dentro de un conjunto cerrado.
  { id: "id-3-dog-car", level: 3, answer: ["dog", "car"], options: ["dog", "car", "phone", "clock"] },
  { id: "id-3-car-phone", level: 3, answer: ["car", "phone"], options: ["dog", "car", "phone", "clock"] },
  { id: "id-3-fish-bird", level: 3, answer: ["fish", "bird"], options: ["fish", "bird", "boat", "door"] },
  { id: "id-3-clock-door", level: 3, answer: ["clock", "door"], options: ["clock", "door", "phone", "house"] },
  { id: "id-3-cat-duck", level: 3, answer: ["cat", "duck"], options: ["cat", "duck", "dog", "bird"] },
  { id: "id-3-motorcycle-photo", level: 3, answer: ["motorcycle", "photo"], options: ["motorcycle", "photo", "car", "boat"] },
  { id: "id-4-dog-car-phone", level: 4, answer: ["dog", "car", "phone"], options: ["dog", "car", "phone", "clock", "door"] },
  { id: "id-4-fish-bird-boat", level: 4, answer: ["fish", "bird", "boat"], options: ["fish", "bird", "boat", "dog", "car"] },
  { id: "id-4-clock-door-phone", level: 4, answer: ["clock", "door", "phone"], options: ["clock", "door", "phone", "house", "cup"] },
  { id: "id-4-cat-duck-dog", level: 4, answer: ["cat", "duck", "dog"], options: ["cat", "duck", "dog", "bird", "fish"] },
  { id: "id-4-house-cup-table", level: 4, answer: ["house", "cup", "table"], options: ["house", "cup", "table", "strawberry", "door"] },
  { id: "id-4-motorcycle-photo-car", level: 4, answer: ["motorcycle", "photo", "car"], options: ["motorcycle", "photo", "car", "boat", "clock"] },
  { id: "id-5-dog-car-phone-clock", level: 5, answer: ["dog", "car", "phone", "clock"], options: ["dog", "car", "phone", "clock", "door", "house"] },
  { id: "id-5-fish-bird-boat-door", level: 5, answer: ["fish", "bird", "boat", "door"], options: ["fish", "bird", "boat", "door", "dog", "car"] },
  { id: "id-5-cat-duck-house-cup", level: 5, answer: ["cat", "duck", "house", "cup"], options: ["cat", "duck", "house", "cup", "dog", "bird"] },
  { id: "id-5-motorcycle-photo-car-clock", level: 5, answer: ["motorcycle", "photo", "car", "clock"], options: ["motorcycle", "photo", "car", "clock", "boat", "door"] },
  { id: "id-5-table-strawberry-ball-boot", level: 5, answer: ["table", "strawberry", "ball", "boot"], options: ["table", "strawberry", "ball", "boot", "house", "cup"] },
  { id: "id-5-house-table-cup-door", level: 5, answer: ["house", "table", "cup", "door"], options: ["house", "table", "cup", "door", "clock", "phone"] }
];

const comprehensionTargets = {
  "blue-circle": { className: "shape circle blue", label: "Círculo azul" },
  "red-square": { className: "shape square red", label: "Cuadrado rojo" },
  "yellow-triangle": { className: "shape triangle yellow", label: "Triángulo amarillo" },
  dog: { className: "object-target", label: "Perro", symbol: "🐕" },
  car: { className: "object-target", label: "Coche", symbol: "🚗" },
  phone: { className: "object-target", label: "Teléfono", symbol: "☎️" },
  fish: { className: "object-target", label: "Pez", symbol: "🐟" },
  bird: { className: "object-target", label: "Pájaro", symbol: "🐦" },
  motorcycle: { className: "object-target", label: "Motocicleta", symbol: "🏍️" },
  clock: { className: "object-target", label: "Reloj", symbol: "🕒" },
  boat: { className: "object-target", label: "Barco", symbol: "⛵" },
  door: { className: "object-target", label: "Puerta", symbol: "🚪" }
};

const comprehensionTasks = [
  { level: 1, text: "Toca el círculo azul.", answer: ["blue-circle"], options: ["blue-circle", "red-square", "yellow-triangle"] },
  { level: 1, text: "Selecciona el cuadrado rojo.", answer: ["red-square"], options: ["blue-circle", "red-square", "yellow-triangle"] },
  { level: 1, text: "Toca el triángulo amarillo.", answer: ["yellow-triangle"], options: ["blue-circle", "red-square", "yellow-triangle"] },
  { level: 1, text: "Selecciona el perro.", answer: ["dog"], options: ["dog", "fish", "bird"] },
  { level: 1, text: "Toca el coche.", answer: ["car"], options: ["car", "motorcycle", "boat"] },
  { level: 1, text: "Selecciona el reloj.", answer: ["clock"], options: ["clock", "phone", "door"] },
  { level: 2, text: "Selecciona el animal que vive en el agua.", answer: ["fish"], options: ["dog", "fish", "bird"] },
  { level: 2, text: "¿Qué animal puede volar? Selecciónalo.", answer: ["bird"], options: ["dog", "fish", "bird"] },
  { level: 2, text: "Selecciona el vehículo que tiene dos ruedas.", answer: ["motorcycle"], options: ["car", "motorcycle", "boat"] },
  { level: 2, text: "¿Qué objeto sirve para saber la hora? Tócalo.", answer: ["clock"], options: ["clock", "phone", "door"] },
  { level: 2, text: "Selecciona el medio de transporte que navega por el agua.", answer: ["boat"], options: ["car", "motorcycle", "boat"] },
  { level: 2, text: "¿Qué objeto usamos para hablar con alguien que está lejos?", answer: ["phone"], options: ["clock", "phone", "door"] },
  { level: 2, text: "Primero elige el perro y después el coche.", answer: ["dog", "car"], options: ["dog", "car", "phone"] },
  { level: 2, text: "Primero selecciona el coche y después el teléfono.", answer: ["car", "phone"], options: ["dog", "car", "phone"] },
  { level: 2, text: "Primero toca el pez y después el pájaro.", answer: ["fish", "bird"], options: ["dog", "fish", "bird"] },
  { level: 2, text: "Primero toca el reloj y después la puerta.", answer: ["clock", "door"], options: ["clock", "phone", "door"] },
  { level: 2, text: "Selecciona el animal que vive en el agua y después el que vuela.", answer: ["fish", "bird"], options: ["dog", "fish", "bird"] },
  { level: 2, text: "Toca primero el perro y después el vehículo de dos ruedas.", answer: ["dog", "motorcycle"], options: ["dog", "car", "motorcycle", "boat"] },
  { level: 2, text: "Selecciona primero el objeto que indica la hora y después el teléfono.", answer: ["clock", "phone"], options: ["clock", "phone", "door"] },
  { level: 2, text: "Toca primero el barco y después el coche.", answer: ["boat", "car"], options: ["boat", "car", "motorcycle"] },
  { level: 3, text: "Primero toca el círculo azul, después el coche y al final el perro.", answer: ["blue-circle", "car", "dog"], options: ["blue-circle", "red-square", "dog", "car", "phone"] },
  { level: 3, text: "Primero selecciona el teléfono, después el reloj y por último la puerta.", answer: ["phone", "clock", "door"], options: ["phone", "clock", "door", "car", "dog"] },
  { level: 3, text: "Selecciona primero el animal que vive en el agua y después el vehículo de dos ruedas.", answer: ["fish", "motorcycle"], options: ["dog", "fish", "bird", "car", "motorcycle"] },
  { level: 3, text: "Toca primero el animal que vuela, después el barco y al final el cuadrado rojo.", answer: ["bird", "boat", "red-square"], options: ["bird", "fish", "boat", "car", "red-square"] },
  { level: 3, text: "Primero toca el círculo azul, después el animal que vuela y finalmente el coche.", answer: ["blue-circle", "bird", "car"], options: ["blue-circle", "red-square", "bird", "dog", "car"] },
  { level: 3, text: "Selecciona el vehículo que circula por el agua, después el perro y finalmente el reloj.", answer: ["boat", "dog", "clock"], options: ["boat", "motorcycle", "dog", "bird", "clock"] },
  { level: 3, text: "Selecciona primero el teléfono, después el cuadrado rojo y por último la puerta.", answer: ["phone", "red-square", "door"], options: ["phone", "clock", "red-square", "blue-circle", "door"] },
  { level: 3, text: "Toca la motocicleta, después el pez y finalmente el reloj.", answer: ["motorcycle", "fish", "clock"], options: ["motorcycle", "car", "fish", "bird", "clock"] },
  { level: 3, text: "Primero selecciona la puerta, después el círculo azul y al final el pájaro.", answer: ["door", "blue-circle", "bird"], options: ["door", "phone", "blue-circle", "red-square", "bird"] },
  { level: 3, text: "Toca primero el perro, después el barco y finalmente el teléfono.", answer: ["dog", "boat", "phone"], options: ["dog", "bird", "boat", "car", "phone"] },

  { level: 4, text: "Selecciona el animal que vuela, pero antes toca el vehículo que circula por el agua.", answer: ["boat", "bird"], options: ["boat", "car", "motorcycle", "bird", "dog"] },
  { level: 4, text: "Toca el coche después del perro, pero antes selecciona el reloj.", answer: ["dog", "car", "clock"], options: ["dog", "car", "motorcycle", "clock", "phone"] },
  { level: 4, text: "Antes de tocar el cuadrado rojo, selecciona el teléfono; después toca la puerta.", answer: ["phone", "red-square", "door"], options: ["phone", "clock", "red-square", "blue-circle", "door"] },
  { level: 4, text: "Toca el pez después del reloj y, a continuación, selecciona la motocicleta.", answer: ["clock", "fish", "motorcycle"], options: ["clock", "phone", "fish", "bird", "motorcycle"] },
  { level: 4, text: "Antes de tocar el perro, selecciona la motocicleta y después el círculo azul.", answer: ["motorcycle", "blue-circle", "dog"], options: ["motorcycle", "car", "blue-circle", "red-square", "dog"] },
  { level: 4, text: "Selecciona el pez; después toca la puerta y, al final, el teléfono.", answer: ["fish", "door", "phone"], options: ["fish", "bird", "door", "clock", "phone"] },
  { level: 4, text: "Toca el barco después del cuadrado rojo, pero antes selecciona el pájaro.", answer: ["red-square", "boat", "bird"], options: ["red-square", "blue-circle", "boat", "car", "bird"] },
  { level: 4, text: "Después de seleccionar el coche, toca el triángulo amarillo y luego el teléfono.", answer: ["car", "yellow-triangle", "phone"], options: ["car", "motorcycle", "yellow-triangle", "blue-circle", "phone"] },

  { level: 5, text: "Toca el perro después del coche, pero antes selecciona el animal que vive en el agua.", answer: ["car", "dog", "fish"], options: ["car", "motorcycle", "dog", "bird", "fish", "boat"] },
  { level: 5, text: "Selecciona primero el vehículo que tiene dos ruedas; después toca el animal que no vuela y finalmente el objeto que indica la hora.", answer: ["motorcycle", "dog", "clock"], options: ["motorcycle", "car", "dog", "bird", "clock", "phone"] },
  { level: 5, text: "Antes de tocar el reloj, selecciona el barco, después el pájaro y luego el coche.", answer: ["boat", "bird", "car", "clock"], options: ["boat", "motorcycle", "bird", "dog", "car", "clock"] },
  { level: 5, text: "Toca el perro antes del teléfono; después selecciona el cuadrado rojo y termina con la puerta.", answer: ["dog", "phone", "red-square", "door"], options: ["dog", "bird", "phone", "clock", "red-square", "door"] },
  { level: 5, text: "Después del reloj toca la motocicleta; a continuación selecciona el pez y finalmente el círculo azul.", answer: ["clock", "motorcycle", "fish", "blue-circle"], options: ["clock", "phone", "motorcycle", "car", "fish", "blue-circle"] },
  { level: 5, text: "Selecciona el teléfono, después la puerta, luego el coche y finalmente el animal que vuela.", answer: ["phone", "door", "car", "bird"], options: ["phone", "door", "clock", "car", "dog", "bird"] },
  { level: 5, text: "Antes de tocar el reloj, selecciona el triángulo amarillo, después el barco y luego el perro.", answer: ["yellow-triangle", "boat", "dog", "clock"], options: ["yellow-triangle", "red-square", "boat", "car", "dog", "clock"] },
  { level: 5, text: "Toca primero el animal que vive en el agua, después el círculo azul, luego la motocicleta y al final el teléfono.", answer: ["fish", "blue-circle", "motorcycle", "phone"], options: ["fish", "bird", "blue-circle", "red-square", "motorcycle", "phone"] }
];

const everydaySoundFiles = {
  dog: { src: "sounds/dog-bark.mp3", duration: 1800 },
  car: { src: "sounds/car-horn.mp3", duration: 1800 },
  phone: { src: "sounds/telephone-ring.mp3", duration: 4200 },
  bell: { src: "sounds/doorbell.mp3", duration: 4200 },
  water: { src: "sounds/water-flowing.mp3", duration: 4200 },
  rain: { src: "sounds/rain.wav", duration: 4200 },
  applause: { src: "sounds/applause.wav", duration: 4200 },
  birds: { src: "sounds/birds.wav", duration: 4200 },
  clock: { src: "sounds/clock.wav", duration: 4200 },
  ambulance: { src: "sounds/ambulance.wav", duration: 4200 },
  door: { src: "sounds/door.wav", duration: 3200 },
  motorcycle: { src: "sounds/motorcycle.wav", duration: 3200 }
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
let advanceTimer = null;
let renderVersion = 0;
let hasPlayedStimulus = false;
let isStimulusPlaying = false;
let answerLocked = false;
let currentPositiveFeedback = positiveFeedback;
let currentRetryFeedback = retryFeedback;
let currentTaskLevel = null;
const exerciseLevels = { identificacion: 1, comprension: 1 };
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
  renderVersion += 1;
  clearAdvanceTimer();
  stopPlayback();
  currentPlayable = null;
  currentSequence = [];
  hasPlayedStimulus = false;
  isStimulusPlaying = false;
  answerLocked = false;
  currentPositiveFeedback = positiveFeedback;
  currentRetryFeedback = retryFeedback;
  currentTaskLevel = null;
  setFeedback("");

  const renderers = {
    deteccion: renderDetection,
    discriminacion: renderDiscrimination,
    identificacion: renderIdentification,
    reconocimiento: renderRecognition,
    comprension: renderComprehension
  };
  renderers[currentGame]();
  updateGameControls();
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
  const level = exerciseLevels.identificacion;
  const availableTasks = identificationTasks.filter((task) => task.level === level);
  const task = pickDifferent(availableTasks, lastSelections.identificacion, (item) => item.id);
  lastSelections.identificacion = task.id;
  currentAnswer = task.answer;
  currentTaskLevel = task.level;
  const spokenSequence = task.answer.map((value) => identificationTargets[value].label).join(". ");
  currentPlayable = () => speak(spokenSequence);
  currentPositiveFeedback = task.answer.length === 1
    ? `Correcto. Has identificado ${targetNames[task.answer[0]]}.`
    : "Correcto. Has identificado la secuencia completa en el orden adecuado.";
  currentRetryFeedback = task.answer.length === 1
    ? "Esa palabra no coincide. Vuelve a escuchar y compara las opciones del conjunto cerrado."
    : "La secuencia no coincide o no está en el orden escuchado. Reproduce el estímulo e inténtalo otra vez.";
  gameStage.innerHTML = `
    <div class="closed-set" aria-label="Conjunto cerrado de opciones conocidas">
      ${shuffle(task.options).map((value) => identificationTarget(value)).join("")}
    </div>
  `;
  gameActions.innerHTML = `
    ${exerciseLevelControl("identificacion", level)}
    ${playButton(task.answer.length === 1 ? "Reproducir palabra" : "Reproducir secuencia")}
    <button type="button" data-clear-sequence>Limpiar selección</button>
    <span class="sequence-status" id="sequence-status">${sequenceStatus()}</span>
  `;
}

function renderRecognition() {
  const sounds = Object.keys(soundNames);
  currentAnswer = pickDifferent(sounds, lastSelections.reconocimiento);
  lastSelections.reconocimiento = currentAnswer;
  const optionCount = recognitionOptionCounts[currentAnswer] || 3;
  const distractors = shuffle(sounds.filter((sound) => sound !== currentAnswer)).slice(0, optionCount - 1);
  const options = shuffle([currentAnswer, ...distractors]);
  const level = optionCount <= 3 ? "inicial" : optionCount <= 4 ? "intermedio" : "avanzado";
  currentPlayable = (playbackVersion) => playEverydaySound(currentAnswer, playbackVersion);
  currentPositiveFeedback = `Correcto. Has reconocido ${soundNames[currentAnswer].toLowerCase()}.`;
  currentRetryFeedback = "Esa opción no coincide con el estímulo. Vuelve a escucharlo y compara las alternativas.";
  gameStage.innerHTML = stagePrompt(
    "¿Qué has escuchado?",
    `Escucha sin pista previa y elige entre ${optionCount} alternativas.`,
    `Nivel ${level}`
  );
  renderAnswerActions(options.map((sound) => ({ value: sound, label: soundNames[sound] })));
}

function renderComprehension() {
  const level = exerciseLevels.comprension;
  const availableTasks = comprehensionTasks.filter((task) => task.level === level);
  const task = pickDifferent(availableTasks, lastSelections.comprension, (item) => item.text);
  lastSelections.comprension = task.text;
  currentAnswer = task.answer;
  currentTaskLevel = task.level;
  currentPlayable = () => speak(task.text);
  currentPositiveFeedback = task.answer.length === 1
    ? `Correcto. Has seleccionado ${targetNames[task.answer[0]]}.`
    : "Correcto. Has seguido la instrucción en el orden adecuado.";
  currentRetryFeedback = task.answer.length === 1
    ? "La opción no responde a la pregunta o instrucción. Escúchala otra vez y vuelve a intentarlo."
    : "La secuencia no está en el orden indicado. Escucha de nuevo antes de repetirla.";
  gameStage.innerHTML = `
    <div class="comprehension-board" aria-label="Opciones para seguir la instrucción oral">
      ${shuffle(task.options).map((value) => comprehensionTarget(value)).join("")}
    </div>
    <p class="instruction-transcript" id="instruction-transcript" hidden>${task.text}</p>
  `;
  gameActions.innerHTML = `
    ${exerciseLevelControl("comprension", level)}
    ${playButton("Escuchar instrucción")}
    <button type="button" data-toggle-transcript aria-expanded="false" aria-controls="instruction-transcript">Mostrar instrucción escrita</button>
    <button type="button" data-clear-sequence>Limpiar selección</button>
    <span class="sequence-status" id="sequence-status">${sequenceStatus()}</span>
  `;
}

function comprehensionTarget(value) {
  const target = comprehensionTargets[value];
  if (!target) {
    return "";
  }
  const content = target.symbol
    ? `<span class="target-symbol" aria-hidden="true">${target.symbol}</span><strong>${target.label}</strong>`
    : "";
  return `<button type="button" class="comprehension-target ${target.className}" data-sequence-answer="${value}" aria-label="${target.label}">${content}</button>`;
}

function identificationTarget(value) {
  const target = identificationTargets[value];
  if (!target) {
    return "";
  }
  return `
    <button type="button" class="identification-target" data-sequence-answer="${value}" aria-label="${target.label}">
      <span class="target-symbol" aria-hidden="true">${target.symbol}</span>
      <strong>${target.label}</strong>
    </button>
  `;
}

function exerciseLevelControl(game, selectedLevel) {
  return `
    <label class="level-control">
      Nivel
      <select data-exercise-level="${game}" aria-label="Seleccionar nivel de dificultad">
        ${[1, 2, 3, 4, 5].map((level) => `<option value="${level}"${level === selectedLevel ? " selected" : ""}>${level}</option>`).join("")}
      </select>
    </label>
  `;
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
  const transcriptToggle = event.target.closest("[data-toggle-transcript]");
  if (transcriptToggle) {
    toggleInstructionTranscript(transcriptToggle);
  } else if (answer && canAnswer()) {
    checkAnswer(answer.dataset.answer);
  } else if (clear && canAnswer()) {
    currentSequence = [];
    updateSequenceStatus();
    setFeedback("");
  } else if (play) {
    playCurrentStimulus(play);
  }
});

gameActions.addEventListener("change", (event) => {
  const levelControl = event.target.closest("[data-exercise-level]");
  if (!levelControl) {
    return;
  }
  const game = levelControl.dataset.exerciseLevel;
  exerciseLevels[game] = Number(levelControl.value);
  renderGame();
});

gameStage.addEventListener("click", (event) => {
  const answer = event.target.closest("[data-answer]");
  if (answer && currentGame === "identificacion" && canAnswer()) {
    checkAnswer(answer.dataset.answer);
    return;
  }

  const target = event.target.closest("[data-sequence-answer]");
  if (!target || !["identificacion", "comprension"].includes(currentGame) || !canAnswer()) {
    return;
  }
  currentSequence.push(target.dataset.sequenceAnswer);
  updateSequenceStatus();
  if (currentSequence.length === currentAnswer.length) {
    checkSequenceAnswer();
  }
});

function playCurrentStimulus(button) {
  if (!currentPlayable || button.disabled || answerLocked) {
    return;
  }
  const renderStamp = renderVersion;
  stopPlayback();
  isStimulusPlaying = true;
  updateGameControls();
  setFeedback("Reproduciendo estímulo...");

  let playbackResult;
  try {
    playbackResult = currentPlayable(renderStamp);
  } catch (error) {
    isStimulusPlaying = false;
    updateGameControls();
    setFeedback("No se ha podido reproducir el estímulo. Inténtalo de nuevo.", "retry");
    return;
  }

  Promise.resolve(playbackResult)
    .then((duration) => {
      if (renderStamp !== renderVersion) {
        return;
      }
      if (!Number.isFinite(duration) || duration < 0) {
        isStimulusPlaying = false;
        updateGameControls();
        return;
      }

      playbackTimers.push(window.setTimeout(() => {
        if (renderStamp !== renderVersion) {
          return;
        }
        hasPlayedStimulus = true;
        isStimulusPlaying = false;
        updateGameControls();
        if (feedback.textContent === "Reproduciendo estímulo...") {
          setFeedback("Ahora selecciona tu respuesta.");
        }
      }, duration));
    })
    .catch(() => {
      if (renderStamp !== renderVersion) {
        return;
      }
      isStimulusPlaying = false;
      updateGameControls();
      setFeedback("No se ha podido reproducir el estímulo. Inténtalo de nuevo.", "retry");
    });
}

function checkAnswer(answer) {
  if (!canAnswer()) {
    return;
  }
  const isCorrect = answer === currentAnswer;
  setFeedback(isCorrect ? currentPositiveFeedback : currentRetryFeedback, isCorrect ? "ok" : "retry");
  if (isCorrect) {
    lockAnswerAndScheduleNext();
  }
}

function checkSequenceAnswer() {
  if (!canAnswer()) {
    return;
  }
  const isCorrect = currentAnswer.every((answer, index) => answer === currentSequence[index]);
  setFeedback(isCorrect ? currentPositiveFeedback : currentRetryFeedback, isCorrect ? "ok" : "retry");
  if (isCorrect) {
    lockAnswerAndScheduleNext();
  } else {
    currentSequence = [];
    updateSequenceStatus();
  }
}

function canAnswer() {
  return hasPlayedStimulus && !isStimulusPlaying && !answerLocked;
}

function updateGameControls() {
  const responsesDisabled = !canAnswer();
  gameStage.querySelectorAll("[data-answer], [data-sequence-answer]").forEach((button) => {
    button.disabled = responsesDisabled;
  });
  gameActions.querySelectorAll("[data-answer], [data-clear-sequence]").forEach((button) => {
    button.disabled = responsesDisabled;
  });
  gameActions.querySelectorAll("[data-play]").forEach((button) => {
    button.disabled = isStimulusPlaying || answerLocked;
  });
}

function lockAnswerAndScheduleNext() {
  answerLocked = true;
  advanceExerciseLevel();
  updateGameControls();
  clearAdvanceTimer();

  const renderStamp = renderVersion;
  advanceTimer = window.setTimeout(() => {
    advanceTimer = null;
    if (renderStamp === renderVersion) {
      renderGame();
    }
  }, 2200);
}

function advanceExerciseLevel() {
  if (!(currentGame in exerciseLevels)) {
    return;
  }
  exerciseLevels[currentGame] = Math.min(5, exerciseLevels[currentGame] + 1);
}

function toggleInstructionTranscript(button) {
  const transcript = document.querySelector("#instruction-transcript");
  if (!transcript) {
    return;
  }
  const willShow = transcript.hidden;
  transcript.hidden = !willShow;
  button.setAttribute("aria-expanded", String(willShow));
  button.textContent = willShow ? "Ocultar instrucción escrita" : "Mostrar instrucción escrita";
}

function clearAdvanceTimer() {
  if (advanceTimer !== null) {
    window.clearTimeout(advanceTimer);
    advanceTimer = null;
  }
}

function sequenceStatus() {
  const selection = currentSequence.length
    ? `Selección: ${currentSequence.map((item) => targetNames[item]).join(" → ")}`
    : "Selección: ninguna";
  return currentTaskLevel ? `Nivel ${currentTaskLevel} · ${selection}` : selection;
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

async function playEverydaySound(sound, playbackVersion) {
  const effect = everydaySoundFiles[sound];
  if (!effect) {
    return playSynthesizedEverydaySound(sound);
  }

  let fallbackStarted = false;
  const playFallbackOnce = () => {
    if (fallbackStarted) {
      return null;
    }
    fallbackStarted = true;
    return playSynthesizedEverydaySound(sound);
  };

  try {
    const context = ensureAudio();
    const buffer = await loadEverydaySound(sound, effect.src, context);
    if (playbackVersion !== renderVersion || !isStimulusPlaying) {
      return null;
    }

    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = buffer;
    gain.gain.value = 0.9;
    source.connect(gain);
    gain.connect(context.destination);
    const playbackDuration = Math.min(buffer.duration * 1000, effect.duration);
    source.start();
    source.stop(context.currentTime + playbackDuration / 1000);
    trackSource(source);
    return Math.ceil(playbackDuration);
  } catch (error) {
    if (playbackVersion !== renderVersion || !isStimulusPlaying) {
      return null;
    }
    return playFallbackOnce();
  }
}

function loadEverydaySound(sound, src, context) {
  if (!soundCache[sound]) {
    soundCache[sound] = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", src);
      request.responseType = "arraybuffer";
      request.addEventListener("load", () => {
        const successfulStatus = request.status === 0 || (request.status >= 200 && request.status < 300);
        if (!successfulStatus || !request.response) {
          reject(new Error(`No se pudo cargar ${src}`));
          return;
        }
        context.decodeAudioData(request.response.slice(0)).then(resolve, reject);
      }, { once: true });
      request.addEventListener("error", () => reject(new Error(`No se pudo cargar ${src}`)), { once: true });
      request.send();
    }).catch((error) => {
      delete soundCache[sound];
      throw error;
    });
  }
  return soundCache[sound];
}

// Respaldo por Web Audio para navegadores que no puedan cargar el archivo local.
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
  if (sound === "rain") {
    // Lluvia continua con gotas de distinta altura.
    noise({ start: now, duration: 2.2, frequency: 4200, filterType: "highpass", volume: 0.18 });
    [0.12, 0.38, 0.7, 1.02, 1.36, 1.72, 2.02].forEach((offset, index) => {
      tone({ frequency: 1050 + (index % 3) * 240, start: now + offset, duration: 0.035, volume: 0.055 });
    });
    return 2400;
  }
  if (sound === "applause") {
    // Ráfagas irregulares de ruido que imitan varias palmadas.
    [0, 0.16, 0.31, 0.53, 0.72, 0.94, 1.18, 1.37, 1.62].forEach((offset, index) => {
      noise({ start: now + offset, duration: 0.1, frequency: 1500 + (index % 3) * 350, volume: 0.25 });
    });
    return 1900;
  }
  if (sound === "birds") {
    // Trinos breves y agudos en grupos separados.
    [0, 0.42, 0.9, 1.34].forEach((offset, group) => {
      [0, 0.07, 0.14].forEach((step, index) => {
        tone({ frequency: 1450 + group * 130 + index * 160, start: now + offset + step, duration: 0.06, volume: 0.1 });
      });
    });
    return 1800;
  }
  if (sound === "clock") {
    // Tic-tac regular con dos alturas alternas.
    [0, 0.5, 1, 1.5, 2].forEach((offset, index) => {
      noise({ start: now + offset, duration: 0.025, frequency: 2600, volume: 0.12 });
      tone({ frequency: index % 2 ? 900 : 1150, start: now + offset, duration: 0.045, volume: 0.09 });
    });
    return 2250;
  }
  if (sound === "ambulance") {
    // Sirena alterna de dos tonos sostenidos.
    [0, 0.45, 0.9, 1.35, 1.8].forEach((offset, index) => {
      tone({ frequency: index % 2 ? 690 : 980, start: now + offset, duration: 0.43, type: "sawtooth", volume: 0.12 });
    });
    return 2400;
  }
  if (sound === "door") {
    // Tres golpes secos sobre una puerta.
    [0, 0.32, 0.68].forEach((offset) => {
      noise({ start: now + offset, duration: 0.07, frequency: 520, volume: 0.3 });
      tone({ frequency: 120, start: now + offset, duration: 0.13, type: "sine", volume: 0.18 });
    });
    return 1200;
  }
  if (sound === "motorcycle") {
    // Motor grave con pequeñas variaciones de revoluciones.
    [0, 0.28, 0.56, 0.84, 1.12, 1.4, 1.68].forEach((offset, index) => {
      tone({ frequency: 95 + (index % 3) * 24, start: now + offset, duration: 0.3, type: "sawtooth", volume: 0.16 });
      tone({ frequency: 190 + (index % 3) * 35, start: now + offset, duration: 0.28, type: "square", volume: 0.055 });
    });
    return 2200;
  }
  if (sound === "bell") {
    // Timbre doméstico: secuencia descendente "ding-dong".
    tone({ frequency: 880, start: now, duration: 0.65, type: "sine", volume: 0.24 });
    tone({ frequency: 1320, start: now, duration: 0.45, type: "sine", volume: 0.08 });
    tone({ frequency: 660, start: now + 0.55, duration: 0.8, type: "sine", volume: 0.24 });
    tone({ frequency: 990, start: now + 0.55, duration: 0.55, type: "sine", volume: 0.07 });
    return 1650;
  }
  return null;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    setFeedback("Este navegador no dispone de voz sintética. Prueba la actividad en Chrome o Edge.", "retry");
    return null;
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
  return new Promise((resolve, reject) => {
    let finished = false;
    const safetyDuration = Math.max(4000, text.length * 140);
    const safetyTimer = window.setTimeout(() => finish(0), safetyDuration);
    playbackTimers.push(safetyTimer);

    function finish(duration) {
      if (finished) {
        return;
      }
      finished = true;
      window.clearTimeout(safetyTimer);
      playbackTimers = playbackTimers.filter((timer) => timer !== safetyTimer);
      resolve(duration);
    }

    utterance.addEventListener("end", () => finish(0), { once: true });
    utterance.addEventListener("error", (event) => {
      if (["canceled", "interrupted"].includes(event.error)) {
        finish(null);
        return;
      }
      reject(new Error(`No se pudo reproducir la instrucción: ${event.error}`));
    }, { once: true });
    window.speechSynthesis.speak(utterance);
  });
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

renderGame();
