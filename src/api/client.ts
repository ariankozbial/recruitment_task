const BASE_URL = "https://rickandmortyapi.com/api";

export const apiFetch = async <T>(
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> => {
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        `No data for given filters. Please click "Clear" button and try again.`,
      );
    }
    throw new Error("Error occured");
  }

  return res.json();
};
