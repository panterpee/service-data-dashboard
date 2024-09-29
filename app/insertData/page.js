"use client";

import { insertData } from "./action";
import { getModel } from "./action";
import { useFormState } from "react-dom";
import Link from "next/link";
import "./page.css";
import { useEffect, useState } from "react";
import { getPart } from "./action";
import { useUserContext } from "../userContext";

export default function Alldata() {
  const initMessage = {
    message: null,
  };
  const [state, formAction] = useFormState(insertData, initMessage);
  const [malfunction, setMalfunction] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [modelData, setModelData] = useState([]);
  const [partData, setPartData] = useState([]);
  const { officerName, setOfficerName } = useUserContext(); 

  useEffect(() => {
    async function fetchModel() {
      const result = await getModel();
      console.log("model:", result);

      if (result.message) {
        setError(result.message);
      } else {
        setModelData(result);
      }
    }

    async function fetchPart() {
      const results = await getPart();
      console.log("part:", results);

      if (results.message) {
        setError(results.message);
      } else {
        setPartData(results);
      }
    }
    fetchPart();
    fetchModel();
  }, []);

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state.message]);

  const topics = [
    { topic: "Officer Name", key: "officerName", value: officerName, type: "text" },
    { topic: "Product", key: "product", option: modelData, type: "select" },
    { topic: "Part", key: "part", option: partData, type: "select" },
    { topic: "Malfunction", key: "malfunction", type: "text", value: malfunction },
    { topic: "Customer Phone", key: "custumerPhone", type: "number", value: customerPhone },
  ];

  const handleInputChange = (key, value) => {
    if (key === "malfunction") {
      setMalfunction(value);
    } else if (key === "custumerPhone") {
      setCustomerPhone(value);
    } else if (key === "officerName") {
      setOfficerName(value); // Update the officer name in context
    }
  };

  return (
    <div className="max-width">
      <form action={formAction}>
        {topics.map((topic, index) => (
          <div key={index} className="topic-div" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <label htmlFor={topic.key}>{topic.topic}:</label>
            {topic.type === "text" || topic.type === "number" ? (
              <input
                type={topic.type}
                name={topic.key}
                id={topic.key}
                value={topic.value || ""}
                placeholder={`Enter ${topic.topic}`}
                onChange={e => handleInputChange(topic.key, e.target.value)} 
              />
            ) : (
              <div key={index} className="form-group">
                <select name={topic.key} id={topic.key} defaultValue="">
                  {topic.option?.map((option, idx) => (
                    <option key={idx}>
                      {option.model ? (option.model) : (option.part)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
        <button className="button-a">Submit</button>
      </form>
      <Link href="/custumerData">
        <button className="button-a">See all data</button>
      </Link>
      <br/><br/>
      <div className="insert_result">{state.message}</div>
    </div>
  );
}
