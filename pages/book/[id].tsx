import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { headers, DataType } from ".";

export const getServerSideProps = (async () => {
  /* Because there is no api to query with book id, so I must get all books and then filter with id
  I recognized that every time call this api will return different database. For example, with id = 1, we may get different book every time we refresh url "/book/1"
  */
  const res = await fetch("https://fakerapi.it/api/v1/books");
  const repo = await res.json();
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: any }>;

export default function BookDetail({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const {
    title,
    author,
    genre,
    description,
    isbn,
    published,
    publisher,
  }: DataType = repo?.data?.find(
    (book: DataType) => book?.id.toString() === router.query.id
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main>
      {isClient ? (
        <table id="books">
          <tr>
            {headers.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
          <tr>
            <td>{title}</td>
            <td>{author}</td>
            <td>{genre}</td>
            <td>{description}</td>
            <td>{isbn}</td>
            <td>{dayjs(published).format("DD/MM/YYYY")}</td>
            <td>{publisher}</td>
          </tr>
        </table>
      ) : (
        ""
      )}
    </main>
  );
}
