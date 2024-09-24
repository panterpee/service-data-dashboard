"use client";

import { insertData } from "./action";
import { useFormState } from "react-dom";
import Link from 'next/link';
import './page.css'
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Alldata() {
  const initMessage = {
    message: null,
  };
  const searchParams = useSearchParams();
  const officer_name = searchParams.get('officername');
  const [state, formAction] = useFormState(insertData, initMessage);

  const [officerName, setOfficerName] = useState(officer_name || "");

  const topics = [
    { topic: "Officer Name", key: "officerName", value: officerName, isReadOnly: true },
    { topic: "Product", key: "product" },
    { topic: "Part", key: "part" },
    { topic: "Malfunction", key: "malfunction" },
    { topic: "Customer Phone", key: "custumerPhone" },
  ];

  if (state.message === 'insert data success') {
    alert(state.message);
  } else if (state.message) {
    alert(state.message);
  }

  return (
    <>
      <div className="max-width">
        <form action={formAction}>
          {topics.map((topic, index) => (
            <h3 key={index}>
              <strong>{topic.topic}:</strong>{" "}
              <input
                type="text"
                name={topic.key}
                className="input-data"
                value={topic.value}
              />
            </h3>
          ))}
          <button className="button-a">Submit</button>
        </form>
        <Link href="/custumerData">
          <button className="button-a">See all data</button>
        </Link>
        <div>{state.message}</div>
      </div>
    </>
  );
}
