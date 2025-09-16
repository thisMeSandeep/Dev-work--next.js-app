"use client";

import { useState } from "react";

interface ReadMoreParagraphProps {
    text: string;
}

const CollapsibleText = ({ text }: ReadMoreParagraphProps) => {
    const [readMore, setReadMore] = useState(false);

    // Check if text is long enough to apply line clamp
    const isLong = text.split("\n").length > 6 || text.length > 300;

    return (
        <div>
            <p
                className={`text-gray-700 text-sm leading-relaxed whitespace-pre-line ${!readMore && isLong ? "line-clamp-6" : ""
                    }`}
            >
                {text}
            </p>

            {isLong && (
                <button
                    className="mt-1 text-blue-500 text-sm font-medium hover:underline"
                    onClick={() => setReadMore(!readMore)}
                >
                    {readMore ? "Hide" : "Read More"}
                </button>
            )}
        </div>
    );
};

export default CollapsibleText;
