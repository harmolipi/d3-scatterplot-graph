const url =
  'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const getGDPData = () => d3.json(url);

const w = 800;
const h = 500;
const padding = 70;
const colors = ['rgb(66, 128, 153)', 'rgb(216, 107, 107)'];

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

const legendContainer = svg.append('g').attr('id', 'legend');

const legend = legendContainer
  .selectAll('#legend')
  .data(colors)
  .enter()
  .append('g')
  .attr('class', 'legend-label')
  .attr('transform', (d, i) => 'translate(0,' + (h / 2 - i * 20) + ')');

legend
  .append('rect')
  .attr('x', w - 18)
  .attr('width', 18)
  .attr('height', 18)
  .style('fill', (d, i) => colors[i]);

legend
  .append('text')
  .attr('x', w - 24)
  .attr('y', 9)
  .attr('dy', '.35em')
  .style('text-anchor', 'end')
  .text((d) =>
    d === 'rgb(66, 128, 153)' ? 'No doping allegations' : 'Doping allegations'
  );

getGDPData().then((data) => {
  console.log(data);

  const parseTime = d3.timeParse('%M:%S');
  const parsedData = data.map((d) => {
    return {
      time: parseTime(d.Time),
      name: d.Name,
      year: d.Year,
      nationality: d.Nationality,
      doping: d.Doping,
    };
  });
  console.log(parsedData);

  const yearMin = d3.min(parsedData, (d) => d.year);
  const yearMax = d3.max(parsedData, (d) => d.year);
  const timeMin = d3.min(parsedData, (d) => d.time);
  const timeMax = d3.max(parsedData, (d) => d.time);

  const xScale = d3
    .scaleLinear()
    .domain([yearMin - 1, yearMax + 1])
    .range([padding, w - padding * 2]);

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
    .attr('class', 'dot')
    .attr('fill', (d) => (d.doping === '' ? colors[0] : colors[1]));
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
