import { X } from "lucide-react";

type PopupProps = {
    headerTitle: string;
    children: React.ReactNode;
    onClose: () => void;
};


export default function Popup({ headerTitle, children, onClose }: PopupProps) {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-5xl max-h-[80vh] bg-white rounded-2xl shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">{headerTitle}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content  */}
                <div className="overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}
