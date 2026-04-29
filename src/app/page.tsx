import { getAllReviews } from '@/lib/getters';
import LinkedBookDetails from '@/components/LinkedBookDetails';

export default async function Home() {
  // キャッシュを有効化
  'use cache';
  // すべてのレビュー情報を取得
  const reviews = await getAllReviews();
  // 取得したレビュー情報をもとにリストを生成
  return reviews.map((b, i) => (
    <LinkedBookDetails book={b} index={i + 1} key={b.id} />
  ));
}
