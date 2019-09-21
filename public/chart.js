               <script>
function grafica(jsonDir, target, rotulo)
{
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 450 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

//var x = d3.time.scale()
  //  .range([0, width]);

//var y = d3.scale.linear()
//    .range([1, 700]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    ;

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });



var svg = d3.select("#" + target).append("svg")
    .attr("id","comport") 
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    ;



d3.json(jsonDir, function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "DATE" && key !== "_id"; }));

  data.forEach(function(d) {
    var dateObj = new Date(d.DATE)
   // console.log(d.DATE);
  var month = dateObj.getUTCMonth();
  
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
//console.log(day);
//console.log(month);
  //console.log(year);

  newdate = year + "0"+ month + day;
//console.log("DATE:" + String(newdate));
   // d.DATE = parseDate(String(newdate));
d.DATE = new Date(d.DATE);

  });

console.log("INICIO cities");
  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) 
      {
        console.log("dentro de " + d[name]);
        console.log("dentro de " + name);
        //if(name!="date")
        return {date: d.DATE, temperature: +d[name]};

      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.DATE; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { if(v.temperature<139880041)
    {return v.temperature; }}); })
  ]);





//////
console.log("INICIO TEST");

cities.forEach(function(d) {
    
    
    console.log(d.values.temperature);
  for (var i = d.values.length - 1; i >= 0; i--) 
  {
    console.log(d.values[i].DATE); 
  };
 

  });

console.log("                 ");
console.log("Values" + cities.values);

////////////////







console.log("MIn1: " +  d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }));
console.log("max1: " + d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); }));
 
console.log("MIn2: " +  d3.min(cities, function(c) 
  { 

    console.log("m2 v " + c.values); 
    
    return d3.min(c.values, function(v) 
    {
      console.log("m2 tempera" + v.temperature); 

      return v.temperature; 
    }); 
  }));
console.log("max2: " + d3.max(cities, function(c) 
  { return d3.max(c.values, function(v) 
    {
    console.log("m2 " + v.temperature); 
    if(v.temperature<139880041)
    {return v.temperature; }
    }); 
  }));



  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis).selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-35)" 
                });;

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(rotulo);

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});

             }

</script>