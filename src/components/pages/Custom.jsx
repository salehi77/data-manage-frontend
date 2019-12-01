import React from "react";
import ReactDOM from "react-dom";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";

// new FroalaEditor("#edit");

const App = () => {
  // new FroalaEditor("#edit");

  // let

  const [model, setModel] = React.useState();

  return (
    <div id="editor">
      {/* <FroalaEditorComponent tag="textarea" /> */}
      <FroalaEditorComponent
        tag="textarea"
        config={{
          placeholderText: "Edit Your Content Here!",
          charCounterCount: false
        }}
        model={model}
        // onModelChange={this.handleModelChange}
        onModelChange={(a, b, c) => {
          console.log(a, b, c);
        }}
      />
    </div>
  );
};

export default App;
