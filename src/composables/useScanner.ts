import { ref } from "vue";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { toggle } from "ionicons/icons";
import { useHaptics } from '@/composables/useHaptics';
const {  hapticsImpactLight } = useHaptics();
// by convention, composable function names start with "use"
export function useScanner() {
  const barcodeData = ref<string>("");
  const isScanning = ref<null | boolean>(null);
  const startScan = async () => {
    hapticsImpactLight();
    checkPermissions();
    requestPermissions();
    isScanning.value = true;
    document.querySelector("body")?.classList.add("barcode-scanner-active");
    // Add the `barcodeScanned` listener
    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      async (result) => {
        barcodeData.value = result.barcode.displayValue;
        stopScan();
      }
    );
    
    // Start the barcode scanner
    await BarcodeScanner.startScan();
  };

  const stopScan = async () => {
    isScanning.value = false;

    // Make all elements in the WebView visible again
    document.querySelector("body")?.classList.remove("barcode-scanner-active");

    // Remove all listeners
    await BarcodeScanner.removeAllListeners();

    // Stop the barcode scanner
    await BarcodeScanner.stopScan();
  };

  const scanSingleBarcode = async () => {
    return new Promise(async (resolve) => {
      document.querySelector("body")?.classList.add("barcode-scanner-active");

      const listener = await BarcodeScanner.addListener(
        "barcodeScanned",
        async (result) => {
          await listener.remove();
          document
            .querySelector("body")
            ?.classList.remove("barcode-scanner-active");
          await BarcodeScanner.stopScan();
          resolve(result.barcode);
        }
      );

      await BarcodeScanner.startScan();
    });
  };

  const isSupported = async () => {
    const { supported } = await BarcodeScanner.isSupported();
    return supported;
  };

  const enableTorch = async () => {
    await BarcodeScanner.enableTorch();
  };

  const disableTorch = async () => {
    await BarcodeScanner.disableTorch();
  };

  const toggleTorch = async () => {
    await BarcodeScanner.toggleTorch();
  };

  const isTorchEnabled = async () => {
    const { enabled } = await BarcodeScanner.isTorchEnabled();
    return enabled;
  };

  const isTorchAvailable = async () => {
    const { available } = await BarcodeScanner.isTorchAvailable();
    return available;
  };

  const openSettings = async () => {
    await BarcodeScanner.openSettings();
  };

  const checkPermissions = async () => {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera;
  };

  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera;
  };
  // expose managed state as return value
  return { startScan, stopScan, isScanning, barcodeData, toggleTorch };
}
