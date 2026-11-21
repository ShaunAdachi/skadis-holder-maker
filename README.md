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

On SKÅDIS the openings sit side by side on one shelf with the chosen spacing; the hooks follow the total width. Each tool can be a slot, a round hole or a cup (closed bottom, for pens). Tools without a neck that would fall through get a cup automatically. In a Gridfinity bin the pockets are placed side by side; drag a pocket in the Layout view to move it, and use the turn button to swap a tool end for end. Both warn when the part is wider than the A1 mini bed (180 mm).

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
