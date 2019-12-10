declare namespace XR8.AFrame {
  /**
   * Creates an A-Frame component which can be registered with AFRAME.registerComponent(). This, however, generally won't need to be called directly. On 8th Wall Web script load, this component will be registered automatically if it is detected that A-Frame has loaded (i.e if window.AFRAME exists).
   */
  function xrwebComponent(): any;
}
