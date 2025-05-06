/**
 * @file Defines JavaScript classes corresponding to the Rust device properties structs.
 * This code requires a Protocol Buffer library (like protobufjs) and the generated
 * code for DeviceConfigurationProto and AndroidCheckinProto based on your .proto files.
 */

// Assuming you have generated Protocol Buffer classes from your .proto files.
// Replace these imports with the actual paths to your generated files.
// Example using protobufjs static code generation:
// const { DeviceConfigurationProto } = require('./generated_protos/device_configuration_pb');
// const { AndroidCheckinProto } = require('./generated_protos/android_checkin_pb');

// Placeholder types for demonstration. You would use the actual generated classes.
/**
 * @typedef {object} DeviceConfigurationProto - Represents the decoded device configuration.
 * // Add actual properties based on your .proto definition.
 * // Example: { property1: string, property2: number }
 */
let DeviceConfigurationProto; // Will be assigned the actual generated class

/**
 * @typedef {object} AndroidCheckinProto - Represents the decoded Android check-in data.
 * // Add actual properties based on your .proto definition.
 * // Example: { checkinTime: number, deviceId: string }
 */
let AndroidCheckinProto; // Will be assigned the actual generated class

// --- EncodedDeviceProperties Class ---
/**
 * Corresponds to the Rust `EncodedDeviceProperties` struct.
 * Holds the raw, encoded byte data and extra info.
 */
class EncodedDeviceProperties {
  /**
   * @param {Buffer} device_configuration - Raw bytes of the device configuration.
   * @param {Buffer} android_checkin - Raw bytes of the Android check-in data.
   * @param {Record<string, string>} extra_info - Additional string key-value pairs.
   */
  constructor(device_configuration, android_checkin, extra_info) {
    this.device_configuration = device_configuration;
    this.android_checkin = android_checkin;
    this.extra_info = extra_info;
  }

  /**
   * Corresponds to the Rust `to_decoded` method.
   * Decodes the raw byte data into structured objects.
   * Requires the actual Protocol Buffer classes to be available.
   * @returns {DeviceProperties} The decoded device properties.
   * @throws {Error} If decoding fails or Protocol Buffer classes are not available.
   */
  toDecoded() {
    // Ensure the Protocol Buffer classes are available before attempting decode
    if (!DeviceConfigurationProto || !AndroidCheckinProto) {
      throw new Error("Protocol Buffer classes (DeviceConfigurationProto, AndroidCheckinProto) are not loaded.");
    }

    try {
      // Decode the byte buffers using the Protocol Buffer classes.
      // The exact decode method might vary slightly depending on your protobufjs setup
      // (e.g., using .decode() on the message class or a reader).
      // This example assumes a static decode method on the class.
      const decodedDeviceConfig = DeviceConfigurationProto.decode(this.device_configuration);
      const decodedAndroidCheckin = AndroidCheckinProto.decode(this.android_checkin);

      return new DeviceProperties(
        decodedDeviceConfig,
        decodedAndroidCheckin,
        this.extra_info
      );
    } catch (error) {
      // Handle potential decoding errors
      console.error("Error decoding device properties:", error);
      throw new Error("Failed to decode device properties.");
    }
  }
}

// --- DeviceProperties Class ---
/**
 * Corresponds to the Rust `DeviceProperties` struct.
 * Holds the decoded, structured data and extra info.
 * #[allow(dead_code)] is not needed in JavaScript as there's no compiler warning for unused types.
 */
class DeviceProperties {
  /**
   * @param {DeviceConfigurationProto} device_configuration - Decoded device configuration object.
   * @param {AndroidCheckinProto} android_checkin - Decoded Android check-in object.
   * @param {Record<string, string>} extra_info - Additional string key-value pairs.
   */
  constructor(device_configuration, android_checkin, extra_info) {
    this.device_configuration = device_configuration;
    this.android_checkin = android_checkin;
    this.extra_info = extra_info;
  }

  // Add any methods needed for working with the decoded properties here.
}

// --- Exporting the classes ---
// You might export these classes depending on how you structure your Node.js project.
// module.exports = {
//   EncodedDeviceProperties,
//   DeviceProperties,
//   // You would also need to export/make available your actual Proto classes
//   // DeviceConfigurationProto,
//   // AndroidCheckinProto,
// };

// Example of how you might load your generated proto classes (if using dynamic loading):
/*
async function loadProtoClasses() {
  const protobuf = require('protobufjs'); // Assuming protobufjs is installed

  // Load your root proto file or specific message types
  const root = await protobuf.load("path/to/your/proto_file.proto");

  // Get the message types
  DeviceConfigurationProto = root.lookupType("your.package.name.DeviceConfigurationProto");
  AndroidCheckinProto = root.lookupType("your.package.name.AndroidCheckinProto");

  console.log("Protocol Buffer classes loaded.");
}

// Call this function before attempting to decode
// loadProtoClasses().catch(console.error);
*/

// Alternatively, if using static code generation with protobufjs:
// const { DeviceConfigurationProto: ActualDeviceConfigProto } = require('./generated_protos/device_configuration_pb');
// const { AndroidCheckinProto: ActualAndroidCheckinProto } = require('./generated_protos/android_checkin_pb');
// DeviceConfigurationProto = ActualDeviceConfigProto;
// AndroidCheckinProto = ActualAndroidCheckinProto;
// console.log("Protocol Buffer classes assigned from generated files.");

// Note: You need to replace the placeholder assignments for DeviceConfigurationProto
// and AndroidCheckinProto with the actual way you load or import your generated
// Protocol Buffer classes in your project.
