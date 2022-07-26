import { Injectable } from '@angular/core';
import { Plugin, Cordova, AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core';
import { Observable } from 'rxjs';

// See https://developer.android.com/reference/android/nfc/cardemulation/HostApduService#onDeactivated(int)
export enum DeactivationReason {
  DEACTIVATION_LINK_LOSS = 0,
  DEACTIVATION_DESELECTED = 1,
}

/**
 * @name HCE
 * @description
 * This plugin provides Host Card Emulation (HCE) for Apache Cordova. Host-based card emulation allows a Cordova
 * application emulate a NFC Smart Card (without using the secure element) and talk directly to the NFC reader.
 *
 * This plugin provides a low-level access. The plugin receives commands as Uint8Arrays and expects responses to
 * be Uint8Arrays. As a developer, you must implement higher level protocols based on your applications needs.
 *
 * Host Card Emulation requires NFC.
 *
 * @usage
 * When using this plugin with Capacitor, various manual configuration changes are necessary in Android XML config
 * files. Please see the [`plugin.xml`](https://github.com/don/cordova-plugin-hce/blob/master/plugin.xml) file for
 * what to add and change.
 *
 * ```typescript
 * import { HCE, HceUtil } from '@awesome-cordova-plugins/hce';
 *
 * const subscription = HCE.registerCommandCallback().subscribe({
 *   next: (commandBytes) => {
 *     var commandAsString = HceUtil.byteArrayToHexString(commandBytes);
 *
 *     // do something with the command and create a response
 *
 *     // send the response
 *     HCE.sendResponse(commandResponse);
 *   },
 *   error: (code) => {
 *     // handle error
 *   },
 * });
 *
 * // When done
 * subscription.unsubscribe();
 * ```
 */
@Plugin({
  pluginName: 'HCE',
  plugin: 'cordova-plugin-hce',
  pluginRef: 'hce',
  repo: 'https://github.com/don/cordova-plugin-hce',
  install: 'ionic cordova plugin add cordova-plugin-hce --variable AID_FILTER=F222222222',
  installVariables: ['AID_FILTER'],
  platforms: ['Android'],
})
@Injectable()
export class HCE extends AwesomeCordovaNativePlugin {
  /**
   * Register to receive APDU commands from the remote device.
   *
   * @returns {Observable<ArrayBuffer>} Returns an Observable that streams received APDU commands as byte arrays
   */
  @Cordova({
    observable: true,
  })
  registerCommandCallback(): Observable<ArrayBuffer> {
    return;
  }

  /**
   * Sends a response APDU back to the remote device. This method is intended to be called from within the event
   * handler of `registerCommandCallback`.
   * Android recommends "...response APDUs must be sent as quickly as possible, given the fact that the user is
   * likely holding his device over an NFC reader when this method is called."
   *
   * @param {ArrayBuffer} responseApdu Response for NFC reader
   * @returns {Promise<void>} Returns a Promise that resolves when the response was sent
   */
  @Cordova()
  sendResponse(responseApdu: ArrayBuffer): Promise<void> {
    return;
  }

  /**
   * Register to be notified when host service is deactivated (e.g. phone is moved out of reach of NFC reader).
   *
   * @returns {Promise<DeactivationReason>} Returns a Promise that resolves when the service is deactivated
   */
  @Cordova()
  registerDeactivatedCallback(): Promise<DeactivationReason> {
    return;
  }
}

/**
 * @hidden
 */
@Plugin({
  pluginName: 'HCE',
  plugin: 'cordova-plugin-hce',
  pluginRef: 'hce.util',
})
@Injectable()
export class HceUtil extends AwesomeCordovaNativePlugin {
  @Cordova({ sync: true })
  hexStringToByteArray(s: string): ArrayBuffer {
    return;
  }

  @Cordova({ sync: true })
  byteArrayToHexString(a: ArrayBuffer): string {
    return;
  }

  @Cordova({ sync: true })
  stringToBytes(s: string): ArrayBuffer {
    return;
  }

  @Cordova({ sync: true })
  concatenateBuffers(a1: ArrayBuffer, a2: ArrayBuffer): ArrayBuffer {
    return;
  }
}
