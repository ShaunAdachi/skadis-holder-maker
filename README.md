# Tool Holder Maker

Browser tool that turns a photo of a hand tool into 3D-printable storage: holders for the IKEA SKÅDIS pegboard, simple trays, and Gridfinity drawer bins.

**Use it:** open the GitHub Pages site for this repo in Chrome on a PC.

## How it works
1. Print `sheet/measure_sheet_v2_A4.pdf` on A4 at 100 % (turn off "fit to page"). The two long tick marks on the top edge and on the left edge should be 150.0 mm apart. The light-grey crosses and dashed centre lines help you place the tool straight and centred; the app ignores them when it traces the outline. (The older v1 sheet still works.)
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

## Phone capture relay (optional)
`relay/worker.js` is a small Cloudflare Worker + R2 bucket that passes one photo from the phone capture page to the PC page and deletes it on pickup (or after 15 minutes). See the setup steps in `relay/README.md`.

## Files
- `index.html` — the whole app (single file). OpenCV.js, manifold-3d and three.js load from jsDelivr.
- `sheet/measure_sheet_v2_A4.pdf` — measuring sheet v2 (`sheet/skadis_measure_sheet_A4.pdf` is the older v1).
- `relay/` — Cloudflare Worker for phone → PC photo hand-off.
- `samples/hozan_p14_pliers.jpg` — sample photo for the **Try sample** button.
