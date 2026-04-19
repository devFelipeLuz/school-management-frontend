export interface BaseEntity {
    id: string | number;
}

export interface AutocompleteProps<T extends BaseEntity> {
    value: T | null;
    onChange: (item: T | null) => void;

    fetchFn: (query: string) => Promise<T[]>;

    getLabel: (item: T) => string;
    placeholder?: string;
}