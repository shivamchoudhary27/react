import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Field } from "formik";

export default function TinymceEditor({ handleChange, name}: any) {
  const editorRef = useRef(null);

  return (
    <>
      <Field name={name}>
        {({ field, meta }: any) => (
          // console.log(field.value)
          <div>
            <Editor
              apiKey="eduvpvjt0i9rpp9mcga47jkt3vkewafkksw18t3eh5osmhkr"
              cloudChannel="5-dev"
              onInit={(evt, editor: any) => (editorRef.current = editor)}
              initialValue= {`${field.value}`}
              // initialValue="<p>Write Here ....</p>"
              init={{
                height: 300,
                placeholder: "Type here..",
                menubar: false, //"tools"
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount code",
                ],
                toolbar:
                  "formatselect | " +
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
        )}
      </Field>
    </>
  );
}
