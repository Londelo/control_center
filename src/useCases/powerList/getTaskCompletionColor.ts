const getTaskCompletionColor = (timeNeeded: number, timeLeft: number): string => {
  // Handle edge cases
  if (timeNeeded <= 0) return 'hsl(0, 98%, 54%, 1.00)'; // Red for invalid data
  if (timeLeft <= 0) return 'hsla(123, 98%, 54%, 1.00)'; // Green for completed

  // Calculate completion ratio (0 = not started, 1 = completed)
  const completionRatio = Math.max(0, Math.min(1, (timeNeeded - timeLeft) / timeNeeded));

  // Map completion ratio to hue (0 = red, 120 = green)
  // Red (0°) -> Yellow (60°) -> Green (120°)
  const hue = completionRatio * 120;

  // Use lighter saturation and lightness for subtle background colors
  return `hsl(${hue}, 98%, 54%, 1.00)`;
};

export default getTaskCompletionColor;
