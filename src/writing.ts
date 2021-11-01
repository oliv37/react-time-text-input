import { isValid } from "./validation";

function updateValue(
  value: string,
  from: number,
  to: number,
  characters: string
) {
  const startStr = value.substring(0, from);
  const endStr = value.substring(to);
  return `${startStr}${characters}${endStr}`;
}

function computeWritingHints(value: string, selectionStart: number) {
  const [hours = "", minutes = ""] = value.split(":");
  const semicolonIndex = value.indexOf(":");
  const hasSemicolon = semicolonIndex >= 0;
  const isAfterSemicolon = hasSemicolon && selectionStart > semicolonIndex;
  const isHoursComplete = hours.length === 2;
  const isMinutesComplete = minutes.length === 2;
  const shouldWriteSemicolon = isHoursComplete && selectionStart == 2;
  const shouldWriteMinutes = isAfterSemicolon || shouldWriteSemicolon;
  const shouldWriteHours = !shouldWriteMinutes;
  const shouldReplaceDigit =
    (shouldWriteHours && isHoursComplete) ||
    (shouldWriteMinutes && isMinutesComplete);

  return {
    shouldReplaceDigit,
    shouldWriteSemicolon,
  };
}

export function removeCharacters(value: string, from: number, to: number) {
  return updateValue(value, from, to, "");
}

export function replaceCharacters(
  value: string,
  index: number,
  characters: string
) {
  return updateValue(value, index, index + characters.length, characters);
}

export function addCharacters(
  value: string,
  index: number,
  characters: string
) {
  return updateValue(value, index, index + characters.length - 1, characters);
}

export function writeSemiColon(input: HTMLInputElement) {
  const [before = "", after = ""] = input.value.split(":");
  const nextPosition = (input.selectionStart || 0) + 1;

  input.value = `${before}:${after}`;
  input.setSelectionRange(nextPosition, nextPosition);
}

export function writeDigit(
  input: HTMLInputElement,
  digit: number,
  clock: number
) {
  const value = input.value;
  const selectionStart = input.selectionStart || 0;
  const hints = computeWritingHints(value, selectionStart);

  const characters = hints.shouldWriteSemicolon ? `:${digit}` : `${digit}`;
  const nextCursorPosition = selectionStart + characters.length;
  const newTime = hints.shouldReplaceDigit
    ? replaceCharacters(value, selectionStart, characters)
    : addCharacters(value, selectionStart, characters);

  if (isValid(newTime, clock)) {
    input.value = newTime;
    input.setSelectionRange(nextCursorPosition, nextCursorPosition);
  }
}
