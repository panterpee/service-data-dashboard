"use client";

import { insertData } from "./action";
import { getModel } from "./action";
import { useFormState } from "react-dom";
import Link from "next/link";
import "./page.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Alldata() {
  const [modelData, setModelData] = useState([]);

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

  if (state.message === "insert data success") {
    alert(state.message);
  } else if (state.message) {
    alert(state.message);
  }

  const topics = [
    {topic: "Officer Name",key: "officerName",value: officerName,type: "text",isReadOnly: true, disabled: true},
    { topic: "Product", key: "product", option: modelData, type: "select" },
    { topic: "Part", key: "part", option: [],type: "select"  },
    { topic: "Malfunction", key: "malfunction", type: "text", value: malfunction, disabled: false},
    { topic: "Customer Phone", key: "custumerPhone", type: "text", value: customerPhone, disabled: false },
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
              {topic.type === "text" ? (
                <input
                  type="text"
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
                  <option value="" disabled> Select {topic.topic}</option>
                    {topic.option?.map((option, idx) => (
                      <option key={idx} value={"Select"}>
                        {option.model}
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
