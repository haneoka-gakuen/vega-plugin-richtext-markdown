# Contributing

Use Node.js 20 or newer and pnpm 11.

```sh
pnpm install
pnpm check
```

Changes to parsing or sanitization require tests for normal Markdown, raw HTML,
unsafe URLs, lifecycle cleanup, and installation without an HTML plugin
instance. Keep the runtime package independent from applications and themes.

