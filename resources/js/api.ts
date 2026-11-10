export const base = document.querySelector<HTMLElement>('#storm')?.dataset.base ?? '/storm';
export async function api<T>(path: string, data?: unknown, method?: string): Promise<T> {
  const response = await fetch(base + '/api/' + path, {
    method: method ?? (data === undefined ? 'GET' : 'POST'), credentials: 'same-origin',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '' },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`);
  return result as T;
}
export function download(name: string, value: unknown): void {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url);
}
