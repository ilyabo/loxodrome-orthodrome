import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";

const STRINGS = {
  en: {
    documentTitle: "Why one compass direction is not the shortest path",
    pageTitle: "Why flying in one compass direction does not mean flying the shortest path",
    intro:
      "On a Mercator map, a route with a constant bearing looks straight and can still reach the goal. But on a globe it usually is not the shortest route: the shortest path is different.",
    summaryGame: "Initial direction = keep the starting bearing",
    summaryRhumb: "Loxodrome = path with a constant bearing",
    summaryOrthodrome: "Orthodrome = shortest path",
    azimuthExplainerTitle: "What is a bearing?",
    azimuthExplainerBody:
      "A bearing is the angle measured clockwise from north. If the arrow points between north and east, that is a north-east bearing.",
    shortDistanceTitle: "When this is barely visible",
    shortDistanceBody:
      "If you travel only a short distance, Earth feels almost flat. Over small distances, the difference between these routes is usually tiny enough to ignore.",
    explanationTitle: "What this mode shows",
    projectionTitle: "Projection",
    projectionGlobe: "Globe",
    projectionMercator: "Mercator",
    languageTitle: "Language",
    languageEnglish: "English",
    languageRussian: "Russian",
    playStart: "Start",
    playStop: "Stop",
    chosenBearingFallbackTitle: "Chosen bearing",
    goalBearingTitle: "Bearing to the goal now",
    resultTitle: "Result",
    reachedGoal: "You reached the goal",
    resultGameMiss: "With the game's initial bearing, you do not reach the goal.",
    resultRhumbReach: "This constant bearing can reach the goal.",
    resultOrthodromeReach: "The orthodrome reaches the goal directly.",
    orthodromeMatches: "On the orthodrome, the direction of travel matches the direction to the goal.",
    arrowsAlmostMatch: "The two arrows still almost match.",
    arrowsDiffer: (degrees) => `The arrows already differ by ${degrees}°.`,
    compassActiveShortest: "Orange arrow: direction of the shortest path",
    compassActiveChosen: "Orange arrow: chosen direction",
    compassGoalNow: "Blue arrow: bearing to the goal now",
    compassGoalReached: "Blue arrow: you are already at the goal",
    distanceMiss:
      "With this course you never reach the goal, so there is no final shortest route to compare against.",
    distanceBelowOne: "So far, the chosen path is less than 1 km longer than the shortest arc.",
    distanceLonger: (kilometers) =>
      `So far, the chosen path is about ${kilometers} km longer than the shortest arc.`,
    dragHintGlobe: "You can drag the globe",
    dragHintMercator: "This is a flat Mercator map",
    dragHintMercatorRhumb: "On Mercator, a loxodrome looks straight",
    svgAriaLabel:
      "Map and globe comparing the initial direction, the loxodrome, and the orthodrome.",
    start: "Start",
    goal: "Goal",
    directions: [
      "north",
      "north-east",
      "east",
      "south-east",
      "south",
      "south-west",
      "west",
      "north-west",
    ],
    cardinals: { north: "N", east: "E", south: "S", west: "W" },
    mercatorProjectionPhrase: "in the Mercator projection",
    routes: {
      orthodrome: {
        chosenTitle: "Direction of the shortest path",
        chosenNote:
          "On an orthodrome the bearing keeps changing, but the route is the shortest one.",
        explanation:
          "This is the shortest route, or orthodrome: the direction changes little by little, but the overall route is the shortest between start and goal.",
      },
      rhumb: {
        chosenTitle: "Constant direction",
        chosenNote:
          "For this start and goal, this constant bearing does reach the goal, but it is not the same initial bearing used in the game.",
        explanation:
          "This is the path to our goal with a constant direction, or loxodrome: in the Mercator projection it looks straight, which made it useful for navigation. But it is usually longer than the orthodrome.",
      },
      game: {
        chosenTitle: "Keeping the initial direction",
        chosenNote:
          "We take the direction to the goal only at the start and then never turn again.",
        explanation:
          "We take the direction to the goal only at the start and then never change it. On a globe, that route slowly drifts away from the goal.",
      },
    },
  },
  ru: {
    documentTitle: "Почему одно направление не равно кратчайшему пути",
    pageTitle:
      "Почему лететь всё время в одном направлении компаса не значит лететь кратчайшим путём",
    intro:
      "В проекции Меркатора путь с постоянным азимутом выглядит прямой и может привести к цели. Но на шаре это обычно не кратчайшая дорога: самый короткий путь оказывается другим.",
    summaryGame: "Начальное направление = держим стартовый азимут",
    summaryRhumb: "Локсодрома = путь с постоянным азимутом",
    summaryOrthodrome: "Ортодрома = кратчайший путь",
    azimuthExplainerTitle: "Что такое азимут",
    azimuthExplainerBody:
      "Азимут это угол, который отсчитывают от севера по часовой стрелке. Если стрелка смотрит между севером и востоком, это северо-восточный азимут.",
    shortDistanceTitle: "Когда это почти не заметно",
    shortDistanceBody:
      "Если лететь недалеко, Земля кажется почти плоской. На небольших расстояниях разница между путями обычно настолько мала, что ею можно пренебречь.",
    explanationTitle: "Что показывает режим",
    projectionTitle: "Проекция",
    projectionGlobe: "Глобус",
    projectionMercator: "Меркатор",
    languageTitle: "Язык",
    languageEnglish: "English",
    languageRussian: "Русский",
    playStart: "Старт",
    playStop: "Стоп",
    chosenBearingFallbackTitle: "Выбранный азимут",
    goalBearingTitle: "Азимут на цель сейчас",
    resultTitle: "Результат",
    reachedGoal: "Вы в цели",
    resultGameMiss: "При постоянном начальном азимуте цель не достигнута.",
    resultRhumbReach: "Этим постоянным азимутом можно прийти в цель.",
    resultOrthodromeReach: "Ортодрома довела прямо в цель.",
    orthodromeMatches:
      "На ортодроме направление движения совпадает с направлением на цель.",
    arrowsAlmostMatch: "Пока обе стрелки почти совпадают.",
    arrowsDiffer: (degrees) => `Расхождение уже ${degrees}°.`,
    compassActiveShortest: "Оранжевая стрелка: направление кратчайшего пути",
    compassActiveChosen: "Оранжевая стрелка: выбранное направление",
    compassGoalNow: "Синяя стрелка: азимут на цель сейчас",
    compassGoalReached: "Синяя стрелка: вы уже в цели",
    distanceMiss:
      "Этим курсом до цели не долететь: маршрут уводит мимо, поэтому кратчайший путь сравнивать уже не с чем.",
    distanceBelowOne: "Пока разница между выбранным путём и кратчайшей дугой меньше 1 км.",
    distanceLonger: (kilometers) =>
      `Сейчас выбранный путь длиннее кратчайшей дуги примерно на ${kilometers} км.`,
    dragHintGlobe: "Глобус можно крутить мышкой",
    dragHintMercator: "Это плоская карта Меркатора",
    dragHintMercatorRhumb: "В Меркаторе локсодрома выглядит прямой",
    svgAriaLabel:
      "Карта и глобус, на которых можно сравнивать начальное направление, локсодрому и ортодрому.",
    start: "Старт",
    goal: "Цель",
    directions: [
      "север",
      "северо-восток",
      "восток",
      "юго-восток",
      "юг",
      "юго-запад",
      "запад",
      "северо-запад",
    ],
    cardinals: { north: "С", east: "В", south: "Ю", west: "З" },
    mercatorProjectionPhrase: "в проекции Меркатора",
    routes: {
      orthodrome: {
        chosenTitle: "Направление кратчайшего пути",
        chosenNote:
          "На ортодроме азимут всё время меняется. Зато этот путь кратчайший.",
        explanation:
          "Это кратчайший путь, или ортодрома: направление полёта понемногу меняется, зато путь получается самым коротким между стартом и целью.",
      },
      rhumb: {
        chosenTitle: "Постоянное направление",
        chosenNote:
          "Для нашей цели такой постоянный азимут действительно приводит в цель, но это не тот начальный азимут, который используется в игре.",
        explanation:
          "Это путь к нашей цели с постоянным направлением, или локсодрома: в проекции Меркатора она выглядит прямой, поэтому была удобна для навигации. Но путь обычно длиннее ортодромы.",
      },
      game: {
        chosenTitle: "Держим начальное направление",
        chosenNote:
          "Берём направление на цель только в самом начале, а потом больше не поворачиваем.",
        explanation:
          "Берём направление на цель только в самом начале, а потом больше его не меняем. На шаре такой маршрут постепенно уходит мимо.",
      },
    },
  },
};

function languageFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "ru" ? "ru" : "en";
}

const pageTitle = document.querySelector("#page-title");
const pageIntro = document.querySelector("#page-intro");
const summaryGame = document.querySelector("#summary-game");
const summaryRhumb = document.querySelector("#summary-rhumb");
const summaryOrthodrome = document.querySelector("#summary-orthodrome");
const azimuthExplainerTitle = document.querySelector("#azimuth-explainer-title");
const azimuthExplainerBody = document.querySelector("#azimuth-explainer-body");
const miniCompassNorth = document.querySelector("#mini-compass-north");
const miniCompassEast = document.querySelector("#mini-compass-east");
const shortDistanceTitle = document.querySelector("#short-distance-title");
const shortDistanceBody = document.querySelector("#short-distance-body");
const explanationTitle = document.querySelector("#explanation-title");
const explanationBody = document.querySelector("#explanation-body");
const playButton = document.querySelector("#play-button");
const progressSlider = document.querySelector("#progress-slider");
const progressLabel = document.querySelector("#progress-label");
const projectionTitle = document.querySelector("#projection-title");
const projectionGlobeButton = document.querySelector("#projection-globe");
const projectionMercatorButton = document.querySelector("#projection-mercator");
const chosenBearingTitle = document.querySelector("#chosen-bearing-title");
const chosenBearingCopy = document.querySelector("#chosen-bearing-copy");
const chosenBearingNote = document.querySelector("#chosen-bearing-note");
const goalBearingTitle = document.querySelector("#goal-bearing-title");
const goalBearingCopy = document.querySelector("#goal-bearing-copy");
const bearingDeltaCopy = document.querySelector("#bearing-delta");
const compassNorth = document.querySelector("#compass-north");
const compassEast = document.querySelector("#compass-east");
const compassSouth = document.querySelector("#compass-south");
const compassWest = document.querySelector("#compass-west");
const compassActiveArrow = document.querySelector("#compass-active-arrow");
const compassGoalArrow = document.querySelector("#compass-goal-arrow");
const compassActiveCopy = document.querySelector("#compass-active-copy");
const compassGoalCopy = document.querySelector("#compass-goal-copy");
const compassDistanceCopy = document.querySelector("#compass-distance-copy");
const globeHost = document.querySelector("#globe");

