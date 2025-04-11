import React from 'react';

type TOCItem = {
    id: string;
    text: string;
    level: number;
};

type TableOfContentsProps = {
    toc: TOCItem[];
};

export default function TableOfContents({ toc }: TableOfContentsProps) {
    if (toc.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-bold mb-3">目次</h2>
            <nav>
                <ul className="space-y-2">
                    {toc.map((item) => (
                        <li
                            key={item.id}
                            style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
                        >
                            <a
                                href={`#${item.id}`}
                                className="text-blue-600 hover:underline block py-1"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}