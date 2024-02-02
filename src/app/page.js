import LinkBookDetails from "@/components/LinkedBookDetails";
import { getAllReviews } from "@/lib/getter";
import BooksLayout from "../app/books/[...keyword]/layout";

export const dynamic = "force-dynamic";

export default async function Home() {
  const reviews = await getAllReviews();
  return (
    <>
      <BooksLayout />
      {reviews.map((b, i) => (
        <LinkBookDetails book={b} index={i + 1} key={b.id} />
      ))}
    </>
  );
}
