function disableFutureFlagsWarnings() {
  if (process.env.NODE_ENV === "development") {
    const originalWarn = console.warn;
    console.warn = (message, ...args) => {
      if (message.includes("React Router Future Flag Warning")) {
        return;
      }
      originalWarn(message, ...args);
    };
  }
}

export default disableFutureFlagsWarnings;
