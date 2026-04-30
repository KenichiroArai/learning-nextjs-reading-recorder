'use client';

import { useRouter } from 'next/navigation';
import { SyntheticEvent, useRef } from 'react';
import type { LayoutProps } from '@/lib/types';

// 「/books/keyword」配下に適用されるレイアウト
export default function BooksLayout({ children }: LayoutProps) {
    const router = useRouter();
    const txtKeyword = useRef<HTMLInputElement>(null);
    // [検索]ボタンクリック時に「/books/keyword」へリダイレクト
    const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/books/${encodeURIComponent(txtKeyword.current!.value)}`);
    };

    return (
        <>
            <form className="mt-2 mb-4" onSubmit={handleSearch}>
                <input type="text" ref={txtKeyword}
                    className="bg-gray-100 text-black border border-gray-600 rounded mr-2 px2 py-2 focus:bg-white focus:outline-none focus:border-red-500" />
                    <button type="submit"
                        className="bg-blue-600 text-white rounded px-4 py-2 hover:gb-blue-500">
                            検索</button>

            </form>
            <hr />
            {children}
        </>
    );
}
