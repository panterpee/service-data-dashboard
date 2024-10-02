"use client";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserContext } from "../userContext";
import { getModel } from "./action";
import { insertInstallData } from "./action";
import "./page.css";

export default function Alldata() {
  const initMessage = {
    message: null,
  };
  const [state, formAction] = useFormState(insertInstallData, initMessage);
  const [modelData, setModelData] = useState([]);
  const [modelSn, setModelSn] = useState(null);
  const [location, setLocation ] = useState(null);
  const {officerName, setOfficerName } = useUserContext(); 

  const storedOfficerName = localStorage.getItem('officerName');

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
  }, []);

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state.message]);

  const topics = [
    { topic: "Officer Name", key: "officerName", value: officerName||storedOfficerName , type: "text" },
    { topic: "Product", key: "product", option: modelData, type: "select" },
    { topic: "Model SN", key: "modelSn", type: "text", value: modelSn },
    { topic: "Location", key: "location", type: "text", value: location },
  ];

  const handleInputChange = (key, value) => {
    if (key === "modelSn") {
      setModelSn(value);
    } else if (key === "officerName") {
      setOfficerName(value); 
    } else if (key === "location") {
      setLocation(value); 
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
                  {topic.option.map((option, idx) => (
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
