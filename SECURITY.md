# Security

## Supported versions

Security fixes are provided for the latest release.

## Reporting

Report vulnerabilities privately through GitHub Security Advisories for
`haneoka-gakuen/vega-plugin-richtext-markdown`. Do not open a public issue for
an unpatched vulnerability.

Include the input, rendered result, execution environment, impact, and a
minimal reproduction. Avoid including private story content.

## Security boundary

Markdown and raw HTML are untrusted. Marked output must never be inserted into
the DOM before passing through
`@haneoka/vega-plugin-richtext-html`'s strict DOMPurify policy. Do not add an
escape hatch that bypasses that sanitizer.

