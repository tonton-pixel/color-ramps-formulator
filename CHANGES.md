# Release Notes

This project adheres to [Semantic Versioning](https://semver.org/).

## 2.14.0

- Prepared for polynomial regression feature.
- Updated `@electron/remote` module to version `1.2.0`.
- Updated `Electron` to version `13.1.5`.

## 2.13.0

- Used `@electron/remote` module.
- Updated `Electron` to version `13.1.0`.

## 2.12.4

- Updated `Electron` to version `13.0.1`.

## 2.12.3

- Added support for building `.zip` (compressed archive), `.dmg` (disk image), and `.pkg` (installer) files for macOS.
- Added support for building `.AppImage` (for Linux), and `.exe` (for Windows) executable files.
- Updated `Electron` to version `12.0.7`.

## 2.12.2

- Added support for building .pkg installer file for macOS.
- Updated `Electron` to version `12.0.5`.

## 2.12.1

- Updated `Electron` to version `12.0.2`.

## 2.12.0

- Added optional confirm quit dialog.
- Updated `Electron` to version `12.0.0`.

## 2.11.2

- Updated `Electron` to version `11.2.3`.

## 2.11.1

- Updated font stacks: improved display on Windows.
- Updated `Electron` to version `11.2.1`.

## 2.11.0

- Used common CSS variables for font stacks.
- Updated and expanded font stacks.
- Updated `Electron` to version `11.2.0`.

## 2.10.0

- Added more intermediate color pre-filters to the `Apply Color Map...` feature.
- Updated `Electron` to version `11.0.3`.
- Updated `Electron Packager` to version `15.2.0`.

## 2.9.0

- Added persistence of `Apply Color Map...` modal window's width and height.
- Added tooltip with image file pathname to the canvas element of the `Apply Color Map...` modal window.
- Updated `Electron` to version `11.0.2`.

## 2.8.0

- Added a new `Apply Color Map...` experimental feature, accessible from a new `Image` menu.
- Forced proper Latin font `Segoe UI` as a substitute to `system-ui` on Windows.
- Added context menu to external reference links, allowing copy of URL to clipboard; unused yet.
- Updated `Electron` to version `10.1.5`.

## 2.7.0

- Used fixed size for preview images.
- Added four new formula examples.
- Removed use of Escape key to exit fullscreen mode.
- Updated color reference links in documentation.

## 2.6.0

- Refactored code generating `Contrast` test image.
- Added new test image: `Radiograph`.
- Added two new formula examples.

## 2.5.0

- Generated `Sinusoidal` and `Uniformity` test images dynamically at start-up time.
- Added dynamically generated `Contrast` test image, based on Campbell-Robson CSF chart.
- Updated `Electron` to version `10.1.3`.

## 2.4.0

- Added new test image: `Uniformity`, useful to evaluate perceptual contrast.
- Refactored code to generate gradient file data from color ramp, and moved it to a separate module.

## 2.3.0

- Implemented export to Photoshop gradient file format (.grd).
- Added automatic calculation at start-up time.
- Restricted display of modal dialogs over main window only.
- Fixed clearing previews of empty formula.
- Updated `Electron` to version `10.1.2`.

## 2.2.0

- Added new test image: `Sinusoidal`.
- Improved quality of downsized previews.
- Updated `Electron` to version `10.1.1`.

## 2.1.0

- Added choice between horizontal and vertical layout in the color table contextual menu.
- Fixed resetting formula field scroll to left as well as top.
- Refactored preview code.
- Updated `Electron` to version `10.1.0`.

## 2.0.0

- Added test image preview (grayscale mapping of color ramp) as a supplement to color table preview.
- Added support for enlarged previews in pop-up dialog window (via double-click or contextual menu).
- Darkened green (and consequently yellow and cyan) component pixels for better visibility in the curves map preview.
- Disjoined import and export menu buttons.
- Allowed export of binary formats even when the length of color ramp is less than 256, as a simulated distribution of discrete colors.
- Added new components helper function: `gamma ()`.
- Added new RGB colors helper functions: `average_colors ()`, `temperature_color ()`.
- Updated color reference links in documentation.
- Updated `Electron` to version `9.2.1`.
- Updated `Electron Packager` to version `15.1.0`.

## 1.11.0

- Moved `Steps` and `Reverse` options to scope of formulas.
- Refactored color ramps code.
- Updated formula examples.
- Updated `README.md`.
- Updated `Electron` to version `9.1.2`.

## 1.10.0

- Added `Steps` and `Reverse` options.
- Improved import of color ramp data files.
- Updated formula examples.
- Used unique window dimensions.
- Improved user interface layout.
- Cleaned up code and file structure.
- Updated `Electron` to version `9.1.1`.

## 1.9.0

- Added a new color helper function: `transform_color ()`.
- Added new formula examples, and updated documentation accordingly.

## 1.8.0

- Added support for named color strings: `XKCD Color Names` and `Mac OS X Crayons`.
- Allowed formulas to alternatively return a named color string or hex color string instead of a standard RGB color array.
- Used XYZ instead of RGB color model for averaging in the `discrete_colors ()` helper function.

## 1.7.0

- Fixed resetting formula field scroll to top.
- Updated reference links in documentation.
- Updated `Electron` to version `9.1.0`.

## 1.6.0

- Added a dynamically-generated `Lists of Color Names` page, accessible from the `Help` menu.

## 1.5.0

- Added a dynamically-generated `Gallery of Examples` page, accessible from the `Help` menu.
- Improved performance of the helper function `rgb_colors_t ()`.
- Updated `Electron Packager` to version `15.0.0`.

## 1.4.1

- Fixed missing `Locale` value in the `System Info` dialog.

## 1.4.0

- Added display of `System Info` dialog from the `Help` menu.
- Updated `Electron` to version `9.0.5`.

## 1.3.0

- Added support for import/export of color ramps in TSV (tab-separated values) data file format.
- Added examples to `README.md`.
- Improved documentation.

## 1.2.0

- Updated documentation, merged into a single page with navigation sidebar.
- Added indentation to saved preview SVG files.
- Updated `Electron` to version `9.0.4`.

## 1.1.0

- Added new formula examples.
- Updated app building instructions.
- Updated `Electron` to version `9.0.2`.

## 1.0.0

- First official release.

## 1.0.0-beta.14

- Revamped display of calculated color ramp as a list of 256 color values (RGB and Hex) and matching color swatches.
- Implemented export to four color ramp data file formats (`.json`, `.act`, `.amp`, `.lut`).
- Used smaller default window dimensions.

## 1.0.0-beta.13

- Used basic RGB instead of Lab color model for averaging of consecutive discrete colors.
- Updated app's description.

## 1.0.0-beta.12

- Added an optional `average` parameter to the `discrete_colors ()` function, allowing some extra transitions between consecutive colors, producing more visually equal ranges.
- Updated formula examples and format page accordingly.

## 1.0.0-beta.11

- Required hue mode to be explicitely set for hue-based color models, in calls to `interpolate_colors ()` and `distribute_colors ()` functions.
- Updated all color map formula examples, making use of `discrete_colors ()`.
- Defined platform-independent focus outline color for text areas.
- Added app name and version as comments to the generated SVG files.

## 1.0.0-beta.10

- Improved shape rendering of SVG previews; fixed vertical artefacts when discrete gradients were zoomed in.

## 1.0.0-beta.9

- Revamped `discrete_colors ()` function.
- Updated formula format page accordingly.
- Renamed `Samples` to `Examples`.
- Added and updated formula examples.
- Added choice between discrete and continuous gradient formats in the linear gradient contextual menu.
- Used smaller default window.
- Updated `Electron` to version `8.3.0`.

## 1.0.0-beta.8

- Renamed application to `Color Ramp Formulator`.

## 1.0.0-beta.7

- Added File menu in menu bar.
- Added Import/Export actions menu button.
- Added import from four color ramp data file formats (`.json`, `.act`, `.amp`, `.lut`), with automatic conversion to custom formula format, making use of a new `discrete_colors ()` color helper function.
- Improved handling of invalid loaded or imported data files.

## 1.0.0-beta.6

- Revamped calculations of saturation and hue in the function converting `RGB` to `CubeHelix HSL`, making use of all coefficients.
- Updated component values for examples of `cubehelix ()` and `cubehelix_t ()` in the formula format help page.
- Used 'fractional range' terminology instead of 'float range'.
- Updated formula samples.
- Added provisional reference links to the documentation help page.

## 1.0.0-beta.5

- Moved calculation of `t` (`x / 255`) out of the `colorRamp.evaluate ()` function.
- Improved error handling when calculating color ramp by using higher-level try/catch.
- Improved validity check of formulas.
- Added color helper functions `cubehelix ()`, `cubehelix_t ()`, and `cubehelix_color ()`.
- Revamped color helper functions `interpolate_colors ()` and `distribute_colors ()`:
    - Added support for `Lab`, `XYZ`, `YCbCr`, and `CubeHelix HSL` color models.
    - Added hue option as string suffix to hue-based color models.
    - Allowed smoothness to be applied to all color models, and to each color component independently.
    - Lifted restrictions on smoothness range: [0, 100].
- Used simpler, more consistent fractional range for `a` and `b` components of `Lab` color model.
- Updated formula samples accordingly.
- Added drafts pages about documentation and formula format, accessible from the `Help` menu.
- Improved display of monospaced fonts on Linux by adding "DejaVu Sans Mono" to the font stack.
- Added line breaks to generated SVG.
- Updated design of application icons.
- Updated `Electron` to version `8.2.5`.

## 1.0.0-beta.4

- Added two new color helper functions: `rgb_color_t ()` and `rgb_colors_t ()` to convert RGB colors with components expressed in fractional range `[0, 1]` to standard `[0, 255]`.
- Improved evaluation of formulas.
- Updated formula samples.
- Updated `Electron` to version `8.2.2`.

## 1.0.0-beta.3

- Added support for `HWB` (Hue, White, Black) and `Grayscale` color models.
- Added RGB colors helper function: `wavelength_color ()`.
- Improved performance of color conversions.
- Disallowed comments in formulas.
- Updated formula samples.
- Updated package keywords.

## 1.0.0-beta.2

- Renamed the RGB colors functions `distributeColors ()` and `interpolateColors ()` to `distribute_colors ()` and `interpolate_colors ()` respectively.
- Updated sample formulas accordingly.
- Allowed underscore characters in named color strings.
- Improved styling of disabled preview areas.
- Disabled resizing of text areas.
- Updated keywords in `package.json`.
- Updated screenshot in `README.md`.
- Updated release notes.

## 1.0.0-beta.1

- Initial beta release:
    - No end-user documentation.
    - No packaged release for macOS.
    - File format, syntax, and validation of formulas are not yet finalized.
    - Some features are missing, and some others may be removed later.
