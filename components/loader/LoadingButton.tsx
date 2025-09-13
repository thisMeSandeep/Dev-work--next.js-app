import React, { ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    isLoading = false,
    children,
    ...props
}) => {
    return (
        <button
            disabled={isLoading || props.disabled}
            {...props}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-green-500 
        bg-green-600 text-white text-base font-medium
        hover:bg-green-500 transition-all duration-300 
        disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed
        ${props.className ?? ""}`}
        >
            {isLoading && <LoaderCircle className="animate-spin w-4 h-4" />}
            {children}
        </button>
    );
};

export default LoadingButton;
