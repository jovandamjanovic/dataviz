var x = d3.scaleLinear()
    .domain([0, d3.max(array, function (d) {
        return d.value;
    }) * 1.1])
    .range([0, width]);
var svg = d3.select("#graph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var bar = svg.selectAll("g")
    .data(array)
    .enter().append("g");
var rect = bar.append("rect")
    .attr("height", barHeight - 1);
var text = bar.append("text")
    .attr("y", barHeight / 2)
    .attr("dy", ".5em");
bar.exit().remove();
bar.attr("transform", function (d, i) {
    return "translate(0," + i * barHeight + ")";
});
rect.attr("width", function (d) {
    return x(d.value);
})
    .attr("fill", function (d, i) {
        return colors(i)
    });
text.attr("x", function (d) {
    return x(d.value) - 3;
})
    .text(function (d) {
        return d.key;
    });
var table = d3.select("#tableData").append("table");
var thead = table.append("thead").append("tr");
var tbody = table.append("tbody");

thead.append("th").text(array.fieldName);
thead.append("th").text("N");
thead.append("th").text("%");

var rows = tbody.selectAll("tr")
    .data(array)
    .enter()
    .append("tr");

var total = d3.sum(array, function (d) {
    return d.value;
});

rows.append("td").text(function (d) {
    return d.key;
});
rows.append("td").text(function (d) {
    return d.value;
});
rows.append("td").text(function (d) {
    return ((d.value / total) * 100).toFixed(2) + "%";
});