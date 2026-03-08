import { usePreferences } from "@/contexts/PreferencesContext";

/**
 * Hook para reproduzir sons de feedback
 * Respeita a preferência do usuário sobre som
 */
export function useSound() {
  const prefs = usePreferences();

  const playSound = (type: "success" | "error" | "warning" | "click" = "click") => {
    if (!prefs.soundEnabled) return;

    // Usar Web Audio API para criar sons - compatível com todos os navegadores
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const frequencies = {
      success: 800, // Tom mais alto para sucesso
      error: 300, // Tom mais baixo para erro
      warning: 500, // Tom médio para aviso
      click: 600, // Tom para click
    };

    const durations = {
      success: 0.2,
      error: 0.3,
      warning: 0.2,
      click: 0.1,
    };

    oscillator.frequency.value = frequencies[type];
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + durations[type]);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + durations[type]);
  };

  const playNotification = () => playSound("success");
  const playError = () => playSound("error");
  const playWarning = () => playSound("warning");
  const playClick = () => playSound("click");

  return { playSound, playNotification, playError, playWarning, playClick };
}
