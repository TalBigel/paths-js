// Generated by uRequire v{NO_VERSION} - template: 'nodejs' 
(function (window, global) {
  
var __isAMD = !!(typeof define === 'function' && define.amd),
    __isNode = (typeof exports === 'object'),
    __isWeb = !__isNode;
;

module.exports = (function () {
  var Path;
  Path = function (init) {
    var instructions, plus, point, printInstrunction, push;
    instructions = init || [];
    push = function (arr, el) {
      var copy;
      copy = arr.slice(0, arr.length);
      copy.push(el);
      return copy;
    };
    printInstrunction = function (_arg) {
      var command, params;
      command = _arg.command, params = _arg.params;
      return "" + command + " " + params.join(" ");
    };
    point = function (_arg) {
      var command, params;
      command = _arg.command, params = _arg.params;
      switch (command) {
      case "M":
        return [
          params[0],
          params[1]
        ];
      case "L":
        return [
          params[0],
          params[1]
        ];
      case "Z":
        return null;
      case "S":
        return [
          params[2],
          params[3]
        ];
      case "Q":
        return [
          params[0],
          params[1]
        ];
      case "A":
        return [
          params[5],
          params[6]
        ];
      }
    };
    plus = function (instruction) {
      return Path(push(instructions, instruction));
    };
    return {
      moveto: function (x, y) {
        return plus({
          command: "M",
          params: [
            x,
            y
          ]
        });
      },
      lineto: function (x, y) {
        return plus({
          command: "L",
          params: [
            x,
            y
          ]
        });
      },
      closepath: function () {
        return plus({
          command: "Z",
          params: []
        });
      },
      curveto: function (x2, y2, x, y) {
        return plus({
          command: "S",
          params: [
            x2,
            y2,
            x,
            y
          ]
        });
      },
      qcurveto: function (x, y) {
        return plus({
          command: "Q",
          params: [
            x,
            y
          ]
        });
      },
      arc: function (rx, ry, xrot, large_arc_flag, sweep_flag, x, y) {
        return plus({
          command: "A",
          params: [
            rx,
            ry,
            xrot,
            large_arc_flag,
            sweep_flag,
            x,
            y
          ]
        });
      },
      print: function () {
        return instructions.map(printInstrunction).join(" ");
      },
      points: function () {
        var instruction, ps, _fn, _i, _len;
        ps = [];
        _fn = function () {
          var p;
          p = point(instruction);
          if (p) {
            return ps.push(p);
          }
        };
        for (_i = 0, _len = instructions.length; _i < _len; _i++) {
          instruction = instructions[_i];
          _fn();
        }
        return ps;
      }
    };
  };
  return function () {
    return Path();
  };
}).call(this);


}).call(this, (typeof exports === 'object' ? global : window), (typeof exports === 'object' ? global : window))