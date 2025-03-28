// Regex from: https://stackoverflow.com/a/68002755/4807782
// modified to accept numbers in the body of domain though
// examples of matches:
//  "vercel.com"
//  "www.vercel.com"
//  "uptime-monitor-fe.vercel.app"
//  "https://uptime-monitor-fe.vercel.app/"

// Supports wildcards, port numbers at the end, paths at the end and query params
const baseUrlRegex =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_*-]+(\.[a-zA-Z0-9_*-]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))(.*)?\/?(.)*?$/gm

// iOS deep linking scheme https://benoitpasquier.com/deep-linking-url-scheme-ios/
const appRegex =
  /^[a-z0-9-]+([.][a-z0-9]+)*:\/(\/[-a-z0-9._~!$&'()*+,;=:@%]+)+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))(.*)?\/?(.)*?$/i

// Regex from https://stackoverflow.com/a/18696953/4807782
const localhostRegex = /^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/i

// "chrome-extension://<extension-id>"
const chromeExtensionRegex = /chrome-extension:\/\/([a-zA-Z]*)/gm

// New regex for custom scheme URLs
const customSchemeRegex = /^([a-zA-Z][a-zA-Z0-9+.-]*):(?:\/{1,3})?([a-zA-Z0-9_.-]*)$/

// Exclude simple domain names without protocol
const excludeSimpleDomainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

// combine the above regexes, with optional exclusion of options
// usage: urlRegex() or urlRegex({ excludeSimpleDomains: false })
export function urlRegex(
  options: { excludeSimpleDomains?: boolean } = { excludeSimpleDomains: true }
): RegExp {
  const { excludeSimpleDomains } = options
  const excludeSimpleDomainPart = excludeSimpleDomains
    ? `(?!${excludeSimpleDomainRegex.source})`
    : ''

  return new RegExp(
    `${excludeSimpleDomainPart}((${baseUrlRegex.source})|(${localhostRegex.source})|(${appRegex.source})|(${chromeExtensionRegex.source})|(${customSchemeRegex.source}))`,
    'i'
  )
}

// Use a const string to represent no chars option. Represented as empty string on the backend side.
export const NO_REQUIRED_CHARACTERS = 'NO_REQUIRED_CHARS'
