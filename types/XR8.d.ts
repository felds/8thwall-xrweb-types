declare namespace XR8 {
  type Module = {
    name: string;
    [key: string]: any;
  };
  type ModuleOrName =
    | string
    | {
        name: string;
        [key: string]: any;
      };

  /**
   * Applications install modules which then control the behavior of the application at runtime. A module object must have a `.name` string which is unique within the application, and then should provide one or more of the camera lifecycle methods which will be executed at the appropriate point in the run loop.
   */
  type CameraPipelineModule = {
    /**
     * A string which is unique within the application.
     */
    name: string;

    /**
     * Called when we have received the resources attached to an app from the server.
     */
    onAppResourcesLoaded?: () => void;

    /**
     * Called before the first time a module receives frame updates. It is called on modules that were added either before or after the pipeline is running.
     */
    onAttach?: () => void;

    /**
     * Called immediately after `XR8.run()`. If any promises are returned, XR will wait on all promises before continuing.
     */
    onBeforeRun?: () => void;

    /**
     * Called when a change occurs during the camera permissions request.
     */
    onCameraStatusChange?: () => void;

    /**
     * Called when the canvas changes size.
     */
    onCanvasSizeChange?: () => void;

    /**
     * Called after the last time a module receives frame updates. This is either after stop is called, or after the module is manually removed from the pipeline.
     */
    onDetach?: () => void;

    /**
     * Called when the device changes landscape/portrait orientation.
     */
    onDeviceOrientationChange?: () => void;

    /**
     * Called when an error occurs in XR. Called with the error object.
     */
    onException?: () => void;

    /**
     * Called when `XR8.pause()` is called.
     */
    onPaused?: () => void;

    /**
     * Called to read results of GPU processing and return usable data.
     */
    onProcessCpu?: () => void;

    /**
     * Called to start GPU processing.
     */
    onProcessGpu?: () => void;

    /**
     * Called after onUpdate. This is the time for the rendering engine to issue any WebGL drawing commands. If an application is providing its own run loop and is relying on `XR8.runPreRender()` and `XR8.runPostRender()`, this method is not called and all rendering must be coordinated by the external run loop.
     */
    onRender?: () => void;

    /**
     * Called when `XR8.resume()` is called.
     */
    onResume?: () => void;

    /**
     * Called when XR starts. First callback after `XR8.run()` is called.
     */
    onStart?: () => void;

    /**
     * Called to update the scene before render. Data returned by modules in `onProcessGpu` and `onProcessCpu` will be present as `processGpu.modulename` and `processCpu.modulename` where the name is given by `module.name = "modulename"`.
     */
    onUpdate?: () => void;

    /**
     * Called when the canvas changes size.
     */
    onVideoSizeChange?: () => void;
  };

  /**
   * Adds a module to the camera pipeline that will receive event callbacks for each stage in the camera pipeline.
   */
  function addCameraPipelineModule(module: CameraPipelineModule): void;

  /**
   * Add multiple camera pipeline modules. This is a convenience method that calls `addCameraPipelineModule` in order on each element of the input array.
   */
  function addCameraPipelineModules(modules: CameraPipelineModule[]): void;

  /**
   * Remove all camera pipeline modules from the camera loop.
   */
  function clearCameraPipelineModules(): void;

  /**
   * Indicates whether or not the XR session is paused.
   */
  function isPaused(): boolean;

  /**
   * Pause the current XR session. While paused, the camera feed is stopped and device motion is not tracked.
   *
   * @see https://www.8thwall.com/docs/web/#xr8pause
   */
  function pause(): void;

  /**
   * Resume the current XR session.
   */
  function resume(): void;

  /**
   * Removes a module from the camera pipeline.
   *
   * @param moduleName The name of a module.
   */
  function removeCameraPipelineModule(moduleName: string): void;

  /**
   * Removes a module from the camera pipeline.
   *
   * @param moduleName An object with a `.name` property.
   */
  function removeCameraPipelineModule(moduleName: Module): void;

  /**
   * Remove multiple camera pipeline modules.
   *
   * This is a convenience method that calls `removeCameraPipelineModule` in order on each element of the input array.
   *
   * @param moduleNames An array of objects with a name property, or a name strings of modules.
   */
  function removeCameraPipelineModules(moduleNames: ModuleOrName[]): void;

  /**
   * Open the camera and start running the camera run loop.
   *
   * @param canvas	The HTML Canvas that the camera feed will be drawn to.
   * @param webgl2 If true, use WebGL2 if available, otherwise fallback to WebGL1. If false, always use WebGL1.
   * @param ownRunLoop If true, XR should use it's own run loop. If false, you will provide your own run loop and be responsible for calling runPreRender and runPostRender yourself [Advanced Users only]
   * @param cameraConfig Desired camera to use. Supported values for direction are `XR8.XrConfig.camera().BACK` or `XR8.XrConfig.camera().FRONT`
   *
   * @todo Find out the cameraConfig type
   */
  function run(
    canvas: HTMLCanvasElement,
    webgl2?: boolean,
    ownRunLoop?: boolean,
    cameraConfig?: unknown
  ): void;

  /**
   * Executes all lifecycle updates that should happen before rendering.
   *
   * @param timestamp	The current time, in milliseconds.
   */
  function runPreRender(timestamp: number): void;

  /**
   * Executes all lifecycle updates that should happen after rendering.
   */
  function runPostRender(): void;

  /**
   * @Stop the current XR session. While stopped, the camera feed is closed and device motion is not tracked.
   *
   * While stopped, the camera feed is closed and device motion is not tracked. Must call `XR8.run()` to restart after the engine is stopped.
   */
  function stop(): void;

  /**
   * Get the 8th Wall Web engine version.
   */
  function version(): string;
}
