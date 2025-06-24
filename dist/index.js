"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Metadata: () => metadata_default,
  MetadataPoint: () => metadata_point_default,
  Player: () => player_default,
  Search: () => search_default,
  Transcript: () => transcript_default,
  TranscriptLine: () => transcript_line_default
});
module.exports = __toCommonJS(index_exports);

// src/player.tsx
var import_react2 = require("react");

// src/transcript-line.tsx
var import_react = require("react");

// src/utils/format-time.ts
var padNumber = (num) => num < 10 ? `0${num}` : `${num}`;
var formatTime = (t) => {
  const mins = Math.floor(t / 60);
  const secs = Math.floor(t % 60);
  return `${padNumber(mins)}:${padNumber(secs)}`;
};

// src/transcript-line.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var TranscriptLine = ({ cue, seek, query }) => {
  const [isActive, setIsActive] = (0, import_react.useState)(false);
  const onEnter = (0, import_react.useCallback)(() => setIsActive(true), []);
  const onExit = (0, import_react.useCallback)(() => setIsActive(false), []);
  (0, import_react.useEffect)(() => {
    cue.onenter = onEnter;
    cue.onexit = onExit;
    return () => {
      cue.onenter = null;
      cue.onexit = null;
    };
  }, [cue, onEnter, onExit]);
  const onClick = () => {
    seek(cue.startTime);
  };
  const text = "text" in cue ? cue.text : "";
  const match = Boolean(
    query && "text" in cue && new RegExp(query, "i").test(text)
  );
  let className = "";
  if (match) className = "match";
  else if (isActive) className = "active";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: `${className} line`,
      role: "button",
      tabIndex: 0,
      onClick,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "time", children: [
          "[",
          formatTime(cue.startTime),
          " - ",
          formatTime(cue.endTime),
          "]"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: `${className} text`,
            dangerouslySetInnerHTML: { __html: text }
          }
        )
      ]
    }
  );
};
var transcript_line_default = TranscriptLine;

// src/transcript.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Transcript = ({ track, seek, query }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "track", children: Array.from((track == null ? void 0 : track.cues) || []).map((cue, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  transcript_line_default,
  {
    cue,
    active: false,
    seek,
    query
  },
  `line-${i}`
)) });
var transcript_default = Transcript;

// src/metadata-point.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var MetadataPoint = ({ cue, seek }) => {
  const onClick = () => seek(cue.startTime);
  const data = "text" in cue ? JSON.parse(cue.text) : {};
  const titleAlt = data.title_alt ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "titleAlt", children: data.title_alt }) : "";
  const synopsis = data.synopsis ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Synopsis" }),
    data.synopsis
  ] }) : "";
  const synopsisAlt = data.synopsis_alt ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: data.synopsis_alt }) : "";
  const keywords = data.keywords ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Keywords: " }),
    data.keywords
  ] }) : "";
  const keywordsAlt = data.keywords_alt ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Alternative Keywords: " }),
    data.keywords_alt
  ] }) : "";
  const subjects = data.subjects ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Subjects: " }),
    data.subjects
  ] }) : "";
  const subjectsAlt = data.subjects_alt ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Alternative Subjects: " }),
    data.subjects_alt
  ] }) : "";
  const gpsLink = data.gpspoints.gps ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Geo: " }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "a",
      {
        href: `https://www.google.com/maps/@?api=1&map_action=map&center=${data.gpspoints.gps}&zoom=${data.gpspoints.gps_zoom}`,
        children: data.gpspoints.gps_text
      }
    )
  ] }) : "";
  const hyperlinks = data.hyperlinks.hyperlink_text ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Links: " }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: data.hyperlinks.hyperlink, children: data.hyperlinks.hyperlink_text })
  ] }) : "";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "point", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "time", onClick, children: [
      "[",
      formatTime(cue.startTime),
      "]"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "title", onClick, children: data.title }),
      titleAlt,
      synopsis,
      synopsisAlt,
      keywords,
      keywordsAlt,
      subjects,
      subjectsAlt,
      gpsLink,
      hyperlinks
    ] })
  ] });
};
var metadata_point_default = MetadataPoint;

// src/metadata.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Metadata = ({ track, seek }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "track", children: Array.from((track == null ? void 0 : track.cues) || []).map((cue, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(metadata_point_default, { cue, seek }, `point-${i}`)) });
var metadata_default = Metadata;

// src/search.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var Search = ({ query, updateQuery }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "search", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "icon", children: "\u{1F50D}" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "input",
      {
        value: query,
        onChange: (e) => updateQuery(e.target.value)
      }
    )
  ] }) });
};
var search_default = Search;

// src/player.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var Player = ({
  src = "",
  transcript = "",
  metadata = "",
  preload = false,
  query = ""
}) => {
  var _a, _b;
  const [state, setState] = (0, import_react2.useState)(() => ({
    loaded: false,
    currentTime: 0,
    query: ""
  }));
  const trackRef = (0, import_react2.useRef)(null);
  const metatrackRef = (0, import_react2.useRef)(null);
  const audioRef = (0, import_react2.useRef)(null);
  const onLoaded = (0, import_react2.useCallback)(() => {
    setState((s) => __spreadProps(__spreadValues({}, s), { loaded: true }));
  }, []);
  const checkIfLoaded = (0, import_react2.useCallback)(
    (tries = 0) => {
      tries += 1;
      const e = trackRef.current;
      if (e && e.track && e.track.cues && e.track.cues.length > 0)
        onLoaded();
      else if (!state.loaded) {
        const wait = 25 * Math.pow(tries, 2);
        setTimeout(() => checkIfLoaded(tries), wait);
      }
    },
    [state.loaded, onLoaded]
  );
  (0, import_react2.useEffect)(() => {
    checkIfLoaded();
  }, []);
  const seek = (0, import_react2.useCallback)((secs) => {
    if (audioRef.current) {
      audioRef.current.currentTime = secs;
      audioRef.current.play();
    }
  }, []);
  const updateQuery = (0, import_react2.useCallback)((query2) => {
    setState((s) => __spreadProps(__spreadValues({}, s), { query: query2 }));
  }, []);
  const track = ((_a = trackRef.current) == null ? void 0 : _a.track) || null;
  const metatrack = ((_b = metatrackRef.current) == null ? void 0 : _b.track) || null;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "webvtt-player", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "media", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "player", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "audio",
      {
        controls: true,
        crossOrigin: "anonymous",
        onLoadedData: onLoaded,
        preload: preload ? "auto" : "none",
        ref: audioRef,
        children: [
          src && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("source", { src }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "track",
            {
              kind: "captions",
              src: transcript || "",
              ref: trackRef,
              default: !!transcript,
              label: transcript ? "Captions" : "No captions available"
            }
          ),
          metadata && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "track",
            {
              default: true,
              kind: "metadata",
              src: metadata,
              ref: metatrackRef
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "tracks", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        transcript_default,
        {
          url: transcript,
          seek,
          track,
          query
        }
      ),
      metadata ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        metadata_default,
        {
          url: metadata,
          seek,
          track: metatrack
        }
      ) : ""
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(search_default, { query, updateQuery })
  ] }) });
};
var player_default = Player;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Metadata,
  MetadataPoint,
  Player,
  Search,
  Transcript,
  TranscriptLine
});
