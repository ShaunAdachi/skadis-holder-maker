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

## Several tools in one holder
The **Tools in this holder** list (right panel) collects what goes into one SKÅDIS hanger or Gridfinity bin:

- **Keep, add another photo** keeps the current tool in the list; open the next photo and repeat.
- **Several tools in this photo** (left panel, Outline) turns every separate tool on the sheet into its own item.
- **Pen / round item** adds a pen or marker by diameter and length, no photo needed.

You can also drop or open several photos at once (each becomes one item), and in the phone dialog tick *Collect every photo into one holder*. Use ↑ to change the order. Kept tools and your clearance settings are remembered in the browser (localStorage); *Clear kept tools* empties the list.

On SKÅDIS the openings sit side by side on one shelf with the chosen spacing; the hooks follow the total width. Each tool has its own menu: Auto, Slot, Round hole or Cup (closed bottom, for pens; the cup depth is set next to it). On Auto a tool follows the Slot / Round hole choice at the top, and with several tools one that would fall through gets a cup. The choice stays with the tool when you switch which tool of a photo you are editing, re-detect the outline, or keep it. The Pass-through and Opening size headings show which tool they apply to. In a Gridfinity bin the pockets are placed side by side; drag a pocket in the Layout view to move it, and use the turn button to swap a tool end for end. Both warn when the part does not fit the chosen printer.

### Editing any tool in a multi-tool photo
Click the node button on a row in the tools list, or double-click a tool in the photo, to make it the active tool. Its outline can then be edited with the usual tools, and axis fine-tune, tip/handle swap, thickness and pass-through apply to it. Edits stay when you switch to another tool; changing the edge threshold re-detects everything.

### Name labels
Turn on **Name labels** to engrave each tool's name (0.6 mm deep). Click a name in the list to change it. On SKÅDIS the name goes on the front face of the shelf, scaled to fit its opening; the text height is limited by the shelf thickness (about 2.6 mm at the default 6 mm shelf with a 2 mm fillet — raise *Shelf thickness* for larger text). In a Gridfinity bin the name is engraved in the pocket floor where it fits best, or in the top face where it falls outside the pocket. Text is traced from the browser's own fonts, so Japanese works.

### Floor that follows the tool (Gridfinity)
Click the depth button on a tool's row to set its pocket floor along the length:

- **Zones**: split the length (button, or Shift-click the pocket in the Layout view) and type a depth for each part, e.g. jaws 6 mm, handles 10 mm.
- **Side photo**: lay the tool on its side on the sheet (tip up), open or shoot that photo, confirm it, and the floor follows the measured thickness: `depth = pocket depth − (max thickness − thickness) / 2`, in 0.4 mm steps, so a tool that is symmetric top to bottom lies level. The side photo also fills in the tool thickness used for SKÅDIS slots.

A tool standing on edge is up to its full width above the sheet, and its upper part is closer to the camera, so it looks wider than it is. The side photo is corrected for this: the camera position comes from the sheet markers, with the focal length from the photo's EXIF (35 mm-equivalent × digital zoom) or, without EXIF, from a camera height you type. Each slice's height is taken from the top-view width at that point. In a rendered test (8/10 mm thick, 20/60 mm tall, camera 600 mm up and 27 mm off-centre) the raw readings of 9.1/13.5 mm became 8.1/10.2 mm.

**Round cross-section**: for screwdrivers, pens and the like, tick this in the depth panel and the width seen from above is used as the thickness, so no side photo is needed. Pens and items set to a round hole or cup have it on by default.

Typed depths win over the side photo. The Layout view shades deeper parts darker.

### Snapping in the outline editor
While dragging a point (or placing points in Draw mode), the edges next to it snap to straight lines: along or square to the red centre line, the sheet's horizontal and vertical, parallel to any other edge of the outline (the reference edge is highlighted), or level with another point. When two guides are close it snaps to their crossing, so corners come out square. Straight, square and parallel guides catch an edge that is up to 3.5° off (at most 6 mm), so long edges drawn by eye straighten too; lining up with other points uses a fixed 8 px reach. While drawing, the new point is also checked against the first point, so the closing edge straightens as well. Pink dashed lines show the guides. Hold Ctrl/⌘ to move freely.

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
