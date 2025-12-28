/**
 * Lovecraftian-themed error messages for immersive UX
 */

export const ERROR_MESSAGES = {
    // Connection errors
    CONNECTION_LOST: "La conexión con el vacío se ha interrumpido... Los susurros del abismo se desvanecen.",
    CONNECTION_REFUSED: "Los Antiguos rechazan tu llamada. El portal permanece sellado.",

    // Timeout errors
    TIMEOUT: "Las sombras consumen tu mensaje... El tiempo fluye diferente en el abismo.",

    // Server errors
    SERVER_ERROR: "Los Antiguos no responden. Algo se agita en las profundidades del servidor.",
    SERVER_UNAVAILABLE: "El servidor yace dormido en R'lyeh. Cuando las estrellas se alineen, despertará.",

    // Generic fallback
    GENERIC: "Un error indescriptible ha ocurrido. Algunos conocimientos no están destinados a los mortales.",

    // Aborted/cancelled
    ABORTED: "Has interrumpido la invocación. El silencio regresa.",
} as const;

export const LOADING_MESSAGES = {
    THINKING: "La entidad maquina en las profundidades...",
    CONNECTING: "Estableciendo conexión con el vacío...",
    STREAMING: "Los susurros emergen del abismo...",
} as const;

export type ErrorKey = keyof typeof ERROR_MESSAGES;

/**
 * Get a themed error message based on the error type
 */
export function getThemedErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        const message = error.message.toLowerCase();

        if (error.name === "AbortError" || message.includes("abort")) {
            return ERROR_MESSAGES.ABORTED;
        }
        if (message.includes("timeout") || message.includes("timed out")) {
            return ERROR_MESSAGES.TIMEOUT;
        }
        if (message.includes("network") || message.includes("fetch") || message.includes("connection")) {
            return ERROR_MESSAGES.CONNECTION_LOST;
        }
        if (message.includes("refused") || message.includes("cors")) {
            return ERROR_MESSAGES.CONNECTION_REFUSED;
        }
        if (message.includes("500") || message.includes("internal")) {
            return ERROR_MESSAGES.SERVER_ERROR;
        }
        if (message.includes("503") || message.includes("unavailable")) {
            return ERROR_MESSAGES.SERVER_UNAVAILABLE;
        }
    }

    return ERROR_MESSAGES.GENERIC;
}
