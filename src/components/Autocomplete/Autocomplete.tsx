import { useEffect, useState } from "react";
import { useAutocomplete } from "../../hooks/useAutocomplete";
import type { AutocompleteProps, BaseEntity } from "../../services/autocompleteService";
import { InputGroup, Label } from "../Card/CardForm/styles";
import { DropDown, DropDownItem } from "./styles";
import Input from "../Input/Input";

function Autocomplete<T extends BaseEntity>({
    value,
    onChange,
    fetchFn,
    getLabel,
    placeholder = "Search..."
}: AutocompleteProps<T>) {

    const [isOpen, setIsOpen] = useState(false);

    const {
        query,
        setQuery,
        results,
        loading
    } = useAutocomplete(fetchFn);

    useEffect(() => {
        if (value) {
            setQuery(getLabel(value));
        } else {
            setQuery("");
        }
    }, [value]);

    return (
        <div>
            <InputGroup>
                <Label>Schoolyear</Label>
                <Input
                    value={query}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        onChange(null);
                    }}
                />
            </InputGroup>
            {loading && <div>Loading...</div>}

            {isOpen && results.length > 0 && (
                <DropDown>
                    {results.map((item) => (
                        <DropDownItem
                            key={item.id}
                            onMouseDown={() => {
                                onChange(item);
                                setQuery(getLabel(item));
                                setIsOpen(false);
                            }}
                        >
                            {getLabel(item)}
                        </DropDownItem>
                    ))}
                </DropDown>
            )}
        </div>
    );
}

export default Autocomplete;