const start = [8, 3];
const goal = [128, 37];
const stepDegrees = 1.25;
const pathSteps = 155;
const animationDuration = 10000;
const MERCATOR_LAT_LIMIT = 82;
const EARTH_RADIUS_KM = 6371;

let animationFrame = null;
let animationStart = 0;
let isPlaying = false;
let progress = 0;
let projectionMode = "globe";
let routeMode = "game";
let landGeometry = null;
let currentLanguage = languageFromUrl();

const ROUTE_COLORS = {
  game: "#ff6b57",
  orthodrome: "#f0bf38",
  rhumb: "#eb7a3c",
  goal: "#26547c",
};

function strings() {
  return STRINGS[currentLanguage];
}

const svg = d3
  .select(globeHost)
  .append("svg")
  .attr("viewBox", "0 0 900 900")
  .attr("role", "img");

svg
  .append("defs")
  .html(`
    <radialGradient id="waterGradient" cx="38%" cy="34%">
      <stop offset="0%" stop-color="#bfeaff"></stop>
      <stop offset="58%" stop-color="#7ec7e8"></stop>
      <stop offset="100%" stop-color="#216b93"></stop>
    </radialGradient>
  `);

const root = svg.append("g");
const shadowLayer = root.append("g");
const globeLayer = root.append("g");
const overlayLayer = root.append("g");

const mapBackdrop = globeLayer.append("rect").attr("class", "map-backdrop");
const sphereShadow = shadowLayer.append("circle").attr("class", "sphere-shadow");
const sphere = globeLayer.append("path").attr("class", "sphere-water");
const landPath = globeLayer.append("path").attr("class", "land");
const graticulePath = globeLayer.append("path").attr("class", "graticule");
const equatorPath = globeLayer.append("path").attr("class", "equator");
const orthodromeReferencePath = globeLayer.append("path").attr("class", "shortest-path");
const activeRouteFadePath = globeLayer.append("path").attr("class", "trail-fade");
const activeRoutePath = globeLayer.append("path").attr("class", "ne-path");
const goalGuide = globeLayer.append("path").attr("class", "goal-line");
const poleRing = globeLayer.append("path").attr("class", "pole-ring");

const markersLayer = overlayLayer.append("g");
const startMarker = markersLayer.append("g");
const goalMarker = markersLayer.append("g");
const travelerMarker = markersLayer.append("g");
const activeArrowLayer = overlayLayer.append("g");
const goalArrowLayer = overlayLayer.append("g");
const annotationLayer = overlayLayer.append("g");

const draggerHint = annotationLayer.append("text").attr("class", "dragger-hint").attr("text-anchor", "middle");

startMarker.append("circle").attr("r", 8).attr("fill", "#eb7a3c");
startMarker.append("circle").attr("r", 18).attr("fill", "rgba(235, 122, 60, 0.18)");
const startLabel = startMarker
  .append("text")
  .attr("class", "marker-label")
  .attr("dx", -14)
  .attr("dy", -10)
  .attr("text-anchor", "end");

goalMarker.append("circle").attr("r", 8).attr("fill", ROUTE_COLORS.goal);
goalMarker.append("circle").attr("r", 18).attr("fill", "rgba(38, 84, 124, 0.18)");
const goalLabel = goalMarker.append("text").attr("class", "marker-label").attr("dx", 14).attr("dy", -10);

travelerMarker.append("circle").attr("r", 9).attr("fill", ROUTE_COLORS.game);
travelerMarker.append("circle").attr("r", 22).attr("fill", "rgba(255, 107, 87, 0.18)");

activeArrowLayer.append("path");
activeArrowLayer.append("path");
goalArrowLayer.append("path").attr("class", "bearing-arrow-goal");
goalArrowLayer.append("path").attr("class", "bearing-tip-goal");

