import { useState, useEffect, useCallback } from "react";
import { env } from "../../../config/env";

export type ConnectionStatus = "connected" | "disconnected" | "checking";

const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds

export function useHealthCheck() {
    const [status, setStatus] = useState<ConnectionStatus>("checking");
    const [lastCheck, setLastCheck] = useState<Date | null>(null);

    const checkHealth = useCallback(async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${env.apiBaseUrl}/health/`, {
                method: "GET",
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                setStatus("connected");
            } else {
                setStatus("disconnected");
            }
        } catch {
            setStatus("disconnected");
        }
        setLastCheck(new Date());
    }, []);

    useEffect(() => {
        // Initial check
        checkHealth();

        // Periodic checks
        const interval = setInterval(checkHealth, HEALTH_CHECK_INTERVAL);

        return () => clearInterval(interval);
    }, [checkHealth]);

    return { status, lastCheck, recheckNow: checkHealth };
}
