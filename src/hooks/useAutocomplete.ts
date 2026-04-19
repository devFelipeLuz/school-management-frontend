import { useEffect, useState } from "react";

export function useAutocomplete<T>(
    fetchFn: (query: string) => Promise<T[]>
) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);

            try {
                const data = await fetchFn(query);
                setResults(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, fetchFn]);

    return {
        query,
        setQuery,
        results,
        loading
    };
}