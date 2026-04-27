import Link from 'next/link';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from "next";
import type { LayoutProps } from "@/lib/types";
// Tailwind.cssの設定をインポート
import "./globals.css";

// Googleフォントを有効化
const fnt = Inconsolata({ subsets: ['latin']});

// メタデータを定義
export const metadata: Metadata = {
  title: 'Reading Recorder',
  description: '自分が読んだ書籍の記録を残すのためのアプリ',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <body className={fnt.className}>
        <h1 className="text4xl text-indigo-800 font bold my-2">
          Reading Recorder</h1>
        {/* 共通メニューの準備 */}
        <nav>
          <ul className="flex bg-blue-600 mb-4 pl-2">
            <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <Link className="no-underline text-blue-300" href="/">
                Home</Link></li>
            <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <Link className="no-underline text-blue-300" href="/books">
                Search</Link></li>
            <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <a className="no-underline text-blue-300"
                href="https://wings.msn.to/" target="_blank">Support</a></li>
          </ul>
        </nav>
        {/* ページコンポーネントを反映する領域 */}
        <div className="ml-2">
          {children}
        </div>
      </body>
    </html>
  )
}
