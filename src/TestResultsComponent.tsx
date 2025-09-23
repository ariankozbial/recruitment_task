import { useState } from 'react';
import { useCharacters } from './hooks';

export default function TestResultsComponent() {
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const { data, isLoading, isError, error } = useCharacters(page, name, status);

    const handleClear = () => {
        setPage(1);
        setName('');
        setStatus('');
    }

    return (
        <div>
            <h1>Rick & Morty — characters</h1>

            <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                    placeholder="Filter by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Any status</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">unknown</option>
                </select>

                <button onClick={handleClear}>Clear</button>
            </div>

            {isLoading && <p>Loading...</p>}

            {isError && <p style={{ color: 'red' }}>Error: {error?.message}</p>}

            {data && (
                <>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {data.results.map((c) => (
                            <li key={c.id} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
                                <img src={c.image} alt={c.name} width={60} height={60} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                                    <div style={{ fontSize: 13 }}>{c.status} — {c.species}</div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                        >
                            Prev
                        </button>

                        <div>Page {page} / {data.info.pages}</div>

                        <button
                            onClick={() => setPage((prevPage) => prevPage + 1)}
                            disabled={page >= data.info.pages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
