import { Haptics, ImpactStyle } from "@capacitor/haptics";

export function useHaptics() {

  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  const hapticsImpactLight = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  const hapticsVibrate = async () => {
    await Haptics.vibrate();
  };

  const hapticsSelectionStart = async () => {
    await Haptics.selectionStart();
  };

  const hapticsSelectionChanged = async () => {
    await Haptics.selectionChanged();
  };

  const hapticsSelectionEnd = async () => {
    await Haptics.selectionEnd();
  };
  return { hapticsImpactMedium, hapticsImpactLight };
}
