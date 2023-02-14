
export function matchUrlPattern(patternUrl, url) {
  const pattern = new URLPattern({ pathname: `${patternUrl}*` })
  return pattern.test(url);
}
