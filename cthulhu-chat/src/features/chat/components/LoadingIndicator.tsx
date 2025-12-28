import { LOADING_MESSAGES } from "../constants/errorMessages";

export function LoadingIndicator() {
    return (
        <div className="flex items-center gap-3 px-4 py-3">
            <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span className="text-sm text-bio-400 animate-pulse">
                {LOADING_MESSAGES.THINKING}
            </span>
        </div>
    );
}
