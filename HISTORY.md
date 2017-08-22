v2.2.0
==================
* Added useCategoryInTooltip so that if a series has a category it will display it instead of the axis name. The name can be configured through `name` for the appropriate category in `seriesConfig` or will be created

v2.1.3
==================
* fix for width resize issue when width is not the smallest side
* fix for demo delete series

v2.1.2
==================
* fix issue where an axes couldn't be un muted from the register

v2.1.1
==================
* Ensure lower svg is taken into account when getting image
* muted categories are now reflected (and can be set) in mutedSeriesCategories

v2.0.0
==================
* upgrade vis to 2.0.0
* Add highlight components for optional crosshair
* Add cursor component
* Categories colorscan now be configured through seriesConfig
* Ensure category and axis register gets category color
* Toolbar now controls axis actions
* Internationalization support
* Fixes to allow dev set color for series and for categories
* Breaking changes:
  * Implement toolbar to control interactions. You can no longer have multiple interactions on the same mouse event (IE drag and brush)

v1.2.0 && 1.2.1
==================
* clearfix pr

v1.1.3
==================
* remove cleanOnDetached

v1.1.2
==================
* fixed issue with auto resize and take label length into account for determining size. The chart should now more precisely use the space available

v1.1.1
==================
* fixed bug where register doesnt mute on start with mutedAxes

v1.1.0
==================
* upgraded to vis 1.1.0
* progressive rendering now can be customized through progressiveRenderingPointsPerFrame (16000 by default for lines, 2000 byy default for scatter) and progressiveRenderingMinimumFrames. Increase progressiveRenderingPointsPerFrame for better performance and decrease for smoother drawing. When at the right value no performance cost incurs and drawing is smooth but if value is too small can incur a performance cost (i.e the drawing will take longer but will still start at the same time, also the UI won't be frozen)
* added cleanOnDetached to allow reuse of the chart after detaching it from the dom. This is aimed at applications creating charts dynamically so that they can keep a pool of charts (simple array of charts) when removing them from the dom and reusing them later on with new data and config, improving performance . Turning cleanOnDetached on will make sure the chart will clear everything needed so that it draws properly with any new config. If using this strategy one thing to keep in mind is making sure the chart is re-appended in the dom *before* changing its properties to their new values. In most cases it would work even if appending it after, but some edge cases scenarios might fail to clean some visual artifact (for example switching from canvas to svg while deleting a few series at the same time). When moving the chart around the dom do not turn it on for performance boost and making sure you don't need the chart to force redrawing. This can be changed dynamically
* added debounceResizeTiming to control the debounce timing on auto resize, changed default from 100ms to 250ms

v1.0.2
==================
* Fixing dark theme demo

v1.0.1
==================
* Updating docs

v1.0.0
==================
* modified internal mechanism for sizing and laying out the chart
* added chartHorizontalAlignment and chartVerticalAlignment to align the chart drawing when smaller than its container
* added tooltipConfig
* tooltip doesn't show timestamp by default anymore. To enable it use forecDateTimeDisplay in tooltipConfig
* update to vis 1.0.0
* added PxVisBehaviorChart.chartCommonMethods and associated changes
* Added layers and svgLower
* Added axis register (on the right) and category register (on top, only if using categories).
Can be hidden respectively with hideAxisRegister and hideCategoryRegister. Can be configured respectively with axisRegisterConfig and categoryRegisterConfig
* Axis register can have dynamic menus
* Tooltip is now off by default. Enable with showTooltip
* Added toolbar, configurable through toolbarConfig
* changing ghp.sh to account for Alpha releases

v0.1.1
==================
* Themeable
* Changed default dataVisColor order to start at 0 for consistency with dark theme
* updated tests

v0.1.0
==================
* Updated dependencies

v0.0.15
==================
* updating slider dependency

v0.0.14
==================
* changing all devDeps to ^

v0.0.13
==================
* Update px-theme to 2.0.1 and update test fixtures

v0.0.12
==================
* update dependencies for dropdown

v0.0.11
==================
* removing px-theme style call

v0.0.10
==================
* allow setting empty axes to delete axes

v0.0.9
==================
* bower updating px-demo-snippet

v0.0.8
==================
* fixed seriesConfig color

v0.0.7
==================
* delay chart draw until after attach

v0.0.6
==================
* codepen

v0.0.5
==================
* Edited demo

v0.0.4
==================
* DEMO!

v0.0.3
==================
* update to vis v0.6.0
* added clip path to canvas
* area clip path for svg
* fixes to tooltip

v0.0.2
==================
* added travis integration

v0.0.1
==================
* Initial release
