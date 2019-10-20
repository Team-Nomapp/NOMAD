"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HeadTable;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var _BaseTable = _interopRequireDefault(require("./BaseTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function HeadTable(props, _ref) {
  var table = _ref.table;
  var _table$props = table.props,
      prefixCls = _table$props.prefixCls,
      scroll = _table$props.scroll,
      showHeader = _table$props.showHeader;
  var columns = props.columns,
      fixed = props.fixed,
      tableClassName = props.tableClassName,
      handleBodyScrollLeft = props.handleBodyScrollLeft,
      expander = props.expander;
  var saveRef = table.saveRef;
  var useFixedHeader = table.props.useFixedHeader;
  var headStyle = {};
  var scrollbarWidth = (0, _utils.measureScrollbar)({
    direction: 'vertical'
  });

  if (scroll.y) {
    useFixedHeader = true; // https://github.com/ant-design/ant-design/issues/17051

    var scrollbarWidthOfHeader = (0, _utils.measureScrollbar)({
      direction: 'horizontal',
      prefixCls: prefixCls
    }); // Add negative margin bottom for scroll bar overflow bug

    if (scrollbarWidthOfHeader > 0 && !fixed) {
      headStyle.marginBottom = "-".concat(scrollbarWidthOfHeader, "px");
      headStyle.paddingBottom = '0px'; // https://github.com/ant-design/ant-design/issues/17051

      headStyle.overflowX = 'scroll';
      headStyle.overflowY = scrollbarWidth === 0 ? 'hidden' : 'scroll';
    }
  }

  if (!useFixedHeader || !showHeader) {
    return null;
  }

  return _react.default.createElement("div", {
    key: "headTable",
    ref: fixed ? null : saveRef('headTable'),
    className: (0, _classnames.default)("".concat(prefixCls, "-header"), _defineProperty({}, "".concat(prefixCls, "-hide-scrollbar"), scrollbarWidth > 0)),
    style: headStyle,
    onScroll: handleBodyScrollLeft
  }, _react.default.createElement(_BaseTable.default, {
    tableClassName: tableClassName,
    hasHead: true,
    hasBody: false,
    fixed: fixed,
    columns: columns,
    expander: expander
  }));
}

HeadTable.contextTypes = {
  table: _propTypes.default.any
};