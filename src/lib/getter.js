import prisma from "./prisma";

export async function getAllReviews() {
  // 読了日を降順で取得
  return await prisma.reviews.findMany({
    orderBy: {
      read: "desc",
    },
  });
}