const globeProjection = d3.geoOrthographic();
const mercatorProjection = d3.geoMercator();
const pathGenerator = d3.geoPath();
const globeGraticule = d3.geoGraticule10();
const mercatorGraticule = d3
  .geoGraticule()
  .step([10, 10])
  .extent([
    [-180, -MERCATOR_LAT_LIMIT],
    [180, MERCATOR_LAT_LIMIT],
  ]);
const equator = {
  type: "LineString",
  coordinates: d3.range(-180, 181, 2).map((longitude) => [longitude, 0]),
};
const polarCircle = {
  type: "LineString",
  coordinates: d3.range(-180, 181, 3).map((longitude) => [longitude, 80]),
};

function degToRad(value) {
  return (value * Math.PI) / 180;
}

function radToDeg(value) {
  return (value * 180) / Math.PI;
}

function normalizeLongitude(longitude) {
  return ((((longitude + 180) % 360) + 360) % 360) - 180;
}

function normalizeBearing(bearing) {
  return ((bearing % 360) + 360) % 360;
}

function mercatorLatitudeToY(latitudeRadians) {
  return Math.log(Math.tan(Math.PI / 4 + latitudeRadians / 2));
}

function initialBearing(from, to) {
  const [longitude1, latitude1] = from.map(degToRad);
  const [longitude2, latitude2] = to.map(degToRad);
  const deltaLongitude = longitude2 - longitude1;
  const y = Math.sin(deltaLongitude) * Math.cos(latitude2);
  const x =
    Math.cos(latitude1) * Math.sin(latitude2) -
    Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(deltaLongitude);

  return normalizeBearing(radToDeg(Math.atan2(y, x)));
}

function rhumbBearing(from, to) {
  const [longitude1, latitude1] = from.map(degToRad);
  const [longitude2, latitude2] = to.map(degToRad);
  let deltaLongitude = longitude2 - longitude1;

  if (Math.abs(deltaLongitude) > Math.PI) {
    deltaLongitude += deltaLongitude > 0 ? -2 * Math.PI : 2 * Math.PI;
  }

  const deltaPsi = mercatorLatitudeToY(latitude2) - mercatorLatitudeToY(latitude1);
  return normalizeBearing(radToDeg(Math.atan2(deltaLongitude, deltaPsi)));
}

function bearingName(bearing) {
  const directionNames = strings().directions;
  const index = Math.round(normalizeBearing(bearing) / 45) % directionNames.length;
  return directionNames[index];
}

function bearingLabel(bearing) {
  return `${Math.round(normalizeBearing(bearing))}° • ${bearingName(bearing)}`;
}

function shortestBearingDifference(fromBearing, toBearing) {
  const delta = normalizeBearing(toBearing - fromBearing + 180) - 180;
  return Math.abs(delta);
}

function pointAlongBearing(point, bearingDegrees, distanceDegrees) {
  const [longitude, latitude] = point;
  const lambda1 = degToRad(longitude);
  const phi1 = degToRad(latitude);
  const theta = degToRad(bearingDegrees);
  const delta = degToRad(distanceDegrees);

  let phi2 = phi1 + delta * Math.cos(theta);
  phi2 = Math.max(Math.min(phi2, degToRad(89.65)), degToRad(-89.65));

  const deltaPsi = Math.log(
    Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4)
  );
  const q = Math.abs(deltaPsi) > 1e-12 ? (phi2 - phi1) / deltaPsi : Math.cos(phi1);
  const lambda2 = lambda1 + (delta * Math.sin(theta)) / q;

  return [normalizeLongitude(radToDeg(lambda2)), radToDeg(phi2)];
}

function pointTowardGoal(point, target, distanceDegrees) {
  const totalDistance = d3.geoDistance(point, target);

  if (totalDistance < 1e-6) {
    return point;
  }

  const stepFraction = Math.min(0.08, degToRad(distanceDegrees) / totalDistance);
  return d3.geoInterpolate(point, target)(stepFraction);
}

function buildConstantBearingPath(seed, bearingDegrees, distanceDegrees, steps) {
  const coordinates = [seed];
  let current = seed;

  for (let index = 0; index < steps; index += 1) {
    current = pointAlongBearing(current, bearingDegrees, distanceDegrees);
    coordinates.push(current);

    if (current[1] > 89.45) {
      break;
    }
  }

  return coordinates;
}

function buildGreatCirclePath(from, to, segments) {
  const interpolate = d3.geoInterpolate(from, to);
  return d3.range(segments + 1).map((step) => interpolate(step / segments));
}

