/**
 * XrController provides 6DoF camera tracking and interfaces for configuring tracking.
 *
 * @see https://www.8thwall.com/docs/web/#xr8xrcontroller
 */
declare namespace XR8.XrController {
  type Vec3 = {
    x: number;
    y: number;
    z: number;
  };

  type Vec4 = Vec3 & { w: number };

  type HitTestType =
    | "FEATURE_POINT"
    | "ESTIMATED_SURFACE"
    | "DETECTED_SURFACE"
    | "UNSPECIFIED";

  type Estimated3DPosition = {
    type: HitTestType;
    /** The estimated 3D position of the queried point on the camera feed. */
    position: Vec3;
    /** The estimated 3D rotation of the queried point on the camera feed. */
    rotation: Vec4;
    /** The estimated distance from the device of the queried point on the camera feed. */
    distance: number;
  };

  type ConfigureParameters = {
    /** If `true`, lighting will be provided by `XrController.pipelineModule()` as `processCpuResult.reality.lighting` */
    enableLighting?: boolean;
    /** If `true`, worldPoints will be provided by `XrController.pipelineModule()` as `processCpuResult.reality.worldPoints`. */
    enableWorldPoints?: boolean;
    /** If `true`, turn off SLAM tracking for efficiency. This needs to be done BEFORE `XR8.Run()` is called. */
    disableWorldTracking?: boolean;
    /**
     * List of names of the image target to detect. Can be modified at runtime.
     *
     * **Note**: All currently active image targets will be replaced with the ones specified in this list.
     */
    imageTargets?: string[];
  };

  type Camera = {
    /** The width of the canvas that displays the camera feed. */
    pixelRectWidth: number;
    /** The height of the canvas that displays the camera feed. */
    pixelRectHeight: number;
    /** The closest distance to the camera at which scene objects are visible. */
    nearClipPlane: number;
    /** The farthest distance to the camera at which scene objects are visible. */
    farClipPlane: number;
  };

  type CameraProjectionMatrix = {
    cam?: Camera;
    /** The starting position of the camera in the scene. */
    origin?: Vec3;
    /** The starting direction (quaternion) of the camera in the scene. */
    facing?: Vec4;
  };

  /**
   * Configures what processing is performed by `XrController` (may have performance implications).
   *
   * **IMPORTANT**: `disableWorldTracking`: true needs to be set BEFORE both `XR8.XrController.pipelineModule()` and `XR8.Run()` are called.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrcontrollerconfigure
   */
  function configure(params: ConfigureParameters): void;

  /**
   * Estimate the 3D position of a point on the camera feed. `X` and `Y` are specified as numbers between `0` and `1`, where `(0, 0)` is the upper left corner and `(1, 1)` is the lower right corner of the camera feed as rendered in the camera that was specified by `updateCameraProjectionMatrix`. Mutltiple 3d position esitmates may be returned for a single hit test based on the source of data being used to estimate the position. The data source that was used to estimate the position is indicated by the `hitTest.type`.
   *
   * @param x Value between `0` and `1` that represents the horizontal position on camera feed from left to right.
   * @param y Value between `0` and `1` that represents the vertical position on camera feed from top to bottom.
   * @param includedTypes	List of one or more of `HitTestType`.
   *
   *    **Note**: Currently only `FEATURE_POINT` is supported.
   * @see https://www.8thwall.com/docs/web/#xr8xrcontrollerhittest
   */
  function hitTest(
    x: number,
    y: number,
    includedTypes: HitTestType[]
  ): Estimated3DPosition[];

  /**
   * Creates a camera pipeline module that, when installed, receives callbacks on when the camera has started, camera proessing events, and other state changes. These are used to calculate the camera's position.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrcontrollerpipelinemodule
   * @todo wtf is that return?
   */
  function pipelineModule(): any;

  /**
   * Repositions the camera to the origin/facing direction specified by `updateCameraProjectionMatrix` and restart tracking.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrcontrollerrecenter
   */
  function recenter(): void;

  /**
   * Reset the scene's display geometry and the camera's starting position in the scene. The display geometry is needed to properly overlay the position of objects in the virtual scene on top of their corresponding position in the camera image. The starting position specifies where the camera will be placed and facing at the start of a session.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrcontrollerupdatecameraprojectionmatrix
   */
  function updateCameraProjectionMatrix(): void;
}
