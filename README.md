# Tool Holder Maker

Browser tool that turns a photo of a hand tool into 3D-printable storage: holders for the IKEA SKÅDIS pegboard, simple trays, and Gridfinity drawer bins.

**Use it:** open the GitHub Pages site for this repo in Chrome on a PC.

## How it works
1. Print `sheet/measure_sheet_v2_A4.pdf` on A4, or `sheet/measure_sheet_v2_Letter.pdf` on US Letter, at 100 % (turn off "fit to page" / scaling). The two long tick marks on the top edge and on the left edge should be 150.0 mm apart. The light-grey crosses and dashed centre lines help you place the tool straight and centred; the app ignores them when it traces the outline. (The older v1 sheet still works.)
2. Lay the tool on the sheet along its long side, tip up, and shoot straight down (about 60 cm, 2× zoom; tested with a Pixel 9a).
3. Drop the photo into the page. The 16 ArUco markers on the sheet correct perspective and scale, and the lens distortion of each photo is estimated from the same markers (Lens profile: Auto), so any phone camera works without a per-model profile.
4. Choose a holder type, then export the STL:
   - **Slot**: pliers, nippers, scissors. Tip goes through, the tool rests on its shoulders.
   - **Round hole**: screwdrivers.
   - **Tray**: anything without a neck (pens, cutters, tape rolls). No photo needed.
   - **Gridfinity**: a drawer bin (42 mm grid, 7 mm units, optional stacking lip) with a pocket shaped like the tool. Add finger notches by clicking in the Layout view; the pocket floor and rim can be filleted. Prints base-down as exported.
5. Print top-face-down, no supports (round trays need supports inside the curve).

You can zoom the photo and fix the outline by hand (move/add/delete points, or draw a new outline).

The hooks fit a 5.0 mm SKÅDIS board (hook gap 5.1 mm, tested in PETG on a Bambu Lab A1 mini).

## Photos and tools
Every photo you open (file, phone or sample) is listed as a thumbnail in the Photo panel, and its tools appear in the **Tools** list on the right. Ticked tools go into one holder or bin; the counter shows how many are in.

- Switching photos never loses work: each photo remembers its outline edits, threshold, axis and the settings of its tools. Click a thumbnail (or the pencil on a tool) to go back.
- A new photo replaces the tool in the holder if there was only one (the old one stays in the list, unticked; tick it to keep both). With two or more tools ticked, new photos are added. **Add a photo**, opening several files at once, and the phone option *Put every photo's tools into the same holder* always add.
- **Several tools in this photo** (left panel, Outline) splits one photo into several tools. **Pen / round item** adds a pen by size.
- The green number on a thumbnail is how many of its tools are in the holder; × on a thumbnail removes that photo and its tools.

On SKÅDIS the openings sit side by side on one shelf with the chosen spacing; the hooks follow the total width. Each tool has its own menu: Auto, Slot, Round hole or Cup (closed bottom, for pens; the cup depth is set next to it). On Auto a tool follows the Slot / Round hole choice at the top, and with several tools one that would fall through gets a cup. The Pass-through and Opening size headings show which tool they apply to. In a Gridfinity bin the pockets are placed side by side (see *Arranging tools* below). Both warn when the part does not fit the chosen printer. Tools, their settings and the layout are remembered in the browser; photos are kept only while the page is open.

### Editing any tool in a multi-tool photo
Click the pencil on a row in the Tools list, or double-click a tool in the photo, to make it the active tool. Its outline can then be edited with the usual tools, and axis fine-tune, tip/handle swap, thickness and pass-through apply to it. Edits stay when you switch to another tool; changing the edge threshold re-detects everything.

### Name labels
Turn on **Name labels** to engrave each tool's name (0.6 mm deep). Click a name in the list to change it. On SKÅDIS the name goes on the front face of the shelf, scaled to fit its opening; the text height is limited by the shelf thickness (about 2.6 mm at the default 6 mm shelf with a 2 mm fillet — raise *Shelf thickness* for larger text). In a Gridfinity bin the name is engraved in the pocket floor where it fits best, or in the top face where it falls outside the pocket. Text is traced from the browser's own fonts, so Japanese works.

### Floor that follows the tool (Gridfinity)
Click the depth button on a tool's row to set its pocket floor along the length:

- **Zones**: split the length (button, or Shift-click the pocket in the Layout view) and type a depth for each part, e.g. jaws 6 mm, handles 10 mm.
- **Side photo**: lay the tool on its side on the sheet (tip up), open or shoot that photo, confirm it, and the floor follows the measured thickness: `depth = pocket depth − (max thickness − thickness) / 2`, in 0.4 mm steps, so a tool that is symmetric top to bottom lies level. The side photo also fills in the tool thickness used for SKÅDIS slots.

A tool standing on edge is up to its full width above the sheet, and its upper part is closer to the camera, so it looks wider than it is. The side photo is corrected for this: the camera position comes from the sheet markers, with the focal length from the photo's EXIF (35 mm-equivalent × digital zoom) or, without EXIF, from a camera height you type. Each slice's height is taken from the top-view width at that point. In a rendered test (8/10 mm thick, 20/60 mm tall, camera 600 mm up and 27 mm off-centre) the raw readings of 9.1/13.5 mm became 8.1/10.2 mm.

**Round cross-section**: for screwdrivers, pens and the like, tick this in the depth panel and the width seen from above is used as the thickness, so no side photo is needed. Pens and items set to a round hole or cup have it on by default.

Typed depths win over the side photo. The Layout view shades deeper parts darker.

### Outline editor
Auto outlines are simplified to about 0.15 mm from the traced edge (a pair of pliers has ~200 points instead of >1000); measurements still come from the traced mask until you edit.

