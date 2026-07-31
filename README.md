# Vega Rich Text Markdown

Sanitized GitHub Flavored Markdown rendering for Vega.

The plugin registers the `markdown` and `md` formats with
`VEGA_RICH_TEXT_SERVICE`. It parses with Marked 18.0.7 and sends all generated
HTML through the strict policy exported by
`@haneoka/vega-plugin-richtext-html`.

## Install

```sh
pnpm add @haneoka/vega-plugin-richtext \
  @haneoka/vega-plugin-richtext-markdown
```

```ts
import { VegaPluginHost } from "@haneoka/vega/engine";
import { vegaRichTextPlugin } from "@haneoka/vega-plugin-richtext";
import { vegaMarkdownRichTextPlugin } from "@haneoka/vega-plugin-richtext-markdown";

const host = new VegaPluginHost();
await host.install(vegaRichTextPlugin);
await host.install(vegaMarkdownRichTextPlugin);
```

## Policy

- GitHub Flavored Markdown is enabled.
- Raw HTML is accepted only as untrusted parser input and is always sanitized.
- Scripts, embeds, forms, media, SVG/MathML, styling hooks, and active URL
  schemes are removed.
- Consumers needing a different policy can register a separate renderer.

MPL-2.0.
