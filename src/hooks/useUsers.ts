import { useEffect, useState } from "react";
import {
    activateUser,
    createUser,
    deactivateUser,
    getUsers,
    updateUser,
    type User
} from "../services/userService";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("ADMIN");

    const [activeFilter, setActiveFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const [debouncedEmail, setDebouncedEmail] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

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

    const clearState = () => {
        setEmail("");
        setPassword("");
        setRole("");
    }

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);


        try {
            const response = await createUser(email, password, role);

            if (response.ok) {
                fetchUsers();
                setIsFinished(true);

            } else {
                const errorData = await response.json();
                console.error("Backend error: ", errorData.messsage);
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
            setError(true);
        }
    }

    const handleUpdate = async (event: React.FormEvent, id: string) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await updateUser(email, password, role, id);

            if (response.ok) {
                fetchUsers();
                setIsFinished(true);

            } else {
                const errorData = await response.json();
                console.error("Backend error: ", errorData.messsage);
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
            setError(true);
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

        email,
        setEmail,

        password,
        setPassword,

        role,
        setRole,

        selectedUser,
        setSelectedUser,

        activeFilter,
        setActiveFilter,

        emailFilter,
        setEmailFilter,

        roleFilter,
        setRoleFilter,

        debouncedEmail,
        setDebouncedEmail,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchUsers,
        clearState,
        handleCreate,
        handleUpdate,
        handleDeactivate,
        handleActivate
    }
}