**Pen (P or D)** draws a new outline the way Illustrator's pen tool does:
- Click places a corner; click-and-drag places a smooth point and pulls out both handles. A move under 3 px still counts as a click, so corners never get tiny handles.
- While dragging: Alt bends the curve (the incoming handle stays, only the outgoing one follows; it stays bent for that drag), Shift keeps the handle at 45° steps, Space moves the point itself.
- Click the last point to cut its outgoing handle (curve → straight); drag it to pull out a new one without changing the curve that came in.
- Shift-click places the next point at 45° steps from the last one. Snapping applies to clicks (G turns it off).
- Click the first point to close (the cursor shows an o); drag it to close with a smooth start, Alt-drag to change only the closing side.
- Hover the path: + adds a point on a segment without changing the curve, − removes a point. Alt-click a point switches curve ↔ corner, Alt-drag a handle bends one side. Ctrl/⌘ moves points and handles; Ctrl/⌘-click on empty canvas finishes.
- Enter, Esc or P finishes. Backspace / Delete removes the last point, Ctrl+Z undoes the last pen step. A dashed rubber band shows what the next click would draw. Switching to another tool or photo keeps a closable path as the new outline (Ctrl+Z brings the old one back).

**Edit (A or E)** is direct selection:
- Click or box-select points (Shift adds or removes). Drag a point to move it with its handles; Shift keeps the move at 45°.
- Drag a line itself to bend it: both end handles adjust so the grabbed spot follows the pointer (straight lines get new handles).
- Double-click a line to add a point exactly on the curve (De Casteljau split, the shape does not change).
- Handles: on a smooth point the other handle stays opposite and keeps its own length; Alt makes it a corner and moves one side only; Shift for 45° steps.
- Anchor point tool (hold Alt, or Shift+C to keep it on): click a smooth point to make it a sharp corner, drag a corner to pull out a fresh pair of equal handles.
- S toggles selected points between automatic curve and corner. Anchors are squares (filled when selected); only the selected points' handles and the facing handles of their neighbours are shown. Hit areas are 8 px for points and handles and 6 px for lines at any zoom.

**Snapping** (magnet button or G; in the edit tool, Ctrl/⌘ while dragging inverts it; in the pen, Shift-click gives 45° steps instead). While dragging a point or drawing, its edges snap to straight lines along or square to the red centre line or the sheet, parallel to one of the 12 longest edges, or level with another corner; two guides at once snap to their crossing. The reach is 5 px, or up to 2° of angle (at most 1.5 mm when dragging, 4 mm when drawing). Pink dashed lines show the guides.

### Arranging tools in a Gridfinity bin
In the Layout view, click a tool (or its row in the list) to select it; its red centre line and a round handle appear, and a Placement panel opens under its row.
- Drag to move. The centre line snaps to the bin centre, grid-cell centres and other tools' centre lines (hold Ctrl/⌘ to move freely).
- Drag the round handle to turn it (15° steps, Shift for 1°), or type an angle / use ±90° in the panel. Arrow keys move 0.5 mm (Shift 5 mm), R turns 90°.
- Finger notches: double-click to add, click to select, Delete (or right-click, or × in the notch list) to remove, drag to move. A single click no longer adds a notch.

Layout offsets and angles of kept tools are remembered in the browser. In the photo, the ends of the red centre line can be dragged to set the tool's axis. With several tools from one photo, the list shows each tool's number in the same colour as in the photo and marks the one whose outline is being edited.

## Printer
Pick your printer under **Export** (Bambu Lab A1 mini / A1 / P1S·P1P·P2S·X1C / H2S / H2D, Prusa MINI+ / MK4S / CORE One, Creality Ender-3 V3·K1C / K2 Plus, Elegoo Centauri Carbon, Anycubic Kobra 3, or a custom size). Holders, trays and bins are checked against its build plate (2 mm margin, either orientation) and height, and the Gridfinity hint shows the largest bin that fits. The choice is remembered in the browser.

## Shoot with a phone
Click **Phone** in the toolbar. The PC page shows a QR code; scan it with the phone to open `capture.html`.

- The capture page finds the sheet markers live and checks four things: all corner markers in view (≥ 12 of 16), tilt ≤ 2.5° (from the sheet's perspective, shown as a bubble level), detail ≥ 8 px/mm in the final photo, and the phone held still for 0.5 s.
- When all four are green it shoots by itself (full-resolution `ImageCapture.takePhoto` on Android Chrome, a full-size video frame elsewhere), checks that the markers are still readable, and uploads the photo.
- The PC page polls the relay every 2 s and loads the photo as soon as it arrives. You can shoot several tools in a row; each new photo replaces the current one.

The photo passes through `relay/worker.js`, a small Cloudflare Worker + R2 bucket that keeps one photo per session and deletes it on pickup (or after 15 minutes). It only accepts requests from this site. Setup steps: `relay/README.md`.

## Files
- `index.html` — the whole app (single file). OpenCV.js, manifold-3d and three.js load from jsDelivr.
- `sheet/measure_sheet_v2_A4.pdf`, `sheet/measure_sheet_v2_Letter.pdf` — measuring sheet v2 (`sheet/skadis_measure_sheet_A4.pdf` is the older v1). The Letter sheet uses marker ids 96–111 from DICT_4X4_250, whose first 100 markers are the same as DICT_4X4_100.
- `capture.html` — phone capture page (opened from the QR code).
- `relay/` — Cloudflare Worker for phone → PC photo hand-off.
- `samples/hozan_p14_pliers.jpg` — sample photo for the **Try sample** button.
