# D3 Scatterplot Graph

Created as part of [freeCodeCamp](https://www.freecodecamp.org) curriculum.

View on [Github](https://github.com/harmolipi/d3-scatterplot-graph).

## Functionality

This is the [Scatterplot Graph](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-scatterplot-graph) project, where I pull data from an API and visualize it in a scatterplot graph with the D3 library.

## Thoughts

Good continuation from the last project (the bar chart). The nice thing is that it had a lot in common with that last project, so it was rather easy to reuse everything that was the same (mainly pulling the data and displaying the axes), and then I simply changed the bar chart's rectangles to circles with `cx`, `cy`, and `r` attributes, and with the new data, it became a scatterplot graph. The only tricky part was changing the axes' scaling to work properly with time values, but D3 has some helpful methods for that.

God bless.

-Niko Birbilis
