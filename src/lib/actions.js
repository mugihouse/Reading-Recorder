"use server";

import navigation, { redirect } from "next/navigation";
import prisma from "./prisma";
import { getBookById } from "./getter";

// フォームからの入力値をデータベースに登録
export async function addReview(data) {
  const book = await getBookById(data.get("id"));
  const input = {
    title: book.title,
    author: book.authors,
    price: Number(book.price),
    publisher: book.publisher,
    published: book.published,
    image: book.image,
    read: new Date(data.get("read")),
    memo: data.get("memo"),
  };

  // 新規データ→登録、既存データ→更新
  await prisma.reviews.upsert({
    update: input,
    create: Object.assign({}, input, { id: data.get("id") }),
    where: {
      id: data.get("id"),
    },
  });
  redirect("/");
}

// 削除ボタンで指定のレビュー情報を削除
export async function removeReview(data) {
  await prisma.reviews.delete({
    where: {
      id: data.get("id"),
    },
  });
  redirect("/");
}
