import React, { PureComponent, RefObject } from "react";
import { bind, clear } from "size-sensor";
import debounce from "lodash-es/debounce";
import { pick } from "./helper/pick";
import { isFunction } from "./helper/is-function";
import { isString } from "./helper/is-string";
import { isEqual } from "./helper/is-equal";
import { EChartsReactProps, EChartsInstance } from "./types";

/**
 * core component for echarts binding
 */
export default class EChartsReactCore extends PureComponent<EChartsReactProps> {
  protected echarts: any;
  private readonly ele: React.RefObject<HTMLDivElement>;

  constructor(props: EChartsReactProps) {
    super(props);

    this.echarts = props.echarts;
    this.ele = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    this.renderNewEcharts();
  }

  // update
  componentDidUpdate(prevProps: EChartsReactProps) {
    /**
     * if shouldSetOption return false, then return, not update echarts options
     * default is true
     */
    const { shouldSetOption } = this.props;
    if (shouldSetOption && isFunction(shouldSetOption) && !shouldSetOption(prevProps, this.props)) {
      return;
    }

    // 以下属性修改的时候，需要 dispose 之后再新建
    // 1. 切换 theme 的时候
    // 2. 修改 opts 的时候
    // 3. 修改 onEvents 的时候，这样可以取消所有之前绑定的事件 issue #151
    if (
      !isEqual(prevProps.theme, this.props.theme) ||
      !isEqual(prevProps.opts, this.props.opts) ||
      !isEqual(prevProps.onEvents, this.props.onEvents)
    ) {
      this.dispose();

      this.renderNewEcharts(); // 重建
      return;
    }

    // when thoes props isEqual, do not update echarts
    const pickKeys = ["option", "notMerge", "lazyUpdate", "showLoading", "loadingOption"];
    if (isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
      return;
    }

    const echartsInstance = this.updateEChartsOption();
    /**
     * when style or class name updated, change size.
     */
    if (!isEqual(prevProps.style, this.props.style) || !isEqual(prevProps.className, this.props.className)) {
      try {
        echartsInstance.resize();
      } catch (e) {
        console.warn(e);
      }
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  /**
   * return the echart object
   * 1. if exist, return the existed instance
   * 2. or new one instance
   */
  public getEchartsInstance() {
    return (
      this.echarts.getInstanceByDom(this.ele.current) ||
      this.echarts.init(this.ele.current, this.props.theme, this.props.opts)
    );
  }

  /**
   * dispose echarts and clear size-sensor
   */
  private dispose() {
    if (this.ele) {
      try {
        // @ts-ignore
        clear(this.ele.current);
      } catch (e) {
        console.warn(e);
      }
      // dispose echarts instance
      this.echarts.dispose(this.ele);
    }
  }

  /**
   * render a new echarts instance
   */
  private renderNewEcharts() {
    const { onEvents, onChartReady } = this.props;

    // 1. new echarts instance
    const echartsInstance = this.updateEChartsOption();

    // 2. bind events
    this.bindEvents(echartsInstance, onEvents || {});

    // 3. on chart ready
    if (onChartReady && isFunction(onChartReady)) onChartReady(echartsInstance);

    // 4. on resize
    if (this.ele.current) {
      // @ts-ignore
      bind(this.ele.current, () => {
        try {
          echartsInstance.resize();
        } catch (e) {
          console.warn(e);
        }
      });
    }

    const debounceResize = debounce(() => {
      try {
        echartsInstance.resize();
      } catch (e) {
        console.warn(e);
      }
    }, 300);
    window.addEventListener("resize", debounceResize);
  }

  // bind the events
  private bindEvents(instance: any, events: EChartsReactProps["onEvents"]) {
    function _bindEvent(eventName: string, func: Function) {
      // ignore the event config which not satisfy
      if (isString(eventName) && isFunction(func)) {
        // binding event
        instance.on(eventName, (param: any) => {
          func(param, instance);
        });
      }
    }

    // loop and bind
    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  }

  /**
   * render the echarts
   */
  private updateEChartsOption(): EChartsInstance {
    const { option, notMerge = false, lazyUpdate = false, showLoading, loadingOption = null } = this.props;
    // 1. get or initial the echarts object
    const echartsInstance = this.getEchartsInstance();
    // 2. set the echarts option
    echartsInstance.setOption(option, notMerge, lazyUpdate);
    // 3. set loading mask
    if (showLoading) echartsInstance.showLoading(loadingOption);
    else echartsInstance.hideLoading();

    return echartsInstance;
  }

  render(): JSX.Element {
    const { style, className = "" } = this.props;
    // default height = 300
    const newStyle = { height: 300, ...style };

    return <div ref={this.ele} style={newStyle} className={`echarts-for-react ${className}`} />;
  }
}
