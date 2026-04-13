import { useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/auth";
import { activateUser, deactivateUser, getUsers } from "../services/userService";

interface User {
    id: string;
    email: string;
    createdAt: Date;
    role: string;
    enabled: boolean;
}

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [activeFilter, setActiveFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [role, setRole] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const [debouncedEmail, setDebouncedEmail] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const BASE_URL = "http://localhost:8080/admin/users";

    const fetchUsers = async () => {
        try {
            const data = await getUsers({
                email: debouncedEmail || undefined,
                role: roleFilter === "" ? undefined : roleFilter,
                enabled: activeFilter === "" ? undefined : activeFilter === "true"
            });

            setUsers(data);

        } catch (error) {
            console.error(error);

        }
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();

        const createData = {
            email: (document.getElementById("user-email") as HTMLInputElement).value,
            password: (document.getElementById("user-password") as HTMLInputElement).value,
            role: (document.getElementById("user-role") as HTMLInputElement).value,
        };

        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(createData)
            });

            if (response.ok) {
                fetchUsers();
                setIsFinished(true);

            } else {
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
        }
    }

    const handleUpdate = async (event: React.FormEvent, id: string) => {
        event.preventDefault();

        const updateData = {
            email: (document.getElementById("user-email") as HTMLInputElement).value,
            password: (document.getElementById("user-password") as HTMLInputElement).value,
            role: (document.getElementById("user-role") as HTMLInputElement).value,
        };

        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                fetchUsers();
                setIsFinished(true);

            } else {
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
        }
    }

    const handleDeactivate = async () => {
        if (!selectedUser) return;

        try {
            await deactivateUser(selectedUser.id.toString());
            await fetchUsers();
            setSelectedUser(null);

        } catch (error) {
            console.error(error);

        }
    };

    const handleActivate = async () => {
        if (!selectedUser) return;

        try {
            await activateUser(selectedUser.id.toString());
            await fetchUsers();
            setSelectedUser(null);

        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        fetchUsers();
    }, [debouncedEmail, activeFilter, roleFilter])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedEmail(emailFilter);
        }, 500);

        return () => clearTimeout(timer);
    }, [emailFilter])

    return {
        users,
        setUsers,

        selectedUser,
        setSelectedUser,

        activeFilter,
        setActiveFilter,

        emailFilter,
        setEmailFilter,

        role,
        setRole,

        roleFilter,
        setRoleFilter,

        debouncedEmail,
        setDebouncedEmail,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchUsers,
        handleCreate,
        handleUpdate,
        handleDeactivate,
        handleActivate
    }
}