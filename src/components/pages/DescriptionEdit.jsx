import React from "react";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";

import { getClinic } from "../../actions/clinicActions";

export default function DescriptionEdit() {
  const { id } = useParams();

  const [descriptionText, setDescriptionText] = React.useState("");

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    getClinic(id).then(data => {
      if (data.success && data.result.description) {
        setDescriptionText(data.result.description);
      }
    });
  }, []);

  return (
    <div>
      <textarea
        style={{
          width: "75%",
          margin: "auto",
          outline: "none",
          borderRadius: 5,
          resize: "none"
          // overflow: "auto"
        }}
        ref={inputRef}
        value={descriptionText}
        onChange={(a, b, c) => {
          setDescriptionText(inputRef.current.value);
          console.log(inputRef.current.value);
        }}
      />

      <br />

      <Button variant="contained" color="primary">
        ذخیره
      </Button>

      <Button variant="contained" color="secondary">
        انصراف
      </Button>
    </div>
  );
}
