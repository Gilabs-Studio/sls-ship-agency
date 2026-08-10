import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onFocus, onKeyDown, ...props }, ref) => {
    // Auto-select all text on focus
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Only select all if it's not a date, time, color, or file input
      if (
        type !== "date" &&
        type !== "time" &&
        type !== "color" &&
        type !== "file"
      ) {
        e.target.select();
      }
      onFocus?.(e);
    };

    // Prevent non-numeric input for number type
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type !== "number") {
        onKeyDown?.(e);
        return;
      }

      // Allow: backspace, delete, tab, escape, enter, and navigation keys
      const allowedKeys = new Set([
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ]);

      // Helper: Check if Ctrl/Cmd key combination is allowed
      const isAllowedCtrlKey = (): boolean => {
        if (!(e.ctrlKey || e.metaKey)) return false;
        const allowedCtrlKeys = new Set(["a", "c", "v", "x", "z"]);
        return allowedCtrlKeys.has(e.key.toLowerCase());
      };

      // Helper: Check if minus sign is at the start
      const isMinusAtStart = (): boolean => {
        return (
          e.key === "-" &&
          (e.currentTarget.selectionStart === 0 || e.currentTarget.value === "")
        );
      };

      // Helper: Check if decimal point is allowed (only one allowed)
      const isDecimalPointAllowed = (): boolean => {
        if (e.key !== ".") return false;
        return !e.currentTarget.value.includes(".");
      };

      // Helper: Check if key is in allowed list or is a number
      const isAllowedKey = (): boolean => {
        return allowedKeys.has(e.key) || /^\d$/.test(e.key);
      };

      // Allow Ctrl/Cmd + A, C, V, X, Z
      if (isAllowedCtrlKey()) {
        onKeyDown?.(e);
        return;
      }

      // Allow minus sign only if it's at the start (for negative numbers)
      if (isMinusAtStart()) {
        onKeyDown?.(e);
        return;
      }

      // Allow decimal point only if one doesn't already exist
      if (isDecimalPointAllowed()) {
        onKeyDown?.(e);
        return;
      }

      // Allow numbers and other allowed keys
      if (isAllowedKey()) {
        onKeyDown?.(e);
        return;
      }

      // Prevent all other keys
      e.preventDefault();
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-white/15 bg-white/5 backdrop-blur-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ACFCCC]/50 focus-visible:border-[#ACFCCC]/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
          "group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive",
          className,
        )}
        ref={ref}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
