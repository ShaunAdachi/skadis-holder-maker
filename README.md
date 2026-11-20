# SKÅDIS Holder Maker

Browser tool that turns a photo of a hand tool into a 3D-printable holder for the IKEA SKÅDIS pegboard.

**Use it:** open the GitHub Pages site for this repo in Chrome on a PC.

## How it works
1. Print `sheet/skadis_measure_sheet_A4.pdf` on A4 at 100 % (turn off "fit to page"). The two long tick marks on the top edge and on the left edge should be 150.0 mm apart.
2. Lay the tool on the sheet along its long side, tip up, and shoot straight down (about 60 cm, 2× zoom; tested with a Pixel 9a).
3. Drop the photo into the page. The 16 ArUco markers on the sheet correct perspective and scale; a mild lens-distortion profile for the Pixel 9a 2× camera is built in.
4. Choose a holder type, then export the STL:
   - **Slot**: pliers, nippers, scissors. Tip goes through, the tool rests on its shoulders.
   - **Round hole**: screwdrivers.
   - **Tray**: anything without a neck (pens, cutters, tape rolls). No photo needed.
   - **Gridfinity**: a drawer bin (42 mm grid, 7 mm units, optional stacking lip) with a pocket shaped like the tool. Add finger notches by clicking in the Layout view; the pocket floor and rim can be filleted. Prints base-down as exported.
5. Print top-face-down, no supports (round trays need supports inside the curve).

You can zoom the photo and fix the outline by hand (move/add/delete points, or draw a new outline).

The hooks fit a 5.0 mm SKÅDIS board (hook gap 5.1 mm, tested in PETG on a Bambu Lab A1 mini).

## Files
- `index.html` — the whole app (single file). OpenCV.js, manifold-3d and three.js load from jsDelivr.
- `sheet/skadis_measure_sheet_A4.pdf` — measuring sheet.
- `samples/hozan_p14_pliers.jpg` — sample photo for the **Try sample** button.
