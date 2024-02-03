import BookDetails from "@/components/BookDetails";
import { getBookById, getReviewById } from "@/lib/getter";

export default async function EditPage({ params }) {
  const book = await getBookById(params.id);
  console.log(book);
  const review = await getReviewById(params.id);
  const read = (review?.read || new Date()).toLocaleDateString("sv-SE");

  return (
    <div id="form">
      <BookDetails book={book} />
      <hr />
    </div>
  );
}
