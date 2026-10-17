# VQTF Courses

Two beginner-friendly courses, each split into one page per part.

```
index.html                 landing page linking both courses
quantum-computing/         Quantum Computing (Parts 1-7)
pqc/                       PQC and Quantum Cryptography (Parts 1-6)
```

Inside each course folder:

| File | What it holds |
|---|---|
| `index.html` | Home page and table of contents |
| `partN.html` | The content of Part N |
| `css/style.css` | All styles for the course |
| `js/site.js` | Shared behaviour: section tabs, step-by-step view, previous/next buttons |
| `js/partN.js` | Interactive demos and animations used only by Part N |

To change a part, edit its `partN.html` (and `js/partN.js` for its demos). Sections inside a part can be opened directly with `partN.html#3` (the 4th section, counting from 0).
