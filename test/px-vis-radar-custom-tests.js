document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  suite('px-vis-radar basic setup works', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            "y2": 1,
            'y3': 5
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            "y2": 21,
            'y3': 10
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            "y2": 3,
            'y3': 15
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            "y2": 10,
            'y3': 55
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            "y2": 27,
            'y3': 75
          }
        ],
        dim = ['y','y1','y2','y3'],
        w = 500,
        h = 460;

      var rendered = function() {
        basicRadar.removeEventListener('px-vis-chart-canvas-rendering-ended', rendered);
        setTimeout(function() { done(); }, 2000);
      };
      basicRadar = document.getElementById('basicRadar');
      basicRadar.addEventListener('px-vis-chart-canvas-rendering-ended', rendered);

      basicRadar.set('width',w);
      basicRadar.set('height',h);
      basicRadar.set('seriesKey',"x");
      basicRadar.set('axes',dim);
      basicRadar.set('chartData',d);
    });

    test('basicRadar fixture is created', function() {
      assert.isTrue(basicRadar !== null);
    });

    test('basicRadar _extendedCenter', function() {
      assert.closeTo(basicRadar._extendedCenter[0], 255, 3);
      assert.closeTo(basicRadar._extendedCenter[1], 230, 3);
    });

    test('basicRadar centerOffset', function() {
      assert.closeTo(basicRadar.centerOffset, 61.5, 3);
    });

    test('basicRadar ticks', function() {
      assert.equal(basicRadar.ticks, 4);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3']);
    });

    test('basicRadar svg', function() {
      var re = /translate\((\d+\.?\d*)\s?,?(\d+\.?\d*)\)/,
          translate = re.exec(basicRadar.svg.attr('transform'));

      assert.equal(basicRadar.svg.node().tagName, 'g');
      assert.closeTo(Number(translate[1]), 255, 3);
      assert.closeTo(Number(translate[2]), 230, 3);
    });

    test('basicRadar pxSvgElem', function() {
      assert.equal(basicRadar.pxSvgElem.tagName, 'svg');
      assert.closeTo(basicRadar.pxSvgElem.width.baseVal.value, 510, 3);
      assert.closeTo(basicRadar.pxSvgElem.height.baseVal.value, 460, 3);
    });

    test('basicRadar canvasContext', function() {
      assert.closeTo(basicRadar.canvasContext._translation[0], 255, 3);
      assert.closeTo(basicRadar.canvasContext._translation[1], 230, 3);
      assert.closeTo(basicRadar.canvasContext.canvas.width, 509, 3);
      assert.closeTo(basicRadar.canvasContext.canvas.height, 460, 3);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar mutedSeriesBrush', function() {
      assert.deepEqual(basicRadar.mutedSeriesBrush, {});
    });

    test('basicRadar mutedSeriesDomain', function() {
      assert.deepEqual(basicRadar.mutedSeriesDomain, {});
    });

    test('basicRadar truncationLength', function() {
      assert.equal(basicRadar.truncationLength, 10);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 4);
    });

    test('basicRadar drawnTickValues', function() {
      assert.deepEqual(basicRadar.drawnTickValues, [20,40,60,1,75]);
    });

    test('basicRadar _tooltipConfig', function() {
      assert.deepEqual(basicRadar._tooltipSeriesConfig, {});
    });

  }); //suite

  suite('px-vis-radar with seriesConfig', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      var seriesConfig = {
          "x": {
            "color": "rgb(255,0,0)"
          },
          "y1": {
            "title": "2nd Title"
          },
          "y2": {
            "title": "Third Title",
            "yAxisUnit": "bofs"
          },
          "y3": {
            "title": "New Title",
            "yAxisUnit": "bofs"
          }
        };
        basicRadar = document.getElementById('basicRadar');
      basicRadar.set('seriesConfig',seriesConfig);

      setTimeout(function(){ done(); }, 500);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(255,0,0)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3']);

      assert.isObject(basicRadar.completeSeriesConfig.y1);
      assert.equal(basicRadar.completeSeriesConfig.y1.title, '2nd Title');

      assert.isObject(basicRadar.completeSeriesConfig.y2);
      assert.equal(basicRadar.completeSeriesConfig.y2.title, 'Third Title');
      assert.equal(basicRadar.completeSeriesConfig.y2.yAxisUnit, 'bofs');

      assert.isObject(basicRadar.completeSeriesConfig.y3);
      assert.equal(basicRadar.completeSeriesConfig.y3.title, 'New Title');
      assert.equal(basicRadar.completeSeriesConfig.y3.yAxisUnit, 'bofs');
    });

    test('basicRadar label margin', function() {
      assert.closeTo(basicRadar._internalLabelMargin, 116, 3);
    });

    test('basicRadar dislplayed Titles', function() {
      var t = basicRadar.$$('#multiAxis').displayedValues;

      assert.equal(t.y, 'y');
      assert.equal(t.y1, '2nd Title');
      assert.equal(t.y2, 'Third...Title [bofs]');
      assert.equal(t.y3, 'New Title [bofs]');
    });

  }); //suite


  suite('px-vis-radar muting an axis works', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      var muted = {
        'y': true
      };
      basicRadar = document.getElementById('basicRadar');
      delete basicRadar.seriesConfig.x;

      basicRadar.set('mutedAxes',muted);

      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y1','y2','y3']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y1','y2','y3']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y1','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 3);
    });

  }); //suite

  suite('px-vis-radar unmuting an axis works', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      var muted = {
        'y': false
      };
      basicRadar = document.getElementById('basicRadar');
      basicRadar.set('mutedAxes',muted);

      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 4);
    });

  }); //suite

  suite('px-vis-radar muting with addToMutedAxes works', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      basicRadar = document.getElementById('basicRadar');
      basicRadar.addToMutedAxes('y1');
      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y2','y3']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y2','y3']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 3);
    });

  }); //suite

  suite('px-vis-radar unmuting with removeFromMutedAxes works', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      basicRadar = document.getElementById('basicRadar');
      basicRadar.removeFromMutedAxes('y1');

      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 4);
    });

  }); //suite

  suite('px-vis-radar change domains', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      basicRadar = document.getElementById('basicRadar');
      basicRadar.set('chartExtents', {"y": [20,50]});

      setTimeout(function(){done()},250);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar drawnTickValues', function() {
      assert.deepEqual(basicRadar.drawnTickValues, [20, 30, 40, 50]);
    });

  }); //suite

  suite('px-vis-radar adding an axis', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            "y2": 1,
            'y3': 5,
            'y4': 35
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            "y2": 21,
            'y3': 10,
            'y4': 35
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            "y2": 3,
            'y3': 15,
            'y4': 35
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            "y2": 10,
            'y3': 55,
            'y4': 35
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            "y2": 27,
            'y3': 75,
            'y4': 35
          }
        ],
        dim = ['y','y1','y2','y3','y4'];
        basicRadar = document.getElementById('basicRadar');
      basicRadar.set('axes',dim);
      basicRadar.set('chartData',d);

      setTimeout(function(){done()},500);
      // done();
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3','y4']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3','y4']);
    });


    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3','y4']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 5);
    });

    test('basicRadar drawnTickValues', function() {
      assert.deepEqual(basicRadar.drawnTickValues, [20, 30, 40, 50]);
    });
  }); //suite

  suite('px-vis-radar muting with addToMutedAxes works  with an array', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      basicRadar = document.getElementById('basicRadar');
      basicRadar.addToMutedAxes(['y1','y3']);
      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y2','y4']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y2','y4']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y2','y4']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y2','y4']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 3);
    });

  }); //suite

  suite('px-vis-radar unmuting with removeFromMutedAxes works with an array', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      basicRadar = document.getElementById('basicRadar');
      basicRadar.removeFromMutedAxes(['y1','y3']);

      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3','y4']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3','y4']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 5);
    });

  }); //suite

  suite('px-vis-radar delete an axis', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            'y3': 5,
            'y4': 35
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            'y3': 10,
            'y4': 35
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            'y3': 15,
            'y4': 35
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            'y3': 55,
            'y4': 35
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            'y3': 75,
            'y4': 35
          }
        ],
        dim = ['y','y1','y3','y4'];

      var rendered = function() {
        basicRadar.removeEventListener('px-vis-chart-canvas-rendering-ended', rendered);
        done();
      };
      basicRadar = document.getElementById('basicRadar');
      basicRadar.addEventListener('px-vis-chart-canvas-rendering-ended', rendered);

      basicRadar.set('axes',dim);
      basicRadar.set('chartData',d);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y3','y4']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y3','y4']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y3','y4']);
    });


    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y3','y4']);
    });

    test('basicRadar y', function() {
      assert.closeTo(basicRadar.y.range()[0], 61.5, 3);
      assert.closeTo(basicRadar.y.range()[1], 205, 3);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(basicRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 4);
    });

    test('basicRadar drawnTickValues', function() {
      assert.deepEqual(basicRadar.drawnTickValues, [20, 30, 40, 50]);
    });
  }); //suite


  // ###########################################################################################


  suite('px-vis-radar generateAxesFromData works', function() {
    var fromDataRadar = document.getElementById('fromDataRadar');


    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            "y2": 1,
            'y3': 5
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            "y2": 21,
            'y3': 10
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            "y2": 3,
            'y3': 15
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            "y2": 10,
            'y3': 55
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            "y2": 27,
            'y3': 75
          }
        ],
        seriesConfig = {
          "y1": {
            "title": "2nd Title"
          },
          "y2": {
            "title": "Third Title",
            "yAxisUnit": "bofs"
          },
          "y3": {
            "title": "New Title",
            "yAxisUnit": "bofs"
          }
        },
        w = 500,
        h = 460;

      var rendered = function() {
        fromDataRadar.removeEventListener('px-vis-chart-canvas-rendering-ended', rendered);
        setTimeout(function() { done(); }, 2000);

      };
      fromDataRadar = document.getElementById('fromDataRadar');
      fromDataRadar.addEventListener('px-vis-chart-canvas-rendering-ended', rendered);

      fromDataRadar.set('width',w);
      fromDataRadar.set('height',h);
      fromDataRadar.set('seriesKey',"x");
      fromDataRadar.set('chartData',d);
    });

    test('fromDataRadar fixture is created', function() {
      assert.isTrue(fromDataRadar !== null);
    });

    test('fromDataRadar _extendedCenter', function() {
      assert.closeTo(fromDataRadar._extendedCenter[0], 255, 3);
      assert.closeTo(fromDataRadar._extendedCenter[1], 230, 3);
    });

    test('fromDataRadar centerOffset', function() {
      assert.closeTo(fromDataRadar.centerOffset, 61.5, 3);
    });

    test('fromDataRadar ticks', function() {
      assert.equal(fromDataRadar.ticks, 4);
    });

    test('fromDataRadar completeSeriesConfig', function() {
      assert.isObject(fromDataRadar.completeSeriesConfig.x);
      assert.equal(fromDataRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(fromDataRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(fromDataRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3']);
      assert.deepEqual(fromDataRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3']);
    });

    test('fromDataRadar dimensions', function() {
      assert.deepEqual(fromDataRadar.dimensions, ['y','y1','y2','y3']);
    });

    test('fromDataRadar svg', function() {
      var re = /translate\((\d+\.?\d*)\s?,?(\d+\.?\d*)\)/,
          translate = re.exec(fromDataRadar.svg.attr('transform'));

      assert.equal(fromDataRadar.svg.node().tagName, 'g');
      assert.closeTo(Number(translate[1]), 255, 3);
      assert.closeTo(Number(translate[2]), 230, 3);
    });

    test('fromDataRadar pxSvgElem', function() {
      assert.equal(fromDataRadar.pxSvgElem.tagName, 'svg');
      assert.closeTo(fromDataRadar.pxSvgElem.width.baseVal.value, 510, 3);
      assert.closeTo(fromDataRadar.pxSvgElem.height.baseVal.value, 460, 3);
    });

    test('fromDataRadar canvasContext', function() {
      assert.closeTo(fromDataRadar.canvasContext._translation[0], 255, 3);
      assert.closeTo(fromDataRadar.canvasContext._translation[1], 230, 3);
      assert.closeTo(fromDataRadar.canvasContext.canvas.width, 509, 3);
      assert.closeTo(fromDataRadar.canvasContext.canvas.height, 460, 3);
    });

    test('fromDataRadar x', function() {
      assert.deepEqual(fromDataRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(fromDataRadar.x.domain(), ['y','y1','y2','y3']);
    });

    test('fromDataRadar y', function() {
      assert.closeTo(fromDataRadar.y.range()[0], 61.5, 3);
      assert.closeTo(fromDataRadar.y.range()[1], 205, 3);
      assert.deepEqual(fromDataRadar.y.domain(), [1,75]);
    });

    test('fromDataRadar mutedSeriesBrush', function() {
      assert.deepEqual(fromDataRadar.mutedSeriesBrush, {});
    });

    test('fromDataRadar mutedSeriesDomain', function() {
      assert.deepEqual(fromDataRadar.mutedSeriesDomain, {});
    });

    test('fromDataRadar truncationLength', function() {
      assert.equal(fromDataRadar.truncationLength, 10);
    });

    test('fromDataRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(fromDataRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 4);
    });

    test('fromDataRadar drawnTickValues', function() {
      assert.deepEqual(fromDataRadar.drawnTickValues, [20,40,60,1,75]);
    });

    test('fromDataRadar _tooltipConfig', function() {
      assert.deepEqual(fromDataRadar._tooltipSeriesConfig, {});
    });

  }); //suite

  suite('px-vis-radar adding to data', function() {
    var fromDataRadar = document.getElementById('fromDataRadar');

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            "y2": 1,
            'y3': 5,
            'y4': 35
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            "y2": 21,
            'y3': 10,
            'y4': 35
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            "y2": 3,
            'y3': 15,
            'y4': 35
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            "y2": 10,
            'y3': 55,
            'y4': 35
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            "y2": 27,
            'y3': 75,
            'y4': 35
          }
        ],
        dim = ['y','y1','y2','y3','y4'];
      fromDataRadar = document.getElementById('fromDataRadar');
      fromDataRadar.set('chartData',d);

      setTimeout(function(){done()}, 1000);
      // done();
    });

    test('fromDataRadar completeSeriesConfig', function() {
      assert.isObject(fromDataRadar.completeSeriesConfig.x);
      assert.equal(fromDataRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(fromDataRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(fromDataRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3','y4']);
      assert.deepEqual(fromDataRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3','y4']);
    });

    test('fromDataRadar dimensions', function() {
      assert.deepEqual(fromDataRadar.dimensions, ['y','y1','y2','y3','y4']);
    });


    test('fromDataRadar x', function() {
      assert.deepEqual(fromDataRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(fromDataRadar.x.domain(), ['y','y1','y2','y3','y4']);
    });

    test('fromDataRadar y', function() {
      assert.closeTo(fromDataRadar.y.range()[0], 61.5, 3);
      assert.closeTo(fromDataRadar.y.range()[1], 205, 3);
      assert.deepEqual(fromDataRadar.y.domain(), [1,75]);
    });

    test('fromDataRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(fromDataRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 5);
    });

    test('fromDataRadar drawnTickValues', function() {
      assert.deepEqual(fromDataRadar.drawnTickValues, [20,40,60,1,75]);
    });
  }); //suite

  suite('px-vis-radar delete data ', function() {
    var fromDataRadar = document.getElementById('fromDataRadar');

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            'y4': 35
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            'y4': 35
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            'y4': 35
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            'y4': 35
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            'y4': 35
          }
        ];
        fromDataRadar = document.getElementById('fromDataRadar');
      fromDataRadar.set('chartData',d);

      setTimeout(function() { done(); }, 1000);
      // done();
    });

    test('fromDataRadar completeSeriesConfig', function() {
      assert.isObject(fromDataRadar.completeSeriesConfig.x);
      assert.equal(fromDataRadar.completeSeriesConfig.x.color.replace(' ',''), 'rgb(90,191,248)');
      assert.equal(fromDataRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(fromDataRadar.completeSeriesConfig.x.x, ['y','y1','y4']);
      assert.deepEqual(fromDataRadar.completeSeriesConfig.x.y, ['y','y1','y4']);
    });

    test('fromDataRadar dimensions', function() {
      assert.deepEqual(fromDataRadar.dimensions, ['y','y1','y4']);
    });


    test('fromDataRadar x', function() {
      assert.deepEqual(fromDataRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(fromDataRadar.x.domain(), ['y','y1','y4']);
    });

    test('fromDataRadar y', function() {
      assert.closeTo(fromDataRadar.y.range()[0], 61.5, 3);
      assert.closeTo(fromDataRadar.y.range()[1], 205, 3);
      assert.deepEqual(fromDataRadar.y.domain(), [1,35]);
    });

    test('fromDataRadar axisGroups', function() {
      var ia = Polymer.dom(Polymer.dom(fromDataRadar.root).querySelector('px-vis-multi-axis').root).querySelectorAll('px-vis-interactive-axis');
      assert.equal(ia.length, 3);
    });

    test('fromDataRadar drawnTickValues', function() {
      assert.deepEqual(fromDataRadar.drawnTickValues, [ 10, 20, 30, 1, 35]);
    });
  }); //suite

}
