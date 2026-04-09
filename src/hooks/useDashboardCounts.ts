import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type DashboardCounts = {
  students: number;
  professors: number;
  classrooms: number;
  subjects: number;
  enrollments: number;
  assessments: number;
};

export function useDashboardCounts() {
  const [counts, setCounts] = useState<DashboardCounts>({
    students: 0,
    professors: 0,
    classrooms: 0,
    subjects: 0,
    enrollments: 0,
    assessments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("http://localhost:8080/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar dashboard");
        }

        const data = await response.json();

        setCounts(data);
        
      } catch (error) {
        setError("Erro ao carregar dados");
        navigate("/");
      
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { counts, loading, error };
}