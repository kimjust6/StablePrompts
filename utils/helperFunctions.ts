export function convertUrl(url: string, base_url: string) {
  const newUrl = url.replace("http://127.0.0.1:8888", base_url);
  return newUrl;
}
