import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">My Blog</h3>
                        <p className="text-gray-300">
                            テスト。テスト。テスト。テスト。テスト。テスト。テスト。テスト。テスト。テスト。テスト。テスト。テスト。
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; {currentYear} My Blog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}