function buildRhumbPath(from, to, segments) {
  const [longitude1, latitude1] = from.map(degToRad);
  const [longitude2, latitude2] = to.map(degToRad);
  let deltaLongitude = longitude2 - longitude1;

  if (Math.abs(deltaLongitude) > Math.PI) {
    deltaLongitude += deltaLongitude > 0 ? -2 * Math.PI : 2 * Math.PI;
  }

  const y1 = mercatorLatitudeToY(latitude1);
  const y2 = mercatorLatitudeToY(latitude2);

  return d3.range(segments + 1).map((step) => {
    const t = step / segments;
    const lambda = longitude1 + deltaLongitude * t;
    const y = y1 + (y2 - y1) * t;
    const phi = 2 * Math.atan(Math.exp(y)) - Math.PI / 2;
    return [normalizeLongitude(radToDeg(lambda)), radToDeg(phi)];
  });
}

function pathLengthKm(coordinates) {
  if (!coordinates || coordinates.length < 2) {
    return 0;
  }

  return d3.geoLength({ type: "LineString", coordinates }) * EARTH_RADIUS_KM;
}

function slicePath(coordinates, currentProgress) {
  const total = coordinates.length - 1;
  const scaled = currentProgress * total;
  const whole = Math.floor(scaled);
  const partial = scaled - whole;
  const visible = coordinates.slice(0, whole + 1);

  if (whole < total) {
    const interpolator = d3.geoInterpolate(coordinates[whole], coordinates[whole + 1]);
    visible.push(interpolator(partial));
  }

  return visible;
}

function routeConfig() {
  const s = strings();

  if (routeMode === "orthodrome") {
    return {
      key: "orthodrome",
      color: ROUTE_COLORS.orthodrome,
      path: orthodromePath,
      constantBearing: false,
      chosenTitle: s.routes.orthodrome.chosenTitle,
      chosenNote: s.routes.orthodrome.chosenNote,
      explanationTitle: s.explanationTitle,
      explanationBody: s.routes.orthodrome.explanation,
      explanationHtml: s.routes.orthodrome.explanation,
    };
  }

  if (routeMode === "rhumb") {
    return {
      key: "rhumb",
      color: ROUTE_COLORS.rhumb,
      path: rhumbPath,
      bearing: rhumbBearingValue,
      constantBearing: true,
      chosenTitle: s.routes.rhumb.chosenTitle,
      chosenNote: s.routes.rhumb.chosenNote,
      explanationTitle: s.explanationTitle,
      explanationBody: s.routes.rhumb.explanation,
      explanationHtml: `This is the path to our goal with a constant direction, or loxodrome: <button class="inline-link-button" type="button" data-set-projection="mercator">${s.mercatorProjectionPhrase}</button>${currentLanguage === "en" ? " it looks straight, which made it useful for navigation. But it is usually longer than the orthodrome." : " она выглядит прямой, поэтому была удобна для навигации. Но путь обычно длиннее ортодромы."}`,
    };
  }

  return {
    key: "game",
    color: ROUTE_COLORS.game,
    path: gamePath,
    bearing: gameBearing,
    constantBearing: true,
    chosenTitle: s.routes.game.chosenTitle,
    chosenNote: s.routes.game.chosenNote,
    explanationTitle: s.explanationTitle,
    explanationBody: s.routes.game.explanation,
    explanationHtml: s.routes.game.explanation,
  };
}

function activeMovementBearing(travelerPosition) {
  const activeRoute = routeConfig();
  if (activeRoute.constantBearing) {
    return activeRoute.bearing;
  }

  return initialBearing(travelerPosition, goal);
}

const gameBearing = initialBearing(start, goal);
const rhumbBearingValue = rhumbBearing(start, goal);
const gamePath = buildConstantBearingPath(start, gameBearing, stepDegrees, pathSteps);
const rhumbPath = buildRhumbPath(start, goal, 180);
const orthodromePath = buildGreatCirclePath(start, goal, 180);

async function loadLand() {
  try {
    const topology = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json");
    landGeometry = topojson.feature(topology, topology.objects.land);
    render(progress);
  } catch (error) {
    console.error("Failed to load land topology", error);
  }
}

function visiblePoint(point) {
  const [x, y] = (render.projection && render.projection(point)) || [];
  return Number.isFinite(x) && Number.isFinite(y) ? [x, y] : null;
}

function markerTransform(point) {
  const projected = visiblePoint(point);
  return projected ? `translate(${projected[0]}, ${projected[1]})` : "translate(-999, -999)";
}

function drawArrowBetween(layer, startPoint, endPoint, color, dashed = false) {
  const startXY = visiblePoint(startPoint);
  const endXY = visiblePoint(endPoint);

  if (!startXY || !endXY) {
    layer.attr("display", "none");
    return;
  }

  layer.attr("display", null);
  const dx = endXY[0] - startXY[0];
  const dy = endXY[1] - startXY[1];
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const tailX = startXY[0] - ux * 8;
  const tailY = startXY[1] - uy * 8;
  const headX = startXY[0] + ux * 48;
  const headY = startXY[1] + uy * 48;

  layer
    .select("path:first-child")
    .attr("d", `M ${tailX} ${tailY} L ${headX} ${headY}`)
    .attr("stroke", color)
    .attr("stroke-width", 3.2)
    .attr("stroke-linecap", "round")
    .attr("fill", "none")
    .attr("stroke-dasharray", dashed ? "4 4" : null);

  layer
    .select("path:last-child")
    .attr(
      "d",
      [
        `M ${headX} ${headY}`,
        `L ${headX - ux * 14 - uy * 8} ${headY - uy * 14 + ux * 8}`,
        `L ${headX - ux * 14 + uy * 8} ${headY - uy * 14 - ux * 8}`,
        "Z",
      ].join(" ")
    )
    .attr("fill", color);
}

function syncRouteButtons() {
  summaryGame.classList.toggle("is-active", routeMode === "game");
  summaryRhumb.classList.toggle("is-active", routeMode === "rhumb");
  summaryOrthodrome.classList.toggle("is-active", routeMode === "orthodrome");
}

function syncSummaryPills() {
  const all = [
    [summaryGame, "game"],
    [summaryRhumb, "rhumb"],
    [summaryOrthodrome, "orthodrome"],
  ];

  for (const [element, key] of all) {
    element.classList.remove("is-active", "is-game", "is-orthodrome", "is-rhumb");
    element.classList.add(`is-${key}`);
    element.classList.toggle("is-active", routeMode === key);
  }
}

function syncProjectionButtons() {
  projectionGlobeButton.classList.toggle("is-active", projectionMode === "globe");
  projectionMercatorButton.classList.toggle("is-active", projectionMode === "mercator");
}

function syncStaticText() {
  const s = strings();

  document.documentElement.lang = currentLanguage;
  document.title = s.documentTitle;
  svg.attr("aria-label", s.svgAriaLabel);

  pageTitle.textContent = s.pageTitle;
  pageIntro.textContent = s.intro;
  summaryGame.textContent = s.summaryGame;
  summaryRhumb.textContent = s.summaryRhumb;
  summaryOrthodrome.textContent = s.summaryOrthodrome;
  azimuthExplainerTitle.textContent = s.azimuthExplainerTitle;
  azimuthExplainerBody.textContent = s.azimuthExplainerBody;
  miniCompassNorth.textContent = s.cardinals.north;
  miniCompassEast.textContent = s.cardinals.east;
  shortDistanceTitle.textContent = s.shortDistanceTitle;
  shortDistanceBody.textContent = s.shortDistanceBody;
  projectionTitle.textContent = s.projectionTitle;
  projectionGlobeButton.textContent = s.projectionGlobe;
  projectionMercatorButton.textContent = s.projectionMercator;
  compassNorth.textContent = s.cardinals.north;
  compassEast.textContent = s.cardinals.east;
  compassSouth.textContent = s.cardinals.south;
  compassWest.textContent = s.cardinals.west;
  startLabel.text(s.start);
  goalLabel.text(s.goal);
}

function syncPlaybackUi() {
  const s = strings();
  progressSlider.value = String(Math.round(progress * 1000));
  progressLabel.value = `${Math.round(progress * 100)}%`;
  playButton.textContent = isPlaying ? s.playStop : s.playStart;
  syncProjectionButtons();
  syncRouteButtons();
  syncSummaryPills();
}

function syncExplanation() {
  const activeRoute = routeConfig();
  explanationTitle.textContent = activeRoute.explanationTitle;
  explanationBody.innerHTML = activeRoute.explanationHtml || activeRoute.explanationBody;
}

function syncBearingCards(travelerPosition, distanceToGoal) {
  const s = strings();
  const activeRoute = routeConfig();
  const movementBearing = activeMovementBearing(travelerPosition);

  chosenBearingTitle.textContent = activeRoute.chosenTitle || s.chosenBearingFallbackTitle;
  chosenBearingCopy.textContent = bearingLabel(movementBearing);
  chosenBearingNote.textContent = activeRoute.chosenNote;

  if (distanceToGoal < 1e-6) {
    goalBearingTitle.textContent = s.resultTitle;
    goalBearingCopy.textContent = s.reachedGoal;
    bearingDeltaCopy.textContent =
      routeMode === "game"
        ? s.resultGameMiss
        : routeMode === "rhumb"
          ? s.resultRhumbReach
          : s.resultOrthodromeReach;
    return;
  }

  const goalBearing = initialBearing(travelerPosition, goal);
  goalBearingTitle.textContent = s.goalBearingTitle;
  goalBearingCopy.textContent = bearingLabel(goalBearing);

  if (routeMode === "orthodrome") {
    bearingDeltaCopy.textContent = s.orthodromeMatches;
    return;
  }

  const delta = shortestBearingDifference(movementBearing, goalBearing);
  bearingDeltaCopy.textContent = delta < 4 ? s.arrowsAlmostMatch : s.arrowsDiffer(Math.round(delta));
}

