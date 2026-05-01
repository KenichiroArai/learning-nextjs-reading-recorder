import LinkedBookDetails from '@/components/LinkedBookDetails';
import { getBooksByKeyword } from '@/lib/getters';
import type { BookResultProps } from '@/lib/types';

// ルートパラメーターkeywordを取得（規定値はReact）
export default async function BookResult({ params }: BookResultProps) {
    const { keyword = ['React'] } = await params;
    // 与えられたキーワードで書籍情報を検索
    const books = await getBooksByKeyword(keyword[0]);
    // 取得した書籍をリスト表示
    return books.map((b,i) => (
        <LinkedBookDetails book={b} index={i + 1} key={b.id} />
    ));
}
