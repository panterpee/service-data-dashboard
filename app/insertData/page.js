"use client";

import { insertData } from "./action";
import { getModel } from "./action";
import { useFormState } from "react-dom";
import Link from "next/link";
import "./page.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPart } from "./action";

export default function Alldata() {
  const [modelData, setModelData] = useState([]);
  const [partData, setPartData] = useState([]);

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
      console.log("model:", results);

      if (results.message) {
        setError(results.message);
      } else {
        setPartData(results);
      }
    }
    fetchPart()
    fetchModel();
  }, []); //

  const initMessage = {
    message: null,
  };
  const [state, formAction] = useFormState(insertData, initMessage);
  const searchParams = useSearchParams();
  const officer_name = searchParams.get("officername");
  const [officerName, setOfficerName] = useState(officer_name || "");
  const [malfunction, setMalfunction] = useState(""); 
  const [customerPhone, setCustomerPhone] = useState(""); 

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state.message]); 

  const topics = [
    {topic: "Officer Name",key: "officerName",value: officerName,type: "text",isReadOnly: true, },
    { topic: "Product", key: "product", option: modelData, type: "select" },
    { topic: "Part", key: "part", option: partData, type: "select"  },
    { topic: "Malfunction", key: "malfunction", type: "text", value: malfunction, },
    { topic: "Customer Phone", key: "custumerPhone", type: "number", value: customerPhone },
  ];

  console.log(modelData.model);


  const handleInputChange = (key, value) => {
    if (key === "malfunction") {
      setMalfunction(value);
    } else if (key === "custumerPhone") {
      setCustomerPhone(value);
    }
  };

  return (
    <>
      <div className="max-width">
        <form action={formAction}>
          {topics.map((topic, index) => (
            <div key={index} className="" style={{ display: 'flex', alignItems: 'flex-start' }}>
              <label htmlFor={topic.key}>{topic.topic}:</label>
              {topic.type === "text" || topic.type === "number" ? (
                <input
                  type={topic.type}
                  name={topic.key}
                  id={topic.key}
                  value={topic.value || ""}
                  placeholder={`Enter ${topic.topic}`}
                  onChange={e => handleInputChange(topic.key, e.target.value)} 
                  disabled = {topic.disabled}

                />
              ) : (
                <div key={index} className="form-group">
                  {/* <label>Select {topic.topic}:</label> */}
                  <select name={topic.key} id={topic.key} defaultValue="">
                  {/* <option value="" disabled> Select {topic.topic}</option> */}
                    {topic.option?.map((option, idx) => (
                      <option key={idx} value={"Select"}>
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
        <div>{state.message}</div>
      </div>
    </>
  );
}
