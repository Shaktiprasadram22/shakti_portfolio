require("@testing-library/jest-dom");

try {
  const { Request, Response, Headers, FormData, fetch } = require("undici");
  if (!global.Request) global.Request = Request;
  if (!global.Response) global.Response = Response;
  if (!global.Headers) global.Headers = Headers;
  if (!global.FormData) global.FormData = FormData;
  if (!global.fetch) global.fetch = fetch;
} catch {
  // Ignore if runtime already provides fetch APIs.
}

if (typeof window !== "undefined") {
  if (!window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes("dark"),
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  }

  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    };
  }
}

jest.mock("framer-motion", () => {
  const React = require("react");

  const MOTION_PROPS = new Set([
    "animate",
    "exit",
    "initial",
    "layout",
    "transition",
    "variants",
    "viewport",
    "whileHover",
    "whileInView",
    "whileTap",
  ]);

  const createMotionComponent = (tag) =>
    React.forwardRef(({ children, ...props }, ref) => {
      const safeProps = {};
      for (const [key, value] of Object.entries(props)) {
        if (!MOTION_PROPS.has(key)) {
          safeProps[key] = value;
        }
      }
      return React.createElement(tag, { ref, ...safeProps }, children);
    });

  const motion = new Proxy(
    {},
    {
      get: (_, tag) => createMotionComponent(tag),
    }
  );

  return {
    motion,
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});