function syncCompass(travelerPosition, distanceToGoal) {
  const s = strings();
  const movementBearing = activeMovementBearing(travelerPosition);

  compassActiveArrow.style.transform = `translate(-50%, -100%) rotate(${movementBearing}deg)`;
  compassActiveCopy.textContent =
    routeMode === "orthodrome" ? s.compassActiveShortest : s.compassActiveChosen;

  if (distanceToGoal < 1e-6) {
    compassGoalArrow.style.opacity = "0.2";
    compassGoalCopy.textContent = s.compassGoalReached;
    compassGoalCopy.classList.add("is-muted");
    return;
  }

  const goalBearing = initialBearing(travelerPosition, goal);
  compassGoalArrow.style.opacity = "1";
  compassGoalArrow.style.transform = `translate(-50%, -100%) rotate(${goalBearing}deg)`;
  compassGoalCopy.textContent = s.compassGoalNow;
  compassGoalCopy.classList.remove("is-muted");
}

function syncDistanceNote(activeCoordinates, travelerPosition) {
  const s = strings();
  const traveledKm = pathLengthKm(activeCoordinates);
  const shortestKm = d3.geoDistance(start, travelerPosition) * EARTH_RADIUS_KM;
  const differenceKm = Math.max(0, traveledKm - shortestKm);

  if (routeMode === "game" && progress >= 0.995) {
    compassDistanceCopy.textContent = s.distanceMiss;
    return;
  }

  if (differenceKm < 1) {
    compassDistanceCopy.textContent = s.distanceBelowOne;
    return;
  }

  compassDistanceCopy.textContent = s.distanceLonger(Math.round(differenceKm));
}

function render(currentProgress = progress) {
  progress = currentProgress;
  syncStaticText();
  syncPlaybackUi();
  syncExplanation();

  const s = strings();
  const width = globeHost.clientWidth || 720;
  const height = globeHost.clientHeight || width;
  const activeRoute = routeConfig();
  let activeProjection;
  let centerX;
  let centerY;
  let radius;

  svg.attr("viewBox", `0 0 ${width} ${height}`);

  if (projectionMode === "mercator") {
    centerX = width / 2;
    centerY = height / 2 + 4;
    radius = width;
    activeProjection = mercatorProjection
      .translate([centerX, centerY])
      .scale((width - 56) / (2 * Math.PI))
      .center([0, 12])
      .precision(0.3);
  } else {
    const size = Math.min(width, height);
    radius = size * 0.37;
    centerX = width / 2;
    centerY = height / 2 + 6;
    activeProjection = globeProjection
      .translate([centerX, centerY])
      .scale(radius)
      .clipAngle(90)
      .precision(0.3)
      .rotate([-78, -33, 0]);

    if (render.rotationOverride) {
      activeProjection.rotate(render.rotationOverride);
    }
  }

  render.projection = activeProjection;
  pathGenerator.projection(activeProjection);

  if (projectionMode === "mercator") {
    const topLeft = activeProjection([-180, MERCATOR_LAT_LIMIT]);
    const bottomRight = activeProjection([180, -MERCATOR_LAT_LIMIT]);
    mapBackdrop
      .attr("display", null)
      .attr("x", topLeft[0])
      .attr("y", topLeft[1])
      .attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .attr("rx", 26)
      .attr("ry", 26);
    sphereShadow.attr("display", "none");
    sphere.attr("display", "none");
    poleRing.attr("display", "none");
    goalGuide.attr("display", "none");
    draggerHint.text(routeMode === "rhumb" ? s.dragHintMercatorRhumb : s.dragHintMercator);
  } else {
    mapBackdrop.attr("display", "none");
    sphereShadow
      .attr("display", null)
      .attr("cx", centerX + radius * 0.08)
      .attr("cy", centerY + radius * 0.1)
      .attr("r", radius * 1.02);
    sphere.attr("display", null);
    poleRing.attr("display", null);
    goalGuide.attr("display", null);
    draggerHint.text(s.dragHintGlobe);
  }

  sphere.attr("d", pathGenerator({ type: "Sphere" }));
  landPath
    .attr("display", landGeometry ? null : "none")
    .attr("d", landGeometry ? pathGenerator(landGeometry) : null);
  graticulePath.attr("d", pathGenerator(projectionMode === "mercator" ? mercatorGraticule() : globeGraticule));
  equatorPath.attr("d", pathGenerator(equator));
  poleRing.attr("d", pathGenerator(polarCircle));
  goalGuide.attr(
    "d",
    pathGenerator({
      type: "LineString",
      coordinates: [goal, [goal[0], 82]],
    })
  );

  orthodromeReferencePath
    .style("opacity", routeMode === "orthodrome" ? 0 : 1)
    .attr("d", pathGenerator({ type: "LineString", coordinates: orthodromePath }));

  const activeCoordinates = slicePath(activeRoute.path, progress);
  const fadedCoordinates = activeRoute.path.slice(0, Math.max(1, activeCoordinates.length - 1));
  activeRouteFadePath
    .attr("d", pathGenerator({ type: "LineString", coordinates: fadedCoordinates }))
    .attr("stroke", activeRoute.color);
  activeRoutePath
    .attr("d", pathGenerator({ type: "LineString", coordinates: activeCoordinates }))
    .attr("stroke", activeRoute.color);

  startMarker.attr("transform", markerTransform(start));
  goalMarker.attr("transform", markerTransform(goal));

  const travelerPosition = activeCoordinates[activeCoordinates.length - 1] || start;
  const distanceToGoal = d3.geoDistance(travelerPosition, goal);
  const activeColorSoft = d3.color(activeRoute.color);
  activeColorSoft.opacity = 0.18;
  travelerMarker.attr("transform", markerTransform(travelerPosition));
  travelerMarker.select("circle:first-child").attr("fill", activeRoute.color);
  travelerMarker.select("circle:last-child").attr("fill", activeColorSoft.formatRgb());

  if (routeMode === "orthodrome") {
    drawArrowBetween(
      activeArrowLayer,
      travelerPosition,
      pointTowardGoal(travelerPosition, goal, 6),
      activeRoute.color
    );
    goalArrowLayer.attr("display", "none");
  } else {
    drawArrowBetween(
      activeArrowLayer,
      travelerPosition,
      pointAlongBearing(travelerPosition, activeRoute.bearing, 6),
      activeRoute.color
    );
    if (distanceToGoal < 1e-6) {
      goalArrowLayer.attr("display", "none");
    } else {
      drawArrowBetween(
        goalArrowLayer,
        travelerPosition,
        pointTowardGoal(travelerPosition, goal, 6),
        ROUTE_COLORS.goal,
        true
      );
    }
  }

  syncBearingCards(travelerPosition, distanceToGoal);
  syncCompass(travelerPosition, distanceToGoal);
  syncDistanceNote(activeCoordinates, travelerPosition);
  draggerHint.attr("x", centerX).attr("y", height - 16);
}

