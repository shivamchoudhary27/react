import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinymceEditor({ handleChange, field }: any) {
  const editorRef = useRef(null);
  return (
    <>
      <div>
        <Editor
          apiKey="eduvpvjt0i9rpp9mcga47jkt3vkewafkksw18t3eh5osmhkr"
          cloudChannel="5-dev"
          onInit={(evt, editor: any) => (editorRef.current = editor)}
          initialValue="<p>Write Here ....</p>"
          init={{
            height: 300,
            menubar: false, //"tools"
            plugins: [
              "advlist advcode autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount code",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | image |" +
              "removeformat | code | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(e) => {
            handleChange({ target: { name: field.name, value: e } });
          }}
        />
        {/* <p className="error-message">{meta.error.requirement && meta.touched && meta.error.requirement}</p> */}
      </div>
    </>
  );
}
