import React, { useEffect, useRef, useImperativeHandle } from "react";
import { removeCharacters, writeSemiColon, writeDigit } from "./writing";
import { isValid, validateClock, validateTime } from "./validation";

interface InputTimeProps {
  type?: string;
  clock?: number;
  defaultValue?: string;
  value?: string;
  onChange?(time: string): void;
  [key: string]: any;
}

function InputTime(
  props: InputTimeProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const {
    type = "text",
    clock = 24,
    defaultValue,
    value,
    onChange,
    ...otherProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  validateClock(clock);
  validateTime("default value", defaultValue, clock);
  validateTime("value", value, clock);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    if (!inputRef || !inputRef.current) {
      return;
    }

    const hasValueChanged = inputRef.current.value !== value;

    if (value !== undefined && hasValueChanged) {
      inputRef.current.value = value;
    }
  }, [value]);

  function handleTimeChange(oldValue: string, newValue: string) {
    if (onChange && oldValue !== newValue) {
      onChange(newValue);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    e.preventDefault();

    const inputEl = e.target as HTMLInputElement;
    const value = inputEl.value;
    const selectionStart = inputEl.selectionStart || 0;
    const character = e.key;
    const isSemicolonCharacter = character === ":";
    const isNumberCharacter = character >= "0" && character <= "9";
    const isAtSemicolonPosition = selectionStart == 2;
    const isBeforeLastCursorPosition = selectionStart < 5;

    if (isSemicolonCharacter && isAtSemicolonPosition) {
      writeSemiColon(inputEl);
    }

    if (isNumberCharacter && isBeforeLastCursorPosition) {
      writeDigit(inputEl, Number(character), clock);
    }

    handleTimeChange(value, inputEl.value);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const isBackspace = e.key === "Backspace";
    const isDelete = e.key === "Delete";

    if (isDelete || isBackspace) {
      const inputEl = e.target as HTMLInputElement;
      const value = inputEl.value;
      const selectionStart = inputEl.selectionStart || 0;
      const selectionEnd = inputEl.selectionEnd || 0;
      const isMultiSelection = selectionStart !== selectionEnd;
      const isSingleBackspace = isBackspace && !isMultiSelection;
      const from = isSingleBackspace ? selectionStart - 1 : selectionStart;
      const to = isMultiSelection ? selectionEnd : from + 1;

      const newValue = removeCharacters(value, from, to);

      if (!isValid(newValue, clock)) {
        e.preventDefault();
        return;
      }

      handleTimeChange(value, newValue);
    }
  }

  return (
    <input
      ref={inputRef}
      type={type}
      defaultValue={defaultValue}
      {...otherProps}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
    />
  );
}

export default React.forwardRef<HTMLInputElement, InputTimeProps>(InputTime);