render.rotationOverride = null;
render.projection = globeProjection;

function animate(timestamp) {
  if (!isPlaying) {
    return;
  }

  if (!animationStart) {
    animationStart = timestamp - progress * animationDuration;
  }

  const elapsed = timestamp - animationStart;
  const eased = d3.easeCubicInOut(Math.min(elapsed / animationDuration, 1));
  render(eased);

  if (elapsed < animationDuration) {
    animationFrame = requestAnimationFrame(animate);
  } else {
    animationStart = timestamp;
    render(0);
    animationFrame = requestAnimationFrame(animate);
  }
}

function play() {
  if (isPlaying) {
    isPlaying = false;
    cancelAnimationFrame(animationFrame);
    animationStart = 0;
    syncPlaybackUi();
    return;
  }

  if (progress >= 1) {
    progress = 0;
    animationStart = 0;
    render(0);
  }

  isPlaying = true;
  syncPlaybackUi();
  animationFrame = requestAnimationFrame(animate);
}

playButton.addEventListener("click", play);
progressSlider.addEventListener("input", (event) => {
  isPlaying = false;
  cancelAnimationFrame(animationFrame);
  animationStart = 0;
  render(Number(event.target.value) / 1000);
});

projectionGlobeButton.addEventListener("click", () => {
  projectionMode = "globe";
  render(progress);
});

projectionMercatorButton.addEventListener("click", () => {
  projectionMode = "mercator";
  render(progress);
});

summaryGame.addEventListener("click", () => {
  routeMode = "game";
  render(progress);
});

summaryRhumb.addEventListener("click", () => {
  routeMode = "rhumb";
  render(progress);
});

summaryOrthodrome.addEventListener("click", () => {
  routeMode = "orthodrome";
  render(progress);
});

explanationBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-set-projection]");

  if (!button) {
    return;
  }

  projectionMode = button.dataset.setProjection;
  render(progress);
});

const drag = d3
  .drag()
  .on("start", (event) => {
    if (projectionMode !== "globe") {
      return;
    }

    globeHost.classList.add("grabbing");
    drag.origin = render.rotationOverride || globeProjection.rotate().slice();
    drag.pointer = [event.x, event.y];
  })
  .on("drag", (event) => {
    if (projectionMode !== "globe" || !drag.origin) {
      return;
    }

    const [lambda, phi, gamma] = drag.origin;
    const dx = event.x - drag.pointer[0];
    const dy = event.y - drag.pointer[1];
    render.rotationOverride = [
      lambda + dx * 0.35,
      Math.max(-85, Math.min(85, phi - dy * 0.35)),
      gamma,
    ];
    render(progress);
  })
  .on("end", () => {
    globeHost.classList.remove("grabbing");
    drag.origin = null;
  });

svg.call(drag);

window.addEventListener("resize", () => render(progress));

syncStaticText();
render(0);
loadLand();
