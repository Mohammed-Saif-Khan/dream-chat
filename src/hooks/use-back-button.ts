"use client";
import React from "react";

type useHistoryUI<T> = {
  isOpen: boolean;
  payload?: T | null;
};

export const useHistoryUI = <T>() => {
  const [state, setState] = React.useState<useHistoryUI<T>>({
    isOpen: false,
    payload: null,
  });

  const open = (data?: T | null) => {
    setState({ isOpen: true, payload: data ?? null });
    window.history.pushState({ backState: true }, "");
  };

  const close = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
    window.history.back();
  };

  React.useEffect(() => {
    const handlePop = () => {
      setState((prev) => ({ ...prev, isOpen: false }));
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  return {
    isOpen: state.isOpen,
    payload: state.payload,
    open,
    close,
  };
};
