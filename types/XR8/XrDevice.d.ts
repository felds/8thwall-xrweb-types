/**
 * Provides information about device compatibility and characteristics.
 */
declare namespace XR8.XrDevice {
  /**
   * The possible reasons for why a device and browser may not be compatible with 8th Wall Web.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrdeviceincompatibilityreasons
   */
  enum IncompatibilityReasons {
    /** The incompatible reason is not specified. */
    UNSPECIFIED = 0,
    /** The estimated operating system is not supported. */
    UNSUPPORTED_OS = 1,
    /** The estimated browser is not supported. */
    UNSUPPORTED_BROWSER = 2,
    /** The browser does not support device orientation events. */
    MISSING_DEVICE_ORIENTATION = 3,
    /** The browser does not support user media acccess. */
    MISSING_USER_MEDIA = 4,
    /** The browser does not support web assembly. */
    MISSING_WEB_ASSEMBLY = 5
  }

  type Device = {
    /** The user's locale. */
    locale: string;
    /** The device's operating system. */
    os: string;
    /** The device's operating system version. */
    osVersion: string;
    /** The device's manufacturer. */
    manufacturer: string;
    /** The device's model. */
    model: string;
  };

  type IncompatibleReasonDetails = {
    /** The name of the in-app browser detected (e.g. `"Twitter"`) */
    inAppBrowser: string;
    /** A string that helps describe how to handle the in-app browser. */
    inAppBrowserType: string;
  };

  /**
   * Returns an estimate of the user's device (e.g. make / model) based on user agent string and other factors. This information is only an estimate, and should not be assumed to be complete or reliable.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrdevicedeviceestimate
   */
  function deviceEstimate(): Device;

  /**
   * Returns an array of `XR8.XrDevice.IncompatibilityReasons` why the device the device and browser are not supported. This will only contain entries if `XR8.XrDevice.isDeviceBrowserCompatible()` returns `false`.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrdeviceincompatiblereasons
   */
  function incompatibleReasons(): IncompatibilityReasons[];

  /**
   * Returns extra details about the reasons why the device and browser are incompatible. This information should only be used as a hint to help with further error handling. These should not be assumed to be complete or reliable. This will only contain entries if `XrDevice.isDeviceBrowserCompatible()` returns `false`.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrdeviceincompatiblereasondetails
   */
  function incompatibleReasonDetails(): IncompatibilityReasons;

  /**
   * Returns an estimate of whether the user's device and browser is compatible with 8th Wall Web. If this returns `false`, `XrDevice.incompatibleReasons()` will return reasons about why the device and browser are not supported.
   *
   * @see https://www.8thwall.com/docs/web/#xr8xrdeviceisdevicebrowsercompatible
   */
  function isDeviceBrowserCompatible(): boolean;
}
