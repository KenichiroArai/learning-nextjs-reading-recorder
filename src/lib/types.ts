import type { ReactNode } from 'react';

// 書籍情報の型定義
export type Book = {
    id:     string;
    title:  string;
    author: string;
    price:  number;
    publisher: string;
    published: string;
    image: string;
};

// レイアウトのProps型
export type LayoutProps = Readonly<{
    children: ReactNode;
}>;

// BookDetails/LinkedBookDetailsコンポーネントのProps定義
export type BookDetailsProps = Readonly<{
    index?:     number;
    book:       Book;
}>;
