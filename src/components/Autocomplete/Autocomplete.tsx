import { useEffect, useState } from "react";

interface Props<T> {
    value: T | null;
    onChange: (item: T | null) => void;

    placeholder?: string;
    url: string;
    queryParamName: string;
    getLabel: (item: T) => string;
}

function Autocomplete<T extends { id: string | number }>({
    value,
    onChange,
    placeholder = "Search...",
    url,
    queryParamName,
    getLabel
}: Props<T>) {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<T[]>([]);

    useEffect(() => {
        if (value) {
            setQuery(getLabel(value));
        } else {
            setQuery("");
        }
    }, [value]);

    useEffect(() => {
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            try {
                const response = await fetch(
                    `${url}?${queryParamName}=${query}`,
                    { signal: controller.signal }
                );

                const data = await response.json();
                setResults(data.content || data);

            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            }
        }, 300);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };

    }, [query, url, queryParamName]);

    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    onChange(null); // limpou seleção
                }}
            />

            {results.length > 0 && (
                <div>
                    {results.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                onChange(item);
                                setResults([]);
                            }}
                        >
                            {getLabel(item)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Autocomplete;