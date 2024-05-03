import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import dayjs from "dayjs";

export const headers = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "author",
    label: "Author",
  },
  {
    key: "genre",
    label: "Genre",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "isbn",
    label: "ISBN",
  },
  {
    key: "published",
    label: "Published Date",
  },
  {
    key: "publisher",
    label: "Publisher",
  },
];

export interface DataType {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: string;
  published: string;
  publisher: string;
}

export const getServerSideProps = (async () => {
  const res = await fetch("https://fakerapi.it/api/v1/books");
  const repo = await res.json();
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: any }>;

export default function Book({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data: DataType[] = repo?.data;

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
          {data.map(
            ({
              id,
              title,
              author,
              genre,
              description,
              isbn,
              published,
              publisher,
            }) => (
              <tr key={id}>
                <td>
                  <Link
                    href={`/book/${id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {title}
                  </Link>
                </td>
                <td>{author}</td>
                <td>{genre}</td>
                <td>{description}</td>
                <td>{isbn}</td>
                <td>{dayjs(published).format("DD/MM/YYYY")}</td>
                <td>{publisher}</td>
              </tr>
            )
          )}
        </table>
      ) : (
        ""
      )}
    </main>
  );
}
