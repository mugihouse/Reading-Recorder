import prisma from "./prisma";

export async function getAllReviews() {
  // 読了日を降順で取得
  return await prisma.reviews.findMany({
    orderBy: {
      read: "desc",
    },
  });
}

export function createBook(book) {
  const authors = book.volumeInfo.authors;
  const price = book.saleInfo.listPrice;
  const img = book.volumeInfo.imageLinks;
  return {
    id: book.id,
    title: book.volumeInfo.title,
    authors: authors ? authors.join(",") : "",
    price: price ? price.amount : 0,
    publisher: book.volumeInfo.publisher,
    published: book.volumeInfo.publishedDate,
    image: img ? img.smallThumbnail : "/vercel.svg",
  };
}

export async function getBooksByKeyword(keyword) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`
  );
  const result = await res.json();
  const books = [];
  for (const b of result.items) {
    books.push(createBook(b));
  }
  return books;
}
