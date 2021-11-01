function formatDigit(digit: string): string {
  if (digit.length < 2) {
    return digit + "0".repeat(2 - digit.length);
  }

  return digit;
}

export function isValid(time = "", clock: number): boolean {
  const [hours = "", minutes = ""] = time.split(":");
  return (
    time.length <= 5 &&
    hours.length <= 2 &&
    Number(formatDigit(hours)) < clock &&
    minutes.length <= 2 &&
    Number(formatDigit(minutes)) < 60
  );
}

export function validateClock(clock: number): void {
  if (clock !== 12 && clock !== 24) {
    throw new Error(
      `[InputTime] : invalid clock '${clock}', it must be 12 or 24`
    );
  }
}

export function validateTime(
  name: string,
  value: string | undefined,
  clock: number
): void {
  if (!isValid(value, clock)) {
    throw new Error(`[InputTime] : invalid ${name} '${value}'`);
  }
}
