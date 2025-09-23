const BASE_URL = 'https://rickandmortyapi.com/api';

export async function apiFetch<T>(
    path: string,
    params?: Record<string, string | number | undefined>
): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                url.searchParams.set(key, String(value));
            }
        });
    }

    const res = await fetch(url.toString());

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}
