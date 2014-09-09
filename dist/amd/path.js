(function() {
  define([], function() {
    var Path;
    Path = function(init) {
      var areEqualPoints, instructions, plus, point, printInstrunction, push, verbosify;
      instructions = init || [];
      push = function(arr, el) {
        var copy;
        copy = arr.slice(0, arr.length);
        copy.push(el);
        return copy;
      };
      areEqualPoints = function(p1, p2) {
        return p1[0] === p2[0] && p1[1] === p2[1];
      };
      printInstrunction = function(_arg) {
        var command, params;
        command = _arg.command, params = _arg.params;
        return "" + command + " " + (params.join(' '));
      };
      point = function(_arg, _arg1) {
        var command, params, prev_x, prev_y;
        command = _arg.command, params = _arg.params;
        prev_x = _arg1[0], prev_y = _arg1[1];
        switch (command) {
          case 'M':
            return [params[0], params[1]];
          case 'L':
            return [params[0], params[1]];
          case 'H':
            return [params[0], prev_y];
          case 'V':
            return [prev_x, params[0]];
          case 'Z':
            return null;
          case 'C':
            return [params[4], params[5]];
          case 'S':
            return [params[2], params[3]];
          case 'Q':
            return [params[2], params[3]];
          case 'T':
            return [params[0], params[1]];
          case 'A':
            return [params[5], params[6]];
        }
      };
      verbosify = function(keys, f) {
        return function(a) {
          var args;
          args = typeof a === 'object' ? keys.map(function(k) {
            return a[k];
          }) : arguments;
          return f.apply(null, args);
        };
      };
      plus = function(instruction) {
        return Path(push(instructions, instruction));
      };
      return {
        moveto: verbosify(['x', 'y'], function(x, y) {
          return plus({
            command: 'M',
            params: [x, y]
          });
        }),
        lineto: verbosify(['x', 'y'], function(x, y) {
          return plus({
            command: 'L',
            params: [x, y]
          });
        }),
        hlineto: verbosify(['x'], function(x) {
          return plus({
            command: 'H',
            params: [x]
          });
        }),
        vlineto: verbosify(['y'], function(y) {
          return plus({
            command: 'V',
            params: [y]
          });
        }),
        closepath: function() {
          return plus({
            command: 'Z',
            params: []
          });
        },
        curveto: verbosify(['x1', 'y1', 'x2', 'y2', 'x', 'y'], function(x1, y1, x2, y2, x, y) {
          return plus({
            command: 'C',
            params: [x1, y1, x2, y2, x, y]
          });
        }),
        smoothcurveto: verbosify(['x2', 'y2', 'x', 'y'], function(x2, y2, x, y) {
          return plus({
            command: 'S',
            params: [x2, y2, x, y]
          });
        }),
        qcurveto: verbosify(['x1', 'y1', 'x', 'y'], function(x1, y1, x, y) {
          return plus({
            command: 'Q',
            params: [x1, y1, x, y]
          });
        }),
        smoothqcurveto: verbosify(['x', 'y'], function(x, y) {
          return plus({
            command: 'T',
            params: [x, y]
          });
        }),
        arc: verbosify(['rx', 'ry', 'xrot', 'large_arc_flag', 'sweep_flag', 'x', 'y'], function(rx, ry, xrot, large_arc_flag, sweep_flag, x, y) {
          return plus({
            command: 'A',
            params: [rx, ry, xrot, large_arc_flag, sweep_flag, x, y]
          });
        }),
        print: function() {
          return instructions.map(printInstrunction).join(' ');
        },
        points: function() {
          var instruction, prev, ps, _fn, _i, _len;
          ps = [];
          prev = [0, 0];
          _fn = function() {
            var p;
            p = point(instruction, prev);
            prev = p;
            if (p) {
              return ps.push(p);
            }
          };
          for (_i = 0, _len = instructions.length; _i < _len; _i++) {
            instruction = instructions[_i];
            _fn();
          }
          return ps;
        },
        instructions: function() {
          return instructions.slice(0, instructions.length);
        },
        connect: function(path) {
          var first, last, newInstructions;
          last = this.points().slice(-1)[0];
          first = path.points()[0];
          newInstructions = path.instructions().slice(1);
          if (!areEqualPoints(last, first)) {
            newInstructions.unshift({
              command: "L",
              params: first
            });
          }
          return Path(this.instructions().concat(newInstructions));
        }
      };
    };
    return function() {
      return Path();
    };
  });

}).call(this);
