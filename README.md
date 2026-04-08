# Loxodrome vs Orthodrome

Small static D3 example showing why keeping one compass direction on a globe is
not usually the shortest route.

<img width="1257" height="953" alt="image" src="https://github.com/user-attachments/assets/59c0deb3-b31e-4b43-adee-5fa22c419048" />


## What it includes

- three path modes: initial direction, loxodrome, orthodrome
- globe and Mercator projection toggle
- English by default, plus a Russian language switch
- animated compass showing the chosen direction and the current bearing to the goal
- distance note comparing the active route against the shortest arc so far
- draggable globe and animation slider

## Run locally

No build step is required. Serve the folder with a simple static server:

```bash
cd loxodrome-orthodrome
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).
