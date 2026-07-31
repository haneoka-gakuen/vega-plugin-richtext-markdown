import {
  defineVegaPlugin,
  type VegaPlugin,
  type VegaPluginContext,
} from "@haneoka/vega/plugin";
import {
  VEGA_RICH_TEXT_SERVICE,
  type VegaRichTextHandle,
  type VegaRichTextRenderRequest,
  type VegaRichTextRenderer,
} from "@haneoka/vega-plugin-richtext";
import { sanitizeHtmlToFragment } from "@haneoka/vega-plugin-richtext-html";
import { Marked } from "marked";

const markdownParser = new Marked({
  async: false,
  breaks: false,
  gfm: true,
  pedantic: false,
});

/**
 * Parse Markdown, then pass every byte of generated HTML through the shared
 * strict HTML sanitizer. Marked output is never exposed as a trusted result.
 */
export const markdownToSanitizedFragment = (
  document: Document,
  source: string,
): DocumentFragment => {
  const parsed = markdownParser.parse(String(source), { async: false });
  if (typeof parsed !== "string") {
    throw new TypeError("Marked unexpectedly returned an asynchronous result");
  }
  return sanitizeHtmlToFragment(document, parsed);
};

export const vegaMarkdownRichTextRenderer: VegaRichTextRenderer =
  Object.freeze({
    id: "vega-markdown",
    formats: ["markdown", "md"],
    render({ document, signal, source }: VegaRichTextRenderRequest) {
      if (signal.aborted) return document.createDocumentFragment();
      return markdownToSanitizedFragment(document, source);
    },
  });

const registerRenderer = (
  context: VegaPluginContext,
  renderer: VegaRichTextRenderer,
): VegaRichTextHandle => {
  const service = context.service(VEGA_RICH_TEXT_SERVICE);
  if (!service) {
    throw new ReferenceError(
      "Vega Markdown rich text requires haneoka.vega-richtext",
    );
  }
  return service.register(renderer);
};

export const createVegaMarkdownRichTextPlugin = (): VegaPlugin =>
  defineVegaPlugin({
    manifest: {
      id: "haneoka.vega-richtext-markdown",
      name: "Vega Rich Text Markdown",
      version: "0.1.0",
      apiVersion: 1,
      description: "Sanitized GFM renderer for Vega rich text",
      capabilities: ["rich-text"],
      dependencies: {
        "haneoka.vega-richtext": "^0.1.0",
      },
    },
    setup(context) {
      const registration = registerRenderer(
        context,
        vegaMarkdownRichTextRenderer,
      );
      return { dispose: () => registration.dispose() };
    },
  });

export const vegaMarkdownRichTextPlugin =
  createVegaMarkdownRichTextPlugin();

export default vegaMarkdownRichTextPlugin;
