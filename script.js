const url =
  'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const getGDPData = () => d3.json(url);

const w = 800;
const h = 500;
const padding = 70;
const svg = d3
  .select('#chart-container')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

let tooltip = d3
  .select('#chart-container')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0);

getGDPData().then((data) => {
  console.log(data);

  const parseTime = d3.timeParse('%M:%S');
  const parsedData = data.map((d) => {
    return {
      year: d.Year,
      time: parseTime(d.Time),
    };
  });
  console.log(parsedData);

  const yearMin = d3.min(parsedData, (d) => d.year);
  const yearMax = d3.max(parsedData, (d) => d.year);
  const timeMin = d3.min(parsedData, (d) => d.time);
  const timeMax = d3.max(parsedData, (d) => d.time);

  const xScale = d3
    .scaleLinear()
    .domain([yearMin, yearMax])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleTime()
    .domain([timeMin, timeMax])
    .range([h - padding, padding]);

  const yearAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
  const timeAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${h - padding})`)
    .call(yearAxis);

  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(timeAxis);

  svg
    .selectAll('circle')
    .data(parsedData)
    .enter()
    .append('circle')
    .attr('data-xvalue', (d, i) => d.year)
    .attr('data-yvalue', (d, i) => d.time)
    .attr('index', (_d, i) => i)
    .attr('stroke', 'white')
    .attr('stroke-width', 0.1)
    .attr('cx', (d, i) => xScale(d.year))
    .attr('cy', (d) => yScale(d.time))
    .attr('r', 5)
    .attr('class', 'dot');
  // .on('mouseover', (e, d) => {
  //   const i = e.target.getAttribute('index');
  //   tooltip.transition().duration(200).style('opacity', 0.9);

  // tooltip
  //   .html(`${d[0]}<br>$${d[1]}`)
  //   .attr('data-date', d[0])
  //   .style('left', `${xScale(new Date(data.data[i][0]))}px`)
  //   .style('bottom', `${padding - 15}px`);
  // })
  // .on('mouseout', () => {
  //   tooltip.transition().duration(200).style('opacity', 0);
  // });